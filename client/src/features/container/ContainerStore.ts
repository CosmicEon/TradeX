import { computed } from 'mobx';

export class ContainerStore {

  constructor(private sb: jc.Sandbox) {
  }

  @computed
  public get route() {
    return this.sb.globalStore.route;
  }
}