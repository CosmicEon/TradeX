import { AuthView, Props } from './AuthView';
import { AuthStore } from './AuthStore';

interface AuthModuleProps extends jc.Message {
  isLogin: boolean;
}

export class AuthModule implements jc.Module {
  public root: HTMLElement;
  public store: AuthStore;

  constructor(public sandbox: jc.Sandbox) {
    this.store = new AuthStore(sandbox);
  }

  public init(): void {
    this.sandbox.mountView<Props>(
      AuthView,
      {
        store: this.store
      },
      this.root
    );
  }

  public moduleWillSubscribe(): string[] {
    return [
      this.sandbox.constants.MESSAGE_TOGGLE_AUTH
    ];
  }

  public moduleDidReceiveMessage(message: AuthModuleProps): void {
    const constants = this.sandbox.constants;
    switch (message.type) {
      case constants.MESSAGE_TOGGLE_AUTH:
        this.store.toggle(message.isLogin);
        break;
      default: return;
    }
  }

  public moduleDidReceiveProps(nextProps: object): void {
    // OPTIONAL

    // handle new props received
  }

  public destroy(): void {
    // release resources, clear intervals etc.
  }
}