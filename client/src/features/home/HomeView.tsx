import * as React from 'react';
import { observer } from 'mobx-react';

export interface Props {

}

@observer
export class HomeView extends React.Component<Props, {}> {

  public render() {
    return (
      <div>
        HOME VIEW!
      </div>
    );
  }
}