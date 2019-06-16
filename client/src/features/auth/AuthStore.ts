import { observable, action } from 'mobx';
import { IdentityService } from '@services/IdentityService';

export class AuthStore {

  @observable public isVisible: boolean;
  public baseUrl: string;
  public isLogin: boolean;
  @observable public email: string;
  @observable public password: string;
  @observable public confirmPassword: string;

  private ajax: tradeX.IAjaxService;
  private identity: IdentityService;

  constructor(sandbox: jc.Sandbox) {
    this.baseUrl = sandbox.constants.DOMAIN;
    this.isLogin = true;
    this.isVisible = false;
    this.ajax = sandbox.getService('ajax');
    this.identity = sandbox.getService('identity');
  }

  @action
  public toggle(isLogin?: boolean) {
    this.isLogin = isLogin;
    this.isVisible = !this.isVisible;
    this.reset();
  }

  @action
  public handleChange(field: string, value: string) {
    this[field] = value;
  }

  @action
  public authRequest() {
    if (this.isLogin) {
      this.ajax.post({
        url: `${this.baseUrl}/api/auth/login`,
        data: JSON.stringify({
          email: this.email,
          password: this.password
        })
      }).then((response) => {
          const parsedResponse = JSON.parse(response.data);
          this.identity.saveUser(parsedResponse.accessToken);
        })
        .catch((error) => { console.log(error); });
    } else {

      this.ajax.post({
        url: `${this.baseUrl}/api/auth/register`,
        data: JSON.stringify({
          email: this.email,
          password: this.password
        })
      }).then((response) => {
          // const parsedResponse = JSON.parse(response.data);
        })
        .catch((error) => { console.log(error); });
    }
    this.toggle(true);
  }

  @action
  private reset() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}