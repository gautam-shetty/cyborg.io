import React, {Component} from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import styles from './styles'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import AuthLoadingScreen from './screens/AuthLoadingScreen'

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ LogIn: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
