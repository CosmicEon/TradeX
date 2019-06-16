import { observable, action } from 'mobx';
import { Event } from '@models/Event';

export class EventDetailsStore {

  @observable public event: Event;
  @observable public scoreOption: boolean;

  constructor() {
    this.scoreOption = true;
  }

  @action
  public changeEvent(event: Event) {
    this.event = event;
  }

  @action
  public selectScore() {
    this.scoreOption = !this.scoreOption;
  }

  @action
  public convertScore(score: number) {
    let convertedScore = score;
    if (this.scoreOption) {
      convertedScore = (score / 100) + 1;
    } else {
      convertedScore = (score - 1) * 100;
    }

    return Math.round(convertedScore * 100) / 100;
  }
}