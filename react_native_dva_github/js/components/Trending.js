import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'dva';

@connect()
class Trending extends Component {
  static navigationOptions = {
    title: 'Trending',
    tabBarLabel: 'Trending',
    tabBarIcon: ({ focused, tintColor }) =>
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../assets/person.png')}
      />
  };

  // gotoLogin = () => {
  //   this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  // }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 32,
    height: 32
  }
});

export default Trending;
