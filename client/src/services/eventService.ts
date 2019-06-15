import { ObservableMap, observable, action, onBecomeObserved, computed } from 'mobx';
import { Event } from '@models/Event';

export class EventService {

  @observable public events: ObservableMap<number, Event>;
  @observable public currentEventId: number;

  // private ajax: tradeX.IAjaxService;

  constructor(core: jc.Core) {
    this.events = observable.map();

    // this.ajax = core.getService('ajax');
    onBecomeObserved(this, 'events', this.getAll);
    this.getAll();
  }

  @computed
  public get allEvents() {
    return Array.from(this.events.values());
  }

  @action
  public setCurrentEventId(id: number) {
    this.currentEventId = id;
    console.log('handleClickElement', id);
    console.log('handleClickElement', this.currentEventId);

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

    mock.forEach(x => {
      this.events.set(x.id, x as Event);
      // if (this.events.has(x.id)) {
      // }
    });

    // this.events = mock;
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