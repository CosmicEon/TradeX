import { observable } from 'mobx';

export class GlobalAuthStore {
  @observable public isAuthenticated: boolean;
  @observable public email: string;
  @observable public role: string;

  constructor(core: jc.Core) {
  }
}