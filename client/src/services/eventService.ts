import { ObservableMap, observable, action, onBecomeObserved, computed } from 'mobx';
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
      { name: 'All League Event', value: 'all' },
    ];
    this.sportsEvents = [
      { name: 'All Sport Events', value: 'all' },
    ];

    this.core = core;
    this.ajax = core.getService('ajax');
    onBecomeObserved(this, 'events', this.getAll);
    this.getAll();
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
    this.ajax.get({ url: `${this.baseUrl}/api/sports` })
      .then((response) => {
        const convertedRes = JSON.parse(response.data);
        convertedRes.forEach(x => {
          this.leagueEvents.push({ value: x.id, name: x.name });
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
    this.ajax.get({ url: `${this.baseUrl}/api/leagues` })
      .then((response) => {
        const convertedRes = JSON.parse(response.data);
        convertedRes.forEach(x => {
          this.leagueEvents.push({ value: x.id, name: x.name });
        });
      })
      .catch((error) => console.log(error));

  }

  @action.bound
  public getAll() {

    const mock = [
      {
        id: 3423432,
        eventName: 'Sokol Kolbuszowa Dolna vs Przelom Besko',
        eventDate: '2019-06-12T13:00:00.000Z',
        sport: {
          id: 1235,
          name: 'Soccer'
        },
        league: {
          id: 114666,
          name: 'Polish 4. liga - Gr. Podkarpacka',
          sportId: 1235
        },
        homeTeamScore: 0,
        awayTeamScore: 0,
        homeTeamOdds: 3.9,
        awayTeamOdds: 4.2,
        drawOdds: 1.8
      },
      {
        id: 657856856345,
        eventName: 'Wislok Wisniowa vs Izolator Boguchwala',
        eventDate: '2019-06-12T13:00:00.000Z',
        sport: {
          id: 1235,
          name: 'Soccer'
        },
        league: {
          id: 114666,
          name: 'Polish 4. liga - Gr. Podkarpacka',
          sportId: 1235
        },
        homeTeamScore: 0,
        awayTeamScore: 0,
        homeTeamOdds: 1.5,
        awayTeamOdds: 2,
        drawOdds: 2.5
      },
      {
        id: 8795463458232,
        eventName: 'Wave Check vs Last Minute',
        eventDate: '2019-06-12T18:30:00.000Z',
        sport: {
          id: 1298,
          name: 'E-Sports'
        },
        league: {
          id: 98470,
          name: 'Overwatch Contenders',
          sportId: 1298
        },
        homeTeamScore: 0,
        awayTeamScore: 0,
        homeTeamOdds: 2.6,
        awayTeamOdds: 4.5,
        drawOdds: 1.8
      },
      {
        id: 1238758,
        eventName: 'Reynor vs Lambo',
        eventDate: '2019-06-12T16:30:00.000Z',
        sport: {
          id: 1298,
          name: 'E-Sports'
        },
        league: {
          id: 190387,
          name: 'Starcraft 2 Bonjwa Cup',
          sportId: 1298
        },
        homeTeamScore: 0,
        awayTeamScore: 0,
        homeTeamOdds: 4.2,
        awayTeamOdds: 3.3,
        drawOdds: 4.6
      },
    ];

    // this.ajax.get(`${this.baseUrl}/api//${}`)
    mock.forEach(x => {
      this.events.set(x.id, x as Event);
      // if (this.events.has(x.id)) {
      // }
    });
  }

  // @action
  // private mapEvents(dto: any) {

  //   const eventDtos = dto.UpcomingEvents;
  //   console.log(dto.UpcomingEvents);
  //   Object.keys(dto.UpcomingEvents).map(x => {
  //     const event = new Event();
  //     event.id = eventDtos[x].ID;
  //     event.type = x.substring(0, x.indexOf('Event'));
  //     event.away = eventDtos[x].Away;
  //     event.home = eventDtos[x].home;
  //     event.eventTime = new Date(eventDtos[x].EventTime);

  //   });
  // }

}