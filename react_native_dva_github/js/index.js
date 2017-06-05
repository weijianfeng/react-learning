import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile'


import Router from './router'
import router from '../js/models/router'

const app = dva({
  initialState: {},
  onError(e) {
    console.log('onError', e)
  },
})

app.model(router)

app.router(() => <Router/>)
const App = app.start()

AppRegistry.registerComponent('react_native_dva_github', () => App);
