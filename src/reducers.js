import { combineReducers } from 'redux';

import {
  SAMPLEMD,
} from './actions';

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
          rawText: action.rawText,
        },
      });
    default:
      return state;
  }
}

const reducers = combineReducers({
  sampleMDReducer,
});

export default reducers;
