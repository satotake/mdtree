import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import {
  SAMPLEMD,
} from './actions';

import { AppNavigator } from './containers/Navi';

function sampleMDReducer(state = {}, action) {
  switch (action.type) {
    case SAMPLEMD.REQUEST:
      return Object.assign({}, state, {
        sampleMD: {
          isFetching: true,
        },
      });
    case SAMPLEMD.RECEIVE:
      return Object.assign({}, state, {
        sampleMD: {
          isFetching: false,
          mdtree: action.tree,
        },
      });
    default:
      return state;
  }
}

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Tree');
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction,
);
// const initialNavState = AppNavigator.router.getStateForAction(
//   secondAction,
//   tempNavState,
// );

function naviReducer(state = initialNavState, action) {
  switch (action.type) {
    case 'TreeScreen':
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Tree' }),
        state,
      );
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}

const reducers = combineReducers({
  sampleMDReducer,
  nav: naviReducer,
});

export default reducers;
