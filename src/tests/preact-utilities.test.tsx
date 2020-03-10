import {h, render} from 'preact';
import {teardown} from 'preact/test-utils';
import {createPortal, Fragment} from 'preact/compat';
import {isPortal, getPortalContent, getDescendants} from '../preact-utilities';

describe('Preact utilities', () => {
  let scratch: HTMLElement;

  beforeEach(() => {
    scratch = document.createElement('div');
  });

  afterEach(teardown);

  describe('getDescendants', () => {
    it('works on fragments', () => {
      const vdom = <Fragment>oh hi</Fragment>;
      render(vdom, document.createElement('div'));
      expect(getDescendants(vdom)[0].props).toBe('oh hi');
    });
  });

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
});

function MyComponent() {
  return <div>Hello world!</div>;
}
