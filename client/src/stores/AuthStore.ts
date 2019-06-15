import { observable } from 'mobx';
import { User } from '../models/User';

export class AuthStore {
  @observable public user: User;

  constructor(core: jc.Core) {

  }
}