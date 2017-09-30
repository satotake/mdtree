import { markdown } from 'markdown';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Actions, {
  SAMPLEMD,
  STACK_NAVI,
  TAB_NAVI,
} from './index';
import Helpers from '../helpers';

describe('Actions.switchStackNavi', () => {
  const callFUT = Actions.switchStackNavi;

  it('home', () => {
    const actual = callFUT.home();
    const expected = {
      type: STACK_NAVI.HOME.type,
      routeName: STACK_NAVI.HOME.routeName,
    };
    expect(actual)
      .toMatchObject(expected);
  });

  it('tree', () => {
    const actual = callFUT.tree();
    const expected = {
      type: STACK_NAVI.TREE.type,
      routeName: STACK_NAVI.TREE.routeName,
    };
    expect(actual)
      .toMatchObject(expected);
  });
});

describe('Actions.switchTabNavi', () => {
  const callFUT = Actions.switchTabNavi;
  it('remote', () => {
    const actual = callFUT.remote();
    const expected = {
      type: TAB_NAVI.REMOTE.type,
      routeName: TAB_NAVI.REMOTE.routeName,
    };
    expect(actual)
      .toMatchObject(expected);
  });

  it('local', () => {
    const actual = callFUT.local();
    const expected = {
      type: TAB_NAVI.LOCAL.type,
      routeName: TAB_NAVI.LOCAL.routeName,
    };
    expect(actual)
      .toMatchObject(expected);
  });
});


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions.fetchSampleMD', () => {
  const callFUT = Actions.fetchSampleMD;
  const sampleBody = '#sample markdown\n sample text';
  fetch.mockResponse(sampleBody);


  it('request', () => {
    const testDomain = 'http://example.com';
    const testPath = '/sample.md';
    const url = testDomain + testPath;
    const expected = [
      { type: SAMPLEMD.REQUEST, url },
      {
        type: SAMPLEMD.RECEIVE,
        url,
        ast: markdown.parse(sampleBody),
        tree: Helpers.nestByHeaderLevel(markdown.parse(sampleBody)),
      },
    ];

    const store = mockStore({ md: {} });

    return store.dispatch(callFUT(url)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
