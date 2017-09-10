import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  View,
} from 'react-native';

const Tree = ({ onButtonPress, tree }) => (
  <View>
    <Text> TreeScreen </Text>
    <Text>
      {tree ? tree.meta.doctype : 'fetching....' }
    </Text>
    <Button
      title="dispatch HOME"
      onPress={() => onButtonPress()}
    />
  </View>
);


Tree.propTypes = {
  onButtonPress: PropTypes.func.isRequired,
  tree: PropTypes.object,  
  // TODO
};

export default Tree;
