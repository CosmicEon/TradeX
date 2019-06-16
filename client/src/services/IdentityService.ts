import { action } from 'mobx';
import * as jwtDecode from 'jwt-decode';
import { GlobalAuthStore } from '@stores/GlobalAuthStore';

const TOKEN_KEY = 'access_token';

export class IdentityService {
  private authStore: GlobalAuthStore;

  constructor(core: jc.Core) {
    this.authStore = core.globalStore.authStore;
  }

  @action
  public saveUser(token: string): void {

    const jwtObj = jwtDecode(token);
    this.authStore.isAuthenticated = true;
    this.authStore.email = jwtObj['TradeX-Email'];
    this.authStore.role = jwtObj['TradeX-Role'];
    this.setToken(token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }
}