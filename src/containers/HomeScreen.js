import { connect } from 'react-redux';

import Home from '../components/Home';
import Actions from '../actions';

const mdSampleUrl =
  'https://gist.githubusercontent.com/satotake/8e38e216ce0759eef890ce53457cd1a7/raw/f9d1ced92c913e4a59bd96815764e15ec0edee2a/commonmark_sample.md';

const mapDispatchToProps = dispatch => ({
  onButtonPress: () => {
    dispatch(Actions.switchNavi.tree());
    dispatch(Actions.fetchSampleMD(mdSampleUrl));
  },
});

const HomeScreen = connect(
  () => ({ buttonTitle: 'dispatch TreeScreen' }),
  mapDispatchToProps,
)(Home);

HomeScreen.navigationOptions = {
  title: 'HOME',
};


export default HomeScreen;
