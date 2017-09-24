import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import HomeContainer from '../containers/HomeContainer';

export const AppTabNavi = TabNavigator({
  Local: { screen: HomeContainer.Local },
  Remote: { screen: HomeContainer.Remote },
});

const TabNavi = ({ dispatch, tabNav = {} }) => (
  <AppTabNavi
    navigation={addNavigationHelpers({ dispatch, state: tabNav })}
  />
);

TabNavi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tabNav: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = state => ({
  tabNav: state.tabNav,
});

TabNavi.navigationOptions = {
  title: 'HOME',
};


export default connect(mapStateToProps)(TabNavi);
