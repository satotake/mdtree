import { connect } from 'react-redux';

import Home from '../components/Home';
import Actions from '../actions';

const mapDispatchToProps = dispatch => ({
  onButtonPress: () => dispatch(Actions.switchNavi.tree()),
});

const HomeScreen = connect(
  () => ({ buttonTitle: 'dispatch TreeScreen' }),
  mapDispatchToProps,
)(Home);

HomeScreen.navigationOptions = {
  title: 'HOME',
};


export default HomeScreen;
