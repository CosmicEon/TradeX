import * as React from 'react';
import { AuthStore } from './AuthStore';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';

export interface Props {
  store: AuthStore;
}

@observer
export class AuthView extends React.Component<Props, {}> {

  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  public render() {
    const { store } = this.props;
    return (
      <div className={classNames('popup popup-login', {
        active: store.isVisible
      })}>
        <div className='popup-inner'>
          <span className='close' onClick={this.handleClose}></span>
          <div className='form'>
            <form action='?' method='post'>
              <div className='form-row'>
                <h3 className='form-title'>
                  {store.isLogin ? 'Login' : 'Register'}
                </h3>
              </div>
              <div className='form-row'>
                <div className='form-controls'>
                  <label htmlFor='field-1#' className='form-label'>Email: </label>
                  <input type='email' className='field' name='email' id='field-1#' value={store.email} placeholder='Enter email' onChange={this.handleChange} />
                </div>
              </div>

              <div className='form-row'>
                <div className='form-controls'>
                  <label htmlFor='field-2#' className='form-label'>Password: </label>
                  <input type='password' className='field' name='password' id='field-2#' value={store.password} placeholder='Enter password' onChange={this.handleChange} />
                </div>
              </div>

              {!store.isLogin && <div className='form-row'>
                <div className='form-controls'>
                  <label htmlFor='field-2#' className='form-label'>Confirm password: </label>
                  <input type='password' className='field' name='confirmPassword' id='field-2#' value={store.confirmPassword} placeholder='Confirm password' onChange={this.handleChange} />
                </div>
              </div>}

              <div className='form-row'>
                <button type='submit' className='btn-form' onClick={this.handleRequest}>
                  {store.isLogin ? 'Login' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  private handleChange(event: any) {
    this.props.store.handleChange(event.target.name, event.target.value);
  }

  private handleClose() {
    this.props.store.toggle();
  }

  private handleRequest(event: any) {
    event.preventDefault();
    this.props.store.authRequest();
  }
}