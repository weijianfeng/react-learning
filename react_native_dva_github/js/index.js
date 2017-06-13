import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';
import logger from 'minimal-logger';

import Router from './router';
import router from '../js/models/router';
import popular from '../js/models/popular';

const app = dva({
  initialState: {},
  onError(e) {
    logger.log('onError', e);
  }
});

app.model(router);
app.model(popular);

app.router(() => <Router />);
const App = app.start();

AppRegistry.registerComponent('react_native_dva_github', () => App);
