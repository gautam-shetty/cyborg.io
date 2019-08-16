import React, {Component} from 'react';
import {
  //AsyncStorage,
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import User from '../../User'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'

class LoginScreen extends Component {

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
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          placeholder="Phone Number"
          keyboardType='number-pad'
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LoginScreen
