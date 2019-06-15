import { FooterView, Props } from './FooterView';

export class FooterModule implements jc.Module {
  public root: HTMLElement;

  constructor(public sandbox: jc.Sandbox) {
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      FooterView,
      {},
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