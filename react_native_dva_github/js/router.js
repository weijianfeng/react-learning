import React, { PureComponent } from 'react';
import { BackAndroid } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers
} from 'react-navigation';
import { connect } from 'dva';

import Popular from './components/Popular';
import Trending from './components/Trending';
import Search from './components/Search';
import Account from './components/Account';

const HomeNavigator = TabNavigator(
  {
    Home: { screen: Popular },
    Trending: { screen: Trending },
    Search: { screen: Search },
    Account: { screen: Account }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true
  }
);

const MainNavigator = StackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator }
    //Detail: { screen: Detail },
  },
  {
    headerMode: 'float'
  }
);

const AppNavigator = StackNavigator(
  {
    Main: { screen: MainNavigator }
    //Login: { screen: Login },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentScreen(route);
  }
  return route.routeName;
}

@connect(({ router }) => ({ router }))
class Router extends PureComponent {
  static propTypes = {
    router: React.PropTypes.object,
    dispatch: React.PropTypes.func
  };

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.backHandle);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.backHandle);
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router);
    if (currentScreen === 'Login') {
      return true;
    }
    // if (currentScreen !== 'Home') {
    //   this.props.dispatch(NavigationActions.back())
    //   return true
    // }
    return false;
  };

  render() {
    const { dispatch, router } = this.props;
    const navigation = addNavigationHelpers({ dispatch, state: router });
    return <AppNavigator navigation={navigation} />;
  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state);
}

export default Router;
