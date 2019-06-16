import { EventDetailsView, Props } from './EventDetailsView';
import { EventDetailsStore } from './EventDetailsStore';
import { Event } from '@models/Event';

interface EventDetailsProps extends jc.Message {
  event: Event;
}

export class EventDetailsModule implements jc.Module {
  public root: HTMLElement;
  public store: EventDetailsStore;

  constructor(public sandbox: jc.Sandbox) {
    this.store = new EventDetailsStore();
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      EventDetailsView,
      {
        store: this.store
      },
      this.root
    );
  }

  public moduleWillSubscribe(): string[] {
    return [
      this.sandbox.constants.MESSAGE_CHANGE_EVENT
    ];
  }

  public moduleDidReceiveMessage(message: EventDetailsProps): void {
    switch (message.type) {
      case this.sandbox.constants.MESSAGE_CHANGE_EVENT:
        this.store.changeEvent(message.event);
        break;
    }
  }

  public moduleDidReceiveProps(nextProps: object): void {
    // OPTIONAL

    // handle new props received
  }

  public destroy(): void {
    // release resources, clear intervals etc.
  }
}