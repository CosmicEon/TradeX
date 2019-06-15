import * as React from 'react';
import { Module } from '@elements/module/Module';
import { ContainerStore } from './ContainerStore';
import { observer } from 'mobx-react';

export interface Props {
  sandbox: jc.Sandbox;
  store: ContainerStore;
}

@observer
export class ContainerView extends React.Component<Props, {}> {

  public render() {
    const content = this.renderContent();
    return <div className='container'>
      {content}
    </div>;
  }

  private renderContent(): React.ReactNode {
    const { sandbox, store } = this.props;
    const module = store.route.Module;

    switch (module) {
      case sandbox.constants.MODULE_HOME: return (
        <>
          <Module id={sandbox.constants.MODULE_EVENTS} sandbox={sandbox} className='sidebar sidebar-categories' />
          <Module id={sandbox.constants.MODULE_BET_OPTIONS} sandbox={sandbox} className='content' />
          <div className='sidebar'></div>
        </>
      );

      case sandbox.constants.MODULE_ADMIN: return (
        <>
          <Module id={sandbox.constants.MODULE_ADMIN} sandbox={sandbox} className='container-admin-panel' />
        </>

      );
      default: return null;
    }
  }
}