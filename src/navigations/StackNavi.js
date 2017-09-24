import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import TabNavi from './TabNavi';
import TreeContainer from '../containers/TreeContainer';

export const AppNavigator = StackNavigator({
  Home: { screen: TabNavi },
  Tree: { screen: TreeContainer },
});

const StackNavi = ({ dispatch, stackNav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: stackNav })}
  />
);

StackNavi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stackNav: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = state => ({
  stackNav: state.stackNav,
});

export default connect(mapStateToProps)(StackNavi);
