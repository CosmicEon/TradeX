import { ObservableMap, observable, action, computed, runInAction } from 'mobx';
import { Event } from '@models/Event';

export interface GroupType {
  name: string;
  value: string;
}
export class EventService {

  public baseUrl: string;
  @observable public events: ObservableMap<number, Event>;
  @observable public leagueEvents: GroupType[];
  @observable public sportsEvents: GroupType[];
  @observable public searchedLeagueEvent: string;
  @observable public searchedSportEvent: string;

  private ajax: tradeX.IAjaxService;
  private core: jc.Core;

  constructor(core: jc.Core) {
    this.baseUrl = core.constants.DOMAIN;
    this.events = observable.map();
    this.searchedLeagueEvent = 'all';
    this.searchedSportEvent = 'all';
    this.leagueEvents = [
      { name: 'Choose League', value: 'all' },
    ];
    this.sportsEvents = [
      { name: 'Choose Sport', value: 'all' },
    ];

    this.core = core;
    this.ajax = core.getService('ajax');

    this.getAll();
    this.getAllLeagueEvent();
    this.getAllSportEvent();
  }

  @computed
  public get allEvents() {
    return Array.from(this.events.values());
  }

  @action
  public setCurrentEvent(id: number) {
    const event = this.events.get(id);
    this.core.publishAsync({
      type: this.core.constants.MESSAGE_CHANGE_EVENT,
      event
    });
  }

  @action
  public setSearchedLeagueEvent(searchedLeague: string) {
      this.searchedLeagueEvent = searchedLeague;
  }

  @action.bound
  public getAllLeagueEvent() {
    this.ajax.get({ url: `${this.baseUrl}/api/leagues` })
      .then((response) => {
        const convertedRes = JSON.parse(response.data);

        runInAction(() => {
          convertedRes.forEach(x => {
            this.leagueEvents.push({ value: x.id, name: x.name });
          });
        });

      })
      .catch((error) => console.log(error));
  }

  @action
  public setSearchedSportEvent(searchedSport: string) {
      this.searchedSportEvent = searchedSport;
  }

  @action.bound
  public getAllSportEvent() {
    this.ajax.get({ url: `${this.baseUrl}/api/sports` })
      .then((response) => {
        const convertedRes = JSON.parse(response.data);

        runInAction(() => {
          convertedRes.forEach(x => {
            this.sportsEvents.push({ value: x.id, name: x.name });
          });
        });
      })
      .catch((error) => console.log(error));
  }

  @action.bound
  public getAll() {

    const base: tradeX.IAjaxRequestOptions = { url: `${this.baseUrl}/api/events` };
    if (!base.params && (this.searchedLeagueEvent !== 'all' || this.searchedSportEvent !== 'all')) {
      base.params = {};
    }
    if (this.searchedLeagueEvent !== 'all') {
      base.params.leagueId = this.searchedLeagueEvent;
    }
    if (this.searchedSportEvent !== 'all') {
      base.params.sportsId = this.searchedSportEvent;
    }

    this.ajax.get(base)
      .then((response) => {
        const convertedRes = JSON.parse(response.data);
        runInAction(() => {
          convertedRes.forEach(x => {
            this.events.set(x.id, x as Event);
          });
        });
      })
      .catch((error) => console.log(error));
  }
}