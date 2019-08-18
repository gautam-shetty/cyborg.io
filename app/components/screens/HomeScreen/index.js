import React, { Component } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase'
import User from '../../User'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chats',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#00897b',
      },
      headerRight: (
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Icon style = { styles.profileIcon } name="person" size={32} color="white"/>
        </TouchableOpacity>
      )
    }
  }

  state = {
    users: [],
  }

  componentDidMount() {
    let debRef=firebase.database().ref('users')
    debRef.on('child_added',(val)=> {
      let person =val.val();
      person.phone=val.key;
      if (person.phone==User.phone) {     //to prevent displaying current user
        User.name=person.name
      } else {
        this.setState((prevState)=>{
          return{
            users:  [...prevState.users, person]
          }
        })
      }
    })
  }

  renderRow=({item})=> {
    return(
      <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('Chat', item)}
        style={styles.chatPerson}
      >
        <Text style={styles.chatPersonText}><Icon name="message" size={15} /> {item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <SafeAreaView>
        <FlatList
          data= {this.state.users}
          renderItem={this.renderRow}
          keyExtractor={(item)=>item.phone}
        />
      </SafeAreaView>
    );
  }

}

export default HomeScreen
