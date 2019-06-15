import { TestView } from './TestView';

export class TestRouteModule implements jc.Module {

  public root: HTMLElement;

  constructor(public sandbox: jc.Sandbox) {
  }

  public init(): void {
    this.sandbox.mountView(
      TestView,
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