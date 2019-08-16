import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
} from 'react-native';
import styles from './styles'

class Main extends Component {
  render() {
    return(
      <View style={styles.container}>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
        />
      </View>
    )
  }
}

export default Main
