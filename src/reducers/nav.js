import { NavigationActions } from 'react-navigation';

import { STACK_NAVI, TAB_NAVI } from '../actions';
import { AppNavigator } from '../navigations/StackNavi';
import { AppTabNavi } from '../navigations/TabNavi';

const stackFirstAction = AppNavigator.router.getActionForPathAndParams(STACK_NAVI.HOME.routeName);
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams(STACK_NAVI.TREE.routeName);

const stackInitialNavState = AppNavigator.router.getStateForAction(
  stackFirstAction,
);
// const initialNavState = AppNavigator.router.getStateForAction(
//   secondAction,
//   tempNavState,
// );

export function stackNav(state = stackInitialNavState, action) {
  switch (action.type) {
    case STACK_NAVI.TREE.type:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: STACK_NAVI.TREE.routeName }),
        state,
      );
    case STACK_NAVI.HOME.type:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: STACK_NAVI.HOME.routeName }),
        state,
      );
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}

const tabFirstAction = AppTabNavi.router.getActionForPathAndParams(TAB_NAVI.LOCAL.routeName);
const tabInitialNavState = AppTabNavi.router.getStateForAction(
  tabFirstAction,
);

export function tabNav(state = tabInitialNavState, action) {
  switch (action.type) {
    case TAB_NAVI.REMOTE.type:
      return AppTabNavi.router.getStateForAction(
        NavigationActions.navigate({ routeName: TAB_NAVI.REMOTE.routeName }),
        state,
      );
    case TAB_NAVI.LOCAL.type:
      return AppTabNavi.router.getStateForAction(
        NavigationActions.navigate({ routeName: TAB_NAVI.LOCAL.routeName }),
        state,
      );
    default:
      return AppTabNavi.router.getStateForAction(action, state);
  }
}
export default class NaviReducer {
  static StackNav = stackNav;
  static TabNav = tabNav;
}
