import React, { Component } from 'react'
import {
  //AsyncStorage,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import User from '../../User'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'

class HomeScreen extends Component {

  static navigationOptions = {
    title:'Chats'
  }

  _logOut=async()=>{
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          {User.phone}
        </Text>
        <TouchableOpacity onPress={ this.logOut }>
          <Text> Logout </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

export default HomeScreen
