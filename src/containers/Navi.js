import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import TreeScreen from './TreeScreen';

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Tree: { screen: TreeScreen },
});

const Navi = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
  />
);

Navi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(Navi);
