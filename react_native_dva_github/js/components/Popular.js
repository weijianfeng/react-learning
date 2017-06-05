import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { connect } from 'dva'

@connect()
class Popular extends Component {
  static navigationOptions = {
    title: 'Popular',
    tabBarLabel: 'Popular',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../assets/person.png')}
      />
    ),
  }

  // gotoLogin = () => {
  //   this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  // }

  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Popular
