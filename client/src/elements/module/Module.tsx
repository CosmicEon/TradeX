import * as React from 'react';

interface Props {
  id: string;
  instanceId?: string;
  props?: Record<string, any>;
  sandbox: jc.Sandbox;
  className?: string;
}

export class Module extends React.PureComponent<Props> {

  private root: HTMLDivElement;

  constructor(props) {
    super(props);

    this.root = null;
  }

  public componentDidMount(): void {
    this.startModule(this.props.props);
  }

  public componentWillReceiveProps(nextProps: Props): void {
    const moduleProps = this.props.props;
    const nextModuleProps = nextProps.props;
    if (moduleProps !== nextModuleProps) {
      this.startModule(nextModuleProps);
    }
  }

  public componentWillUnmount(): void {
    this.props.sandbox.stopModule(this.props.id, this.props.instanceId);
  }

  public render(): React.ReactNode {
    return (
      <div ref={(root) => this.root = root} className={this.props.className} />
    );
  }

  private startModule(props: Record<string, any>): void {
    this.props.sandbox.startModule(this.props.id, {
      instanceId: this.props.instanceId,
      props: {
        root: this.root,
        ...props,
      },
    });
  }
}
