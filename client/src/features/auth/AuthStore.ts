import { observable, action } from 'mobx';
import { IdentityService } from '@services/IdentityService';

export class AuthStore {

  @observable public isVisible: boolean;
  public isLogin: boolean;
  public baseUrl: string;
  @observable public email: string;
  @observable public password: string;
  @observable public confirmPassword: string;

  private identity: IdentityService;
  private ajax: tradeX.IAjaxService;

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
    if (this.password === this.confirmPassword) {
      const url = this.isLogin ? `${this.baseUrl}/api/Auth/login` : `${this.baseUrl}/api/Auth/register`;
      const data = {
        email: this.email,
        password: this.password
      };

      this.ajax.post({ url, data })
        .then((response) => {
          // TODO: check if prop is user
          const parsedResponse = JSON.parse(response.data);
          this.identity.saveUser(parsedResponse.user);
        })
        .catch((error) => { console.log(error); });
    }
  }

  @action
  private reset() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

}