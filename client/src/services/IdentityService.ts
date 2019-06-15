import { observable, action } from 'mobx';
import { User } from '@models/User';

const TOKEN_KEY = 'token';

export class IdentityService {
  @observable public currentUser: User;

  constructor() {
    this.currentUser = this.loadUser();
  }

  @action
  public saveUser(user: User): void {
    if (user) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }

    this.currentUser = user;
  }

  private loadUser(): User {
    try {
      return JSON.parse(localStorage.getItem(TOKEN_KEY)) as User;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }
}