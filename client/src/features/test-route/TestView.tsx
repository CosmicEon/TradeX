import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class TestView extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        TEST VIEW!
      </div>
    );
  }
}