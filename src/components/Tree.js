import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  View,
} from 'react-native';

const Tree = ({ onButtonPress }) => (
  <View>
    <Text> TreeScreen </Text>
    <Button
      title="dispatch HOME"
      onPress={() => onButtonPress()}
    />
  </View>
);

Tree.propTypes = {
  onButtonPress: PropTypes.func.isRequired,
};

export default Tree;
