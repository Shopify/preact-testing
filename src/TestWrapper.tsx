import {VNode, Component, RenderableProps} from 'preact';

interface State<ChildProps> {
  props?: Partial<ChildProps>;
}

interface Props {
  children?: VNode;
  render(element: VNode): VNode;
}

export class TestWrapper<ChildProps> extends Component<
  RenderableProps<Props>,
  State<ChildProps>
> {

  // eslint-disable-next-line shopify/react-prefer-private-members
  setProps(props: Partial<ChildProps>) {
    this.props.children!.props = {...this.props.children!.props, ...props}
    this.forceUpdate()
  }
  
  render() {
    const {children, render} = this.props;
    return render(children!);
  }
}
