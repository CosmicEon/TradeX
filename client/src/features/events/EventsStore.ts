// import { Event } from '@models/Event';
import { EventService } from '@services/eventService';
import { action, computed } from 'mobx';

export class EventsStore {
  private service: EventService;

  constructor(public sandbox: jc.Sandbox) {
    this.service = sandbox.getService('event');
    // this.events = this.service.getAllEvents();
  }

  @action
  public selectedEvent(id: number) {
    this.service.setCurrentEvent(id);
  }

  @computed
  public get events() {
    return this.service.allEvents;
  }

  // @computed
  // public get groups() {
  //   return this.events.reduce((result, item) => {
  //     if (!result[item.sport.name]) {
  //       result[item.sport.name] = [];
  //     }
  //     result[item.sport.name].push(item);
  //     return result;
  //   }, {});
  // }

}