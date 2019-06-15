import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Module } from '@elements/module/Module';

export interface Props {
  sandbox: jc.Sandbox;
}

class View extends React.Component<Props> {
  public render(): React.ReactNode {
    const sb = this.props.sandbox;
    const constants = sb.constants;

    return (
      <AppContainer>
        <React.StrictMode>
          <>
            <Module id={constants.MODULE_HEADER} sandbox={sb} />
            <div id={'container'} className={'main'}>
              <Module id={constants.MODULE_CONTAINER} sandbox={sb} className={'shell'} />
            </div>
            <Module id={constants.MODULE_FOOTER} sandbox={sb} />
            <Module id={constants.MODULE_AUTH} sandbox={sb} />
          </>
        </React.StrictMode>
      </AppContainer>
    );
  }
}

export const MasterPageView = (View);