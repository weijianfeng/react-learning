import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello React Native!
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
})