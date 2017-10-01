import {
  sampleMDReducer,
} from './index';

import {
  SAMPLEMD,
} from '../actions';


describe('sampleMDReducer', () => {
  it('should return initial state as a default', () => {
    const initialState = { some: 'state' };
    const actual = sampleMDReducer(initialState, { type: 'TEST_TYPE' });
    expect(actual)
      .toMatchObject(initialState);
  });
  it('should set isFetching = true if action.type = SAMPLEMD.REQUEST', () => {
    const initialState = { some: 'state' };
    const actual = sampleMDReducer(initialState, { type: SAMPLEMD.REQUEST });
    expect(actual)
      .toMatchObject({
        some: 'state',
        sampleMD: {
          isFetching: true,
        },
      });
  });
  it('should set isFetching = false and mdtree = tree if action.type = SAMPLEMD.RECEIVE', () => {
    const initialState = { some: 'state' };
    const testTree = { tree: 'test tree' };
    const actual = sampleMDReducer(initialState, { type: SAMPLEMD.RECEIVE, tree: testTree });
    expect(actual)
      .toMatchObject({
        some: 'state',
        sampleMD: {
          isFetching: false,
          mdtree: testTree,
        },
      });
  });
});
