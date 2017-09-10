import { connect } from 'react-redux';

import Actions from '../actions';

import Tree from '../components/Tree';


const mapStateToProps = state => ({
  tree: state.md.sampleMD.mdtree,
});

const mapDispatchToProps = dispatch => ({
  onButtonPress: () => dispatch(Actions.switchNavi.home()),
});

const TreeScreen = connect(mapStateToProps, mapDispatchToProps)(Tree);

TreeScreen.navigationOptions = {
  title: 'Tree',
};

export default TreeScreen;
