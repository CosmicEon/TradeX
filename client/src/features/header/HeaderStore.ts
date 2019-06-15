import { action } from 'mobx';

export class HeaderStore {

  constructor(private sb: jc.Sandbox) {

  }

  @action
  public switchAuth(isLogin: boolean) {
    this.sb.publishAsync({
      type: this.sb.constants.MESSAGE_TOGGLE_AUTH,
      isLogin
    });
  }
}