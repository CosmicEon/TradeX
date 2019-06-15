import { AuthStore } from './AuthStore';
import { observable, action } from 'mobx';

// global constant defined in webpack
declare const DEBUG_MODE: boolean;

export interface RouteProps extends jc.RouteMatch {
  Module: string;
}

export class GlobalStore {

  @observable public route;
  public authStore: AuthStore;

  constructor(core: jc.Core) {
    this.authStore = new AuthStore(core);

    this.route = {
      Module: null,
      path: null,
      params: null
    };
  }

  get debug(): boolean {
    return DEBUG_MODE;
  }

  @action
  public changeRoute(props: RouteProps) {
    this.route = Object.assign({}, props);
  }

}
