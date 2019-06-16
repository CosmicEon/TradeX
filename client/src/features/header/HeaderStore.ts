import { action } from 'mobx';
import { GlobalAuthStore } from '@stores/GlobalAuthStore';

export class HeaderStore {

  public authStore: GlobalAuthStore;

  constructor(private sb: jc.Sandbox) {
    this.authStore = sb.globalStore.authStore;
  }

  @action
  public switchAuth(isLogin: boolean) {
    this.sb.publishAsync({
      type: this.sb.constants.MESSAGE_TOGGLE_AUTH,
      isLogin
    });
  }
}