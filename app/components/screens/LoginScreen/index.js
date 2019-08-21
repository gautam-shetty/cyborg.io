import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'
import User from '../../User'
import styles from './styles'

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
  }

  static navigationOptions = {
    header: null
  }

  state = {
    phone: '',
    name: ''
  }

  handleChange= key=> val=> {
    this.setState ({ [key]:val })
  }

  submitForm = async() => {
    if(this.state.phone.length<10) {
      Alert.alert('Error','Incorrect Phone number')
    } else if(this.state.name.length<3) {
      Alert.alert('Error','Incorrect Name')
    } else {
      await AsyncStorage.setItem('userPhone',this.state.phone);
      User.phone=this.state.phone;
      firebase.database().ref('users/'+ User.phone ).set({name: this.state.name })
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style = { styles.loginHeader }><Image style={{width: 50, height: 50, marginRight: 40 }} source={require('../../../assets/logoMain.png')} />cyborg.io</Text>
        <Input
          placeholder="Phone Number"
          maxLength={10}
          leftIcon={{ type: 'MaterialIcons', name: 'phone', size:24 , color: '#9c9c9c', paddingRight:10 }}
          autofillHints='off'
          keyboardType='number-pad'
          containerStyle={styles.input}
          inputContainerStyle={{borderBottomWidth: 0}}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <Input
          placeholder="Name"
          leftIcon={{ type: 'MaterialIcons', name: 'face', size:24, color: '#9c9c9c', paddingRight:10  }}
          autofillHints='off'
          containerStyle={styles.input}
          inputContainerStyle={{borderBottomWidth: 0}}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity style = { styles.btnLogin } onPress={this.submitForm}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style = { styles.btnReg }>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LoginScreen
