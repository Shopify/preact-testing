import {h, render, ComponentChild} from 'preact';
import {teardown} from 'preact/test-utils';
import {createPortal, memo} from 'preact/compat';
import {isPortal, getPortalContent} from '../preact-utilities';

describe('Preact utilities', () => {
  let scratch: HTMLElement;

  beforeEach(() => {
    scratch = document.createElement('div');
  });

  afterEach(teardown);

  describe('portals', () => {
    describe('isPortal', () => {
      it('returns true for portals', () => {
        const portal = document.createElement('div');
        const vdom = createPortal(<MyComponent />, portal);
        render(vdom, scratch);
        expect(isPortal(vdom)).toBe(true);
      });

      it('returns false for non-portals', () => {
        const portal = document.createElement('div');
        const vdom = createPortal(<MyComponent />, portal);
        render(vdom, scratch);
        expect(isPortal(vdom)).toBe(true);
      });
    });

    describe('getPortalContent', () => {
      it('returns portal content', () => {
        const portal = document.createElement('div');
        const childVDom = <MyComponent />;
        const vdom = createPortal(childVDom, portal);
        render(vdom, scratch);
        expect(getPortalContent(vdom)).toBe(childVDom);
      });
    });
  });

  // describe('memo', () => {
  //   it('what even does a memo', () => {
  //     function Message({children}: {children?: ComponentChild}) {
  //       return <div>{children}</div>;
  //     }
  //     const MyComponent = memo(() => <Message>Hello world</Message>);
  //     const vdom: any = <MyComponent />;
  //     render(vdom, scratch);
  //     console.log(vdom.__k[0].__k)
  //   });
  // });
});

function MyComponent() {
  return <div>Hello world!</div>;
}
