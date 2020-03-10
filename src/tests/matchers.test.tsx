import {h, ComponentChild, createContext} from 'preact';
import {mount} from '../mount';
import '../matchers';

describe('@shopify/preact-testing/matchers', () => {
  describe('toContainText', () => {
    it('succeeds when the given text exists in the rendered output of the tree', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message>hi</Message>
        </div>,
      );

      expect(wrapper).toContainText('hi');
    });

    it('fails when the given text does not exist in the rendered output of the tree', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message>nerd</Message>
        </div>,
      );

      expect(wrapper).not.toContainText('hi');
    });

    it('does not break when some components have null children', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
          <Message>{undefined}</Message>
      );

      expect(wrapper).not.toContainText('hi');
    });
  });

  describe('toContainComponent', () => {
    it('succeeds when the given component exists in the tree', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message>hi</Message>
        </div>,
      );

      expect(wrapper).toContainComponent(Message);
      expect(() => {
        expect(wrapper).not.toContainComponent(Message);
      }).toThrow();
    });

    it('fails when the given component does not exist in the tree', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(<div>hi</div>);

      expect(() => {
        expect(wrapper).toContainComponent(Message);
      }).toThrow();
      expect(wrapper).not.toContainComponent(Message);
    });

    it('checks for partial prop matches', () => {
      function Message({children}: {children?: ComponentChild; floop: number}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message floop={3}>hi</Message>
        </div>,
      );

      expect(wrapper).toContainComponent(Message, {floop: 3});
      expect(wrapper).toContainComponent(Message, {children: 'hi'});
      expect(() => {
        expect(wrapper).toContainComponent(Message, {floop: 4});
        expect(wrapper).toContainComponent(Message, {children: 'bye'});
      }).toThrow();
    });
  });

  describe('toContainComponentTimes', () => {
    it('succeeds when the given component exists in the tree the given number of times', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message>hi</Message>
          <Message>hi</Message>
        </div>,
      );

      expect(wrapper).toContainComponent(Message, 2);
      expect(() => {
        expect(wrapper).toContainComponentTimes(Message, 4);
      }).toThrow();
    });

    it('fails when the given component does not exist in the tree the given number of times', () => {
      function Message({children}: {children?: ComponentChild}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message>hi</Message>
        </div>,
      );

      expect(() => {
        expect(wrapper).toContainComponentTimes(Message, 2);
      }).toThrow();
      expect(wrapper).not.toContainComponentTimes(Message, 3);
    });

    it('checks for partial prop matches', () => {
      function Message({children}: {children?: ComponentChild; floop: number}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message floop={3}>hi</Message>
          <Message floop={3}>hi</Message>
        </div>,
      );

      expect(wrapper).toContainComponentTimes(Message, 2, {floop: 3});
      expect(wrapper).toContainComponentTimes(Message, 2, {children: 'hi'});
      expect(() => {
        expect(wrapper).toContainComponentTimes(Message, 2, {floop: 4});
        expect(wrapper).toContainComponentTimes(Message, 2, {children: 'bye'});
      }).toThrow();
    });
  });

  describe('toProvideContext', () => {
    const GoodContext = createContext('good');
    const BadContext = createContext('bad');

    it('succeeds when a provider for the given context is rendered', () => {
      function Component({children}: {children?: ComponentChild}) {
        return <GoodContext.Provider value="good">{children}</GoodContext.Provider>;
      }
  
      const wrapper = mount(
        <Component>hi</Component>
      );
  
      expect(wrapper).toProvideContext(GoodContext);
    });

    it('fails when there is a provider for a different context rendered', () => {
      function Component({children}: {children?: ComponentChild}) {
        return <BadContext.Provider value="bad">{children}</BadContext.Provider>;
      }
  
      const wrapper = mount(
        <Component>hi</Component>
      );
  
      expect(() => {
        expect(wrapper).toProvideContext(GoodContext);
      }).toThrow();
    });

    it('fails when there is no context provider rendered', () => {
      function Component({children}: {children?: ComponentChild}) {
        return <span>{children}</span>;
      }
  
      const wrapper = mount(
        <Component>hi</Component>
      );
    
      expect(() => {
        expect(wrapper).toProvideContext(GoodContext);
      }).toThrow();
    });
  });

  describe('toHaveProps', () => {
    it('succeeds when the component has the given props', () => {
      function Message({children}: {children?: ComponentChild; floop: number}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message floop={3}>hi</Message>
        </div>,
      );

      // 💩 need to fix some jest types
      (expect(wrapper.find(Message)) as any).toHaveProps({floop: 3});
    });

    it('fails when the component does not have the given props', () => {
      function Message({children}: {children?: ComponentChild; floop: number}) {
        return <span>{children}</span>;
      }

      const wrapper = mount(
        <div>
          <Message floop={3}>hi</Message>
        </div>,
      );

      expect(() => {
        // 💩 need to fix some jest types
        (expect(wrapper.find(Message)) as any).toHaveProps({floopus: 1233});
      }).toThrow();
    });
  });
});
