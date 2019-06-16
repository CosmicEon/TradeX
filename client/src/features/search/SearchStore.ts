import { EventService } from '@services/eventService';
import { action, observable } from 'mobx';

export interface GroupType {
  name: string;
  value: string;
}

export class SearchStore {
  @observable public leagueEvents: GroupType[];
  @observable public sportEvents: GroupType[];
  private service: EventService;

  constructor(public sandbox: jc.Sandbox) {
    this.service = sandbox.getService('event');

    this.leagueEvents = this.service.leagueEvents;
    this.sportEvents = this.service.sportsEvents;
  }

  @action
  public selectedLeague(searchedLeague: string) {
    this.service.setSearchedLeagueEvent(searchedLeague);
  }

  @action
  public selectedSport(searchedSport: string) {
    this.service.setSearchedSportEvent(searchedSport);
  }
}