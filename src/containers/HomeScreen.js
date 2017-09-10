import { connect } from 'react-redux';
import Home from '../components/Home';

const mapDispatchToProps = dispatch => ({
  onButtonPress: () => dispatch({ type: 'TreeScreen' }),
});

const HomeScreen = connect(
  () => ({ buttonTitle: 'dispatch TreeScreen' }),
  mapDispatchToProps,
)(Home);


export default HomeScreen;
