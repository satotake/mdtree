import {
  stackNav,
  tabNav,
} from './nav';

import {
  STACK_NAVI,
  TAB_NAVI,
} from '../actions';


describe('stackNav', () => {
  it('should handle undefined state', () => {
    const initialState = undefined;
    const actual = stackNav(initialState, {});
    expect(actual.index).toEqual(0);
    expect(actual.routes[0].routeName).toEqual('Home');
  });
  it('should return TREE screen if type == STACK_NAVI.TREE.type', () => {
    const initialState = undefined;
    const actual = stackNav(initialState, { type: STACK_NAVI.TREE.type });
    expect(actual.index).toEqual(1);
    expect(actual.routes[1].routeName).toEqual('Tree');
  });
  it('should return HOME screen if type == STACK_NAVI.HOME.type', () => {
    const initialState = undefined;
    const actual = stackNav(initialState, { type: STACK_NAVI.HOME.type });
    expect(actual.index).toEqual(1);
    expect(actual.routes[1].routeName).toEqual('Home');
  });
});


describe('tabNav', () => {
  const initialState = undefined;
  it('should handle undefined state', () => {
    const actual = tabNav(initialState, {});
    expect(actual.index).toEqual(0);
    expect(actual.routes[0].routeName).toEqual('Local');
  });
  it('should return REMOTE/LOCAL screen if type == TAB_NAVI.REMOTE/LOCAL.type', () => {
    const actualRemote = tabNav(initialState, { type: TAB_NAVI.REMOTE.type });
    expect(actualRemote.index).toEqual(1);
    expect(actualRemote.routes[1].routeName).toEqual('Remote');

    const actualLocal = tabNav(actualRemote, { type: TAB_NAVI.LOCAL.type });
    expect(actualLocal.index).toEqual(0);
    expect(actualLocal.routes[0].routeName).toEqual('Local');
  });
  it('should return null if type is same', () => {
    const local = tabNav(initialState, {});
    expect(local.index).toEqual(0);
    expect(local.routes[0].routeName).toEqual('Local');

    const actualLocalAgain = tabNav(local, { type: TAB_NAVI.LOCAL.type });
    expect(actualLocalAgain).toBeNull();
  });
});
