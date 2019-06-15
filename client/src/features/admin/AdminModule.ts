import { AdminView, Props } from './AdminView';

export class AdminModule implements jc.Module {
  public root: HTMLElement;

  constructor(public sandbox: jc.Sandbox) {
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      AdminView,
      {
        sandbox: this.sandbox
      },
      this.root
    );
  }

  public moduleWillSubscribe(): string[] {
    return [

    ];
  }

  public moduleDidReceiveMessage(message: jc.Message): void {

  }

  public moduleDidReceiveProps(nextProps: object): void {
    // OPTIONAL

    // handle new props received
  }

  public destroy(): void {
    // release resources, clear intervals etc.
  }
}