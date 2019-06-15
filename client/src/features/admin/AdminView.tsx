import * as React from 'react';

export interface Props {
  sandbox: jc.Sandbox;
}

interface State {
  file: File;
}

export class AdminView extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      file: null
    };
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }
  public render() {
    return (
      <section className='section section-upload'>
        <div className='section-head'>
          <h3 className='section-title'>
            Header
	 				</h3>
        </div>

        <div className='section-body'>
          <div className='form'>
            Content
          </div>
        </div>
      </section>
    );
  }

  private handleFileSelected(event: any) {
    this.setState({ file: event.target.files[0] });
  }

  private handleUpload(event: any) {
    event.preventDefault();
    // this.props.sandbox.getService('event')
  }
}