import React, { Component } from 'react'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';
import User from '../../User'
import styles from './styles'

class ProfileScreen extends Component {

  static navigationOptions= {
    title: 'Profile'
  }

  state = {
    name: User.name
  }

  handleChange= key=> val => {
    this.setState({ [key]:val })
  }

  _logOut=async()=>{
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  changeName = async()=> {
    if(this.state.name.length<3) {
      Alert.alert('Error','Name cannnot be less than three letters!')
    } else if (User.name !== this.state.name) {
      firebase.database().ref('users').child(User.phone).set({name:this.state.name})
      User.name=this.state.name
      Alert.alert('Success','Name changed successfully.')
    }
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <Text style={{fontSize:20}}>{User.phone}</Text>
        <TextInput
          style = { styles.input }
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text>Change Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

}

export default ProfileScreen
