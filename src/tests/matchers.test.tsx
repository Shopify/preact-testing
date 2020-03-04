import {h, ComponentChild} from 'preact';
import {mount} from '../mount';
import '../matchers';

describe('@shopify/preact-testing/matchers', () => {
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

  describe('toProvideContext', () => {});

  describe('toHaveProps', () => {});

  describe('toHaveDataProps', () => {});
});
