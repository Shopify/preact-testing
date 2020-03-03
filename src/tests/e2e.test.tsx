import {
  h,
  VNode,
  createContext,
  ComponentChild,
  Component,
  Fragment,
  Ref
} from 'preact';
import {memo, PureComponent, forwardRef} from 'preact/compat';
import {useState, useEffect, useRef} from 'preact/hooks';
import {createPortal} from 'preact/compat';
import {mount} from '../mount';
import {ComponentType} from '../types';

describe('@shopify/preact-testing', () => {
  it('can find dom components', () => {
    const wrapper = mount(<div><span>hi</span></div>);
    expect(wrapper.find('span')?.text()).toBe('hi');
  });

  it('can findAll dom components', () => {
    const wrapper = mount(<div><span>hi</span><span>howdy</span></div>);
    
    expect(wrapper.findAll('span').map((component) => component.text())).toStrictEqual([
      'hi',
      'howdy',
    ]);
  });
  
  it('can find functional components', () => {
    function Message({children}: {children?: ComponentChild}) {
      return <span>{children}</span>;
    }

    const wrapper = mount(<div><Message>hi</Message></div>);
    expect(wrapper.find(Message)?.text()).toBe('hi');
  });

  it('can findAll functional components', () => {
    function Message({children}: {children?: ComponentChild}) {
      return <span>{children}</span>;
    }
    const wrapper = mount(<div><Message>hi</Message><Message>howdy</Message></div>);
    
    expect(wrapper.findAll(Message).map((component) => component.text())).toStrictEqual([
      'hi',
      'howdy',
    ]);
  });
    
  it('can find class components', () => {
    class Message extends Component<{children?: ComponentChild}> {
      render() {
        return <span>{this.props.children}</span>;
      }
    }

    const wrapper = mount(<div><Message>hi</Message></div>);
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

    it('Updates element tree when state is changed', () => {
      const wrapper = mount(<Counter />);

      wrapper.find('button')!.trigger('onClick');
      expect(wrapper.find(Message)?.html()).toBe('1');
    });

    it('Updates element tree when props are changed', () => {
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
      function Portal({children}: {children: VNode}) {
        const [mounted, setMounted] = useState(false);
        const element = useRef<HTMLElement | null>(null);

        useEffect(() => {
          if (!mounted) {
            element.current = document.createElement('div');
            document.body.appendChild(element.current);
            setMounted(true);
          }

          return () => {
            if (element.current != null) {
              element.current.remove();
            }
          };
        }, [mounted]);

        return element.current ? createPortal(children, element.current) : null;
      }

      function MyComponent() {
        return <div>Hello world!</div>;
      }

      const portal = mount(
        <Portal>
          <MyComponent />
        </Portal>,
      );

      expect(portal.find(MyComponent)).not.toBeNull();
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

      const MyComponent = memo(() => <Message>Hello world</Message>);
      const wrapper = mount(<MyComponent />);

      expect(wrapper.find(Message)!.text()).toBe('Hello world');
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

      const MyComponent = forwardRef<HTMLDivElement, {}>(
        function MyComponent(_props: {}, ref: Ref<HTMLDivElement>) {
          return (
            <Fragment>
              <div ref={ref}>Message is:</div>
              <Message>Hello world</Message>
            </Fragment>
          );
        },
      );

      const myComponent = mount(<MyComponent />);

      expect(myComponent.find(Message)!.text()).toBe('Hello world');
      expect(myComponent.text()).toContain(myComponent.find(Message)!.text());
    });
  });
});
