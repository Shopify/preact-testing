import { VNode, Component, RenderableProps } from 'preact';
interface State<ChildProps> {
    props?: Partial<ChildProps>;
}
interface Props {
    children?: VNode;
    render(element: VNode): VNode;
}
export declare class TestWrapper<ChildProps> extends Component<RenderableProps<Props>, State<ChildProps>> {
    setProps(props: Partial<ChildProps>): void;
    render(): VNode<{}>;
}
export {};
//# sourceMappingURL=TestWrapper.d.ts.map