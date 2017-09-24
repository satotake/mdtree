import { connect } from 'react-redux';

import Home from '../components/Home';
import Actions from '../actions';

const mdSampleUrl =
  'https://gist.githubusercontent.com/satotake/8e38e216ce0759eef890ce53457cd1a7/raw/f9d1ced92c913e4a59bd96815764e15ec0edee2a/commonmark_sample.md';

const mapDispatchToProps = dispatch => ({
  onButtonPress: () => {
    dispatch(Actions.switchStackNavi.tree());
    dispatch(Actions.fetchSampleMD(mdSampleUrl));
  },
});

const Local = connect(
  () => ({ buttonTitle: 'Local: dispatch TreeScreen' }),
  mapDispatchToProps,
)(Home);

const mapDispatchToPropsLocal = dispatch => ({
  onButtonPress: () => {
    dispatch(Actions.switchTabNavi.local());
  },
});

const Remote = connect(
  () => ({ buttonTitle: 'Remote: tabNav change => LOCAL' }),
  mapDispatchToPropsLocal,
)(Home);


export default class HomeContainer {
  static Local = Local;
  static Remote = Remote;
}
