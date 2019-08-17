import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';
import User from '../../User'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCKu0vBvnVPap-1lcCeoOhd-uJctX4ALxY",
      authDomain: "cyborgio.firebaseapp.com",
      databaseURL: "https://cyborgio.firebaseio.com",
      projectId: "cyborgio",
      storageBucket: "",
      messagingSenderId: "982997113771",
      appId: "1:982997113771:web:947c222933ee545c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
