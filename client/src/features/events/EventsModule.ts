import { EventsView, Props } from './EventsView';
import { EventsStore } from './EventsStore';

export class EventsModule implements jc.Module {
  public root: HTMLElement;
  public store: EventsStore;

  constructor(public sandbox: jc.Sandbox) {
    this.store = new EventsStore(sandbox);
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      EventsView,
      {
        store: this.store
      },
      this.root);
  }

  public destroy(): void { }
}