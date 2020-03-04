import {h, render} from 'preact';
import {teardown, setupRerender} from 'preact/test-utils';
import {createPortal} from 'preact/compat';
import {isPortal, getPortalContent} from '../preact-utilities';

describe('Preact utilities', () => {
  let scratch: HTMLElement;

  beforeEach(() => {
    scratch = document.createElement('div');
  });

  afterEach(teardown);

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

function MyComponent() {
  return <div>Hello world!</div>;
}
