import React from 'react';
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

import Navi from './containers/Navi';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(reducers, applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
));


const AppRoot = () => (
  <Provider store={store}>
    <Navi />
  </Provider>
);

export default AppRoot;
