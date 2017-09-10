import React from 'react';
import Proptypes from 'prop-types';
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Home = ({ buttonTitle, onButtonPress }) => (
  <View style={styles.container}>
    <Text> home screen </Text>
    <Button
      title={buttonTitle}
      onPress={() => onButtonPress()}
    />
  </View>
);

Home.propTypes = {
  buttonTitle: Proptypes.string.isRequired,
  onButtonPress: Proptypes.func.isRequired,
};

export default Home;
