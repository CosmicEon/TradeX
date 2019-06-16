import * as React from 'react';
import { HeaderStore } from './HeaderStore';

export interface Props {
  store: HeaderStore;
}

export class HeaderView extends React.Component<Props, {}> {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    const adminLogo = require<string>('@images/tx-logo-admin.png');
    const logo = require<string>('@images/tx-logo.png');

    return (
      <header className='header'>
        <div className='shell'>
          <a href='#' className='logo'>
            <img src={window.location.hash.substr(1) === '/admin' ? adminLogo : logo} alt='' />
          </a>
          {!this.props.store.authStore.isAuthenticated ?
            <nav className='nav-log'>
              <ul>
                <li>
                  <a href='#' onClick={() => this.handleClick(true)}>Login</a>
                </li>
                <li>
                  <a href='#' onClick={() => this.handleClick()}>Register</a>
                </li>
              </ul>
            </nav> :
            <div>Hello, {this.props.store.authStore.email}</div>
          }
        </div>
      </header>
    );
  }

  private handleClick(isLogin: boolean = false) {
    this.props.store.switchAuth(isLogin);
  }
}