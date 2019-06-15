import { Props, MasterPageView } from './MasterPageView';

export class MasterPageModule implements jc.Module {
  public root: HTMLElement;

  constructor(public sandbox: jc.Sandbox) {
  }

  public init(): void {
    this.renderView(MasterPageView);
  }

  public moduleDidReceiveProps(nextProps: object): void {
    require(['./MasterPageView'], result => {
      this.renderView(null);
      this.renderView(result.MasterPageView);
    });
  }

  public destroy(): void {
  }

  private renderView(View: typeof MasterPageView): void {
    this.sandbox.mountView<Props>(
      View,
      {
        sandbox: this.sandbox
      },
      this.root);
  }
}