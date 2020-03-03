import {h, render, ComponentChild} from 'preact';
import {teardown, setupRerender} from 'preact/test-utils';
import {TestWrapper} from '../TestWrapper';

describe('<TestWrapper />', () => {
  let scratch: HTMLElement;
  let rerender: () => void;

  beforeEach(() => {
    rerender = setupRerender();
    scratch = document.createElement('div');
  });

  afterEach(teardown);


  function Message({children}: {children?: ComponentChild}) {
    return <span>{children}</span>;
  }

  it('renders the given children using the provided render method', () => {
    render(
      <TestWrapper render={(content) => <div>{content}</div>}>
        <Message>nothing</Message>
      </TestWrapper>,
      scratch,
    );

    expect(scratch.innerHTML).toBe('<div><span>nothing</span></div>');
  });

  it('forces a rerender when setProps() is called', () => {
    let wrapper: TestWrapper<any> | null = null;

    render(
      <TestWrapper
        ref={(wrap) => (wrapper = wrap)}
        render={(content) => content}
      >
        <Message>nothing</Message>
      </TestWrapper>,
      scratch,
    );

    expect(scratch.innerHTML).toBe('<span>nothing</span>');
    wrapper!.setProps({children: 'hi hello'});
    rerender();
    expect(scratch.innerHTML).toBe('<span>hi hello</span>');
  });
});
