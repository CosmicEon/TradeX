import { HomeView, Props } from './HomeView';

export class HomeModule implements jc.Module {

  public root: HTMLElement;

  constructor(public sandbox: jc.Sandbox) {
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      HomeView,
      {},
      this.root
    );
  }

  public moduleWillSubscribe(): string[] {
    return [];
  }

  public moduleDidReceiveMessage(message: jc.Message): void {
    // OPTIONAL

    // handle message for given topic
  }

  public destroy(): void {
  }
}