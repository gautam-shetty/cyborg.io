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
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
  }

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
        <Button
          icon={ <Icon name="phone" size={24} color="grey" /> }
          title={User.phone}
          titleStyle={{ fontSize:20, width:'65%' }}
          containerStyle={{ padding:10, marginRight: 60 }}
          buttonStyle={{ padding:10 }}
          type="clear"
          disabled="true"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:100 }}>
          <Input
            leftIcon={{ type: 'MaterialIcons', name: 'face', size:24, color: '#9c9c9c', paddingRight:10  }}
            containerStyle = { styles.input }
            value={this.state.name}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={this.handleChange('name')}
          />
          <TouchableOpacity style={{ paddingBottom: 10, marginLeft: 10 }} onPress={this.changeName}>
            <Icon name='check-circle' size={30} color="#007d0e" />
          </TouchableOpacity>
        </View>
        <Button
          icon={ <Icon name="exit-to-app" size={24} color="white" /> }
          raised
          iconRight
          title="Logout "
          titleStyle={{ fontSize:20 }}
          buttonStyle={{ padding:10, paddingHorizontal: 30, borderRadius: 20, backgroundColor:"#ffa7a7" }}
          onPress={this._logOut}
        />
      </SafeAreaView>
    );
  }

}

export default ProfileScreen
