import { NavigationActions } from 'react-navigation';

import { NAVI } from '../actions';
import { AppNavigator } from '../containers/Navi';

const firstAction = AppNavigator.router.getActionForPathAndParams(NAVI.HOME.routeName);
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams(NAVI.TREE.routeName);

const initialNavState = AppNavigator.router.getStateForAction(
  firstAction,
);
// const initialNavState = AppNavigator.router.getStateForAction(
//   secondAction,
//   tempNavState,
// );

function naviReducer(state = initialNavState, action) {
  switch (action.type) {
    case NAVI.TREE.type:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: NAVI.TREE.routeName }),
        state,
      );
    case NAVI.HOME.type:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: NAVI.HOME.routeName }),
        state,
      );
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}

export default naviReducer;
