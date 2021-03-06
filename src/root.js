import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  createStore,
  applyMiddleware,
} from 'redux';

import thunkMiddleware from 'redux-thunk';

import {
  createLogger,
} from 'redux-logger';

import {
  Provider,
} from 'react-redux';

import reducers from './reducers';
import Actions from './actions';

const loggerMiddleware = createLogger();

const store = createStore(reducers, applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
));

const mdSampleUrl =
  'https://gist.githubusercontent.com/satotake/8e38e216ce0759eef890ce53457cd1a7/raw/f9d1ced92c913e4a59bd96815764e15ec0edee2a/commonmark_sample.md';

store
  .dispatch(Actions.fetchSampleMD(mdSampleUrl));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppRoot = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <Text>this is test</Text>
    </View>
  </Provider>
);

export default AppRoot;
