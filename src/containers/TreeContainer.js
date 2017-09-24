import { connect } from 'react-redux';

import Actions from '../actions';

import Tree from '../components/Tree';


const mapStateToProps = state => ({
  tree: state.md.sampleMD.mdtree,
});

const mapDispatchToProps = dispatch => ({
  onButtonPress: () => {
    dispatch(Actions.switchStackNavi.home());
  },
});

const TreeContainer = connect(mapStateToProps, mapDispatchToProps)(Tree);

TreeContainer.navigationOptions = {
  title: 'Tree',
};

export default TreeContainer;
