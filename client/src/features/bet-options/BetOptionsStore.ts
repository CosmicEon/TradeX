import { observable, action } from 'mobx';
import { Event } from '@models/Event';
import { EventService } from '@services/eventService';

export class BetOptionsStore {

  @observable public event: Event;

  private service: EventService;

  constructor(sb: jc.Sandbox) {
    this.service = sb.getService('event');

    this.event = this.service.events.get(3423432);
  }

  @action
  public changeEvent(event: Event) {
    this.event = event;
  }

  public placeBet() {
    this.service;
  }

}