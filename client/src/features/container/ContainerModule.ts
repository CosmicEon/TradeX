import { ContainerView, Props } from './ContainerView';
import { ContainerStore } from './ContainerStore';

export class ContainerModule implements jc.Module {
  public root: HTMLElement;
  public store: ContainerStore;

  constructor(public sandbox: jc.Sandbox) {
    this.store = new ContainerStore(sandbox);
  }

  public init(): void {
    this.renderView();
  }

  public moduleWillSubscribe(): string[] {
    return [];
  }

  public moduleDidReceiveMessage(message: jc.Message): void {

  }

  public destroy(): void {
  }

  private renderView(): void {
    this.sandbox.mountView<Props>(
      ContainerView,
      {
        sandbox: this.sandbox,
        store: this.store
      },
      this.root
    );
  }
}