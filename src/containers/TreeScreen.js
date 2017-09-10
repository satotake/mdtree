import { connect } from 'react-redux';

import Actions from '../actions';

import Tree from '../components/Tree';

const mapDispatchToProps = dispatch => ({
  onButtonPress: () => dispatch(Actions.switchNavi.home()),
});

const TreeScreen = connect(null, mapDispatchToProps)(Tree);
TreeScreen.navigationOptions = {
  title: 'Tree',
};

export default TreeScreen;
