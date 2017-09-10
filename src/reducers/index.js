import { combineReducers } from 'redux';

import {
  SAMPLEMD,
} from '../actions';

import nav from './nav';

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

const reducers = combineReducers({
  sampleMDReducer,
  nav,
});

export default reducers;
