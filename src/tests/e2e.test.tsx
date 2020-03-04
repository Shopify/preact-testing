import {
  h,
  createContext,
  ComponentChild,
  Component,
  Fragment,
  Ref,
} from 'preact';
import {memo, PureComponent, forwardRef} from 'preact/compat';
import {useState, useEffect, useContext} from 'preact/hooks';
import {createPortal} from 'preact/compat';
import {mount, createMount} from '../mount';
import {ComponentType} from '../types';

describe('@shopify/preact-testing', () => {
  it('can output structured debug strings', () => {
    const wrapper = mount(
      <div>
        <span>hi</span>
      </div>,
    );
    expect(wrapper.debug()).toBe(
      `<div>
  <span />
</div>`,
    );
  });

  it('can find dom components', () => {
    const wrapper = mount(
      <div>
        <span>hi</span>
      </div>,
    );
    expect(wrapper.find('span')?.text()).toBe('hi');
  });

  it('can findAll dom components', () => {
    const wrapper = mount(
      <div>
        <span>hi</span>
        <span>howdy</span>
      </div>,
    );

    expect(
      wrapper.findAll('span').map((component) => component.text()),
    ).toStrictEqual(['hi', 'howdy']);
  });

  it('can find functional components', () => {
    function Message({children}: {children?: ComponentChild}) {
      return <span>{children}</span>;
    }

    const wrapper = mount(
      <div>
        <Message>hi</Message>
      </div>,
    );
    expect(wrapper.find(Message)?.text()).toBe('hi');
  });

  it('can findAll functional components', () => {
    function Message({children}: {children?: ComponentChild}) {
      return <span>{children}</span>;
    }
    const wrapper = mount(
      <div>
        <Message>hi</Message>
        <Message>howdy</Message>
      </div>,
    );

    expect(
      wrapper.findAll(Message).map((component) => component.text()),
    ).toStrictEqual(['hi', 'howdy']);
  });

  it('can find class components', () => {
    class Message extends Component<{children?: ComponentChild}> {
      render() {
        return <span>{this.props.children}</span>;
      }
    }

    const wrapper = mount(
      <div>
        <Message>hi</Message>
      </div>,
    );
    expect(wrapper.find(Message)?.text()).toBe('hi');
  });

  it('can find context providers', () => {
    const Context = createContext({hello: 'world'});
    const value = {hello: 'goodbye'};

    function MyComponent() {
      return (
        <Context.Provider value={value}>
          <div />
        </Context.Provider>
      );
    }

    const myComponent = mount(<MyComponent />);
    expect(myComponent.find(Context.Provider)).not.toBeNull();
  });

  it('throws an error when the component is already mounted', () => {
    const wrapper = mount(<div>Hello world</div>);

    expect(() => wrapper.mount()).toThrow(
      /Attempted to mount a node that was already mounted/,
    );
  });

  describe('rerendering', () => {
    function Message({children}: {children?: ComponentChild}) {
      return <span>{children}</span>;
    }

    function Counter({children}: {children?: ComponentChild}) {
      const [counter, setCounter] = useState(0);

      return (
        <div>
          <Message>{counter}</Message>
          <button onClick={() => setCounter((c) => c + 1)}>increase</button>
          {children}
        </div>
      );
    }

    it('updates element tree when state is changed', () => {
      const wrapper = mount(<Counter />);

      wrapper.find('button')!.trigger('onClick');
      expect(wrapper.find(Message)?.html()).toBe('<span>1</span>');
    });

    it('updates element tree when state is changed by an effect', () => {
      function EffectChangeComponent({children}: {children?: ComponentChild}) {
        const [counter, setCounter] = useState(0);
        useEffect(() => setCounter(100));
        return (
          <div>
            <Message>{counter}</Message>
            {children}
          </div>
        );
      }
      const wrapper = mount(<EffectChangeComponent />);

      expect(wrapper.find(Message)?.html()).toBe('<span>100</span>');
    });

    it('updates element tree when state is changed by an effect after changing props', () => {
      function PropBasedEffectChangeComponent({
        value,
        children,
      }: {
        children?: ComponentChild;
        value: number;
      }) {
        const [counter, setCounter] = useState(value);
        useEffect(() => setCounter(value), [value]);
        return (
          <div>
            <Message>{counter}</Message>
            {children}
          </div>
        );
      }
      const wrapper = mount(<PropBasedEffectChangeComponent value={0} />);
      expect(wrapper.find(Message)?.html()).toBe('<span>0</span>');
      wrapper.setProps({value: 100});
      expect(wrapper.find(Message)?.html()).toBe('<span>100</span>');
    });

    it('updates element tree when props are changed', () => {
      const wrapper = mount(<Counter />);
      expect(wrapper.find('div')?.html()).not.toMatch('hi hello');
      wrapper.setProps({children: <div>hi hello</div>});
      expect(wrapper.find('div')?.html()).toMatch('hi hello');
    });

    it('can test the result of triggering props', () => {
      function Clickable({onClick}: {onClick(): void}) {
        return (
          <button type="button" onClick={onClick}>
            Click me
          </button>
        );
      }

      function MyComponent() {
        const [clicked, setClicked] = useState(false);

        return clicked ? (
          <div>Clicked!</div>
        ) : (
          <Clickable onClick={setClicked.bind(null, true)} />
        );
      }

      const myComponent = mount(<MyComponent />);
      (myComponent.find(Clickable as ComponentType<any>) as any)!.trigger(
        'onClick',
      );
      expect(myComponent.text()).toContain('Clicked!');
    });
  });

  describe('traversal', () => {
    it('can traverse through portals', () => {
      function MyComponent() {
        return <div>Hello world!</div>;
      }

      const portal = document.createElement('div');
      const vdom = createPortal(<MyComponent />, portal);
      const wrapper = mount(vdom);
      expect(wrapper.find(MyComponent)).not.toBeNull();
    });

    it('can traverse through context providers and consumers', () => {
      const MessageContext = createContext<string>('');

      function Message({children}: {children?: ComponentChild}) {
        return <div>{children}</div>;
      }

      function MyComponent() {
        return (
          <MessageContext.Consumer>
            {(message) => <Message>{message}</Message>}
          </MessageContext.Consumer>
        );
      }

      const message = 'Hello world';
      const myComponent = mount(
        <MessageContext.Provider value={message}>
          <MyComponent />
        </MessageContext.Provider>,
      );

      expect(myComponent.find(Message)!.text()).toBe(message);
    });

    it('can traverse through function memo components', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <div>{children}</div>;
      }
      const vdom = <Message>Hello world</Message>;
      const MyComponent = memo(() => vdom);
      const wrapper = mount(<MyComponent />);
      expect(wrapper.text()).toBe('Hello world');
      expect(wrapper.text()).toBe(wrapper.find(Message)!.text());
    });

    it('can traverse through class memo components', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <div>{children}</div>;
      }

      const MyComponent = memo(
        // eslint-disable-next-line react/prefer-stateless-function
        class MyComponent extends Component {
          render() {
            return <Message>Hello world</Message>;
          }
        } as any,
      );

      const myComponent = mount(<MyComponent />);

      expect(myComponent.find(Message)!.text()).toBe('Hello world');
      expect(myComponent.text()).toBe(myComponent.find(Message)!.text());
    });

    it('can traverse through pure components', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <div>{children}</div>;
      }

      class MyComponent extends PureComponent {
        render() {
          return <Message>Hello world</Message>;
        }
      }

      const myComponent = mount(<MyComponent />);

      expect(myComponent.find(Message)!.text()).toBe('Hello world');
      expect(myComponent.text()).toBe(myComponent.find(Message)!.text());
    });

    it('can traverse through fragments', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <div>{children}</div>;
      }

      function MyComponent() {
        return (
          <Fragment>
            <div>Message is:</div>
            <Message>Hello world</Message>
          </Fragment>
        );
      }

      const myComponent = mount(<MyComponent />);

      expect(myComponent.find(Message)!.text()).toBe('Hello world');
      expect(myComponent.text()).toContain(myComponent.find(Message)!.text());
    });

    it('can traverse through forwardRefs', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <div>{children}</div>;
      }

      const MyComponent = forwardRef<HTMLDivElement, {}>(function MyComponent(
        _props: {},
        ref: Ref<HTMLDivElement>,
      ) {
        return (
          <Fragment>
            <div ref={ref}>Message is:</div>
            <Message>Hello world</Message>
          </Fragment>
        );
      });

      const myComponent = mount(<MyComponent />);

      expect(myComponent.find(Message)!.text()).toBe('Hello world');
      expect(myComponent.text()).toContain(myComponent.find(Message)!.text());
    });
  });

  describe('customized mount', () => {
    it('treats the rendered component as the root despite any rendered wrapper', () => {
      const customMount = createMount({
        render: (vdom) => <div>{vdom}</div>,
      });

      function Message({children}: {children?: ComponentChild}) {
        return <div>{children}</div>;
      }
      expect(customMount(<Message>hi</Message>).html()).toBe('<div>hi</div>');
    });

    it('provides context as a property on the root wrapper', () => {
      const AppContext = createContext('not the right message');
      const mountWithContext = createMount<
        {message: string},
        {message: string}
      >({
        context: ({message}) => ({message}),
        render: (vdom, context) => {
          return (
            <AppContext.Provider value={context.message}>
              {vdom}
            </AppContext.Provider>
          );
        },
      });

      function ContextMessage() {
        const message = useContext(AppContext);
        return <div>{message}</div>;
      }

      const wrapper = mountWithContext(<ContextMessage />, {
        message: 'the right message',
      });
      expect(wrapper.context.message).toBe('the right message');
      expect(wrapper.html()).toBe(`<div>${wrapper.context.message}</div>`);
    });

    it('runs the afterMount function after rendering', () => {
      const spy = jest.fn();
      const mountWithContext = createMount<
        {message: string},
        {message: string}
      >({
        render: (vdom) => {
          spy('render');
          return vdom;
        },
        afterMount: () => spy('afterMount'),
      });

      function Message({children}: {children?: ComponentChild}) {
        return <div>{children}</div>;
      }

      const wrapper = mountWithContext(<Message />);
      expect(spy.mock.calls).toEqual([['render'], ['render'], ['afterMount']]);
    });
  });
});
