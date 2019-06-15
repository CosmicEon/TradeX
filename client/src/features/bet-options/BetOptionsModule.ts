import { BetOptionsView, Props } from './BetOptionsView';
import { BetOptionsStore } from './BetOptionsStore';
import { Event } from '@models/Event';

interface BetOptionsProps extends jc.Message {
  event: Event;
}

export class BetOptionsModule implements jc.Module {
  public root: HTMLElement;
  public store: BetOptionsStore;

  constructor(public sandbox: jc.Sandbox) {
    this.store = new BetOptionsStore(sandbox);
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      BetOptionsView,
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

  public moduleDidReceiveMessage(message: BetOptionsProps): void {
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