import { HeaderView, Props } from './HeaderView';
import { HeaderStore } from './HeaderStore';

export class HeaderModule implements jc.Module {
  public root: HTMLElement;

  constructor(public sandbox: jc.Sandbox) {
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      HeaderView,
      {
        store: new HeaderStore(this.sandbox)
      },
      this.root
    );
  }

  public moduleWillSubscribe(): string[] {
    // OPTIONAL

    // return topics to subscribe for
    return [];
  }

  public moduleDidReceiveMessage(message: jc.Message): void {
    // OPTIONAL

    // handle message for given topic
  }

  public moduleDidReceiveProps(nextProps: object): void {
    // OPTIONAL

    // handle new props received
  }

  public destroy(): void {
    // release resources, clear intervals etc.
  }
}