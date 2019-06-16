import { SearchView, Props } from './SearchView';
import { SearchStore } from './SearchStore';

export class SearchModule implements jc.Module {
  public root: HTMLElement;
  public store: SearchStore;

  constructor(public sandbox: jc.Sandbox) {
    this.store = new SearchStore(sandbox);
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      SearchView,
      {
        store: this.store
      },
      this.root);
  }

  public destroy(): void { }
}