const TOKEN_KEY = 'token';

export class TokenService {
  // TODO: Might need to be added as a service.
  constructor() { }

  public get TOKEN_KEY() { return TOKEN_KEY; }
  public clear() { localStorage.removeItem(TOKEN_KEY); }
  public set(value: any) { localStorage.setItem(TOKEN_KEY, JSON.stringify(value)); }
  public get() {
    try {
      return JSON.parse(localStorage.getItem(TOKEN_KEY));
    } catch (ex) {
      this.clear();
      return null;
    }
  }
}
