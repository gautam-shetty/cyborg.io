import React, { Component } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';
import User from '../../User'
import Icon from 'react-native-vector-icons/MaterialIcons'
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
        <Text style={{fontSize:20, padding: 10 }}>Phone No.: {User.phone}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <TextInput
            style = { styles.input }
            value={this.state.name}
            onChangeText={this.handleChange('name')}
          />
          <TouchableOpacity style={{ paddingBottom: 10, marginLeft: 10 }} onPress={this.changeName}>
            <Icon name='check-circle' size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this._logOut}>
          <Text style = { styles.btnLogout }>Logout <Icon name='exit-to-app' size={24} /></Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

}

export default ProfileScreen
