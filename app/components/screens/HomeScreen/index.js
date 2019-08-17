import React, { Component } from 'react'
import {
  SafeAreaView,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase'
import User from '../../User'
import styles from './styles'

class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitleStyle: { alignSelf: 'center' },
      title: 'Chats',
      headerRight: (
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Image source={require('../../../assets/profile.png')} style = { styles.profileImage } />
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
        //style={styles.rowButton}
      >
        <Text style={styles.rowText}>{item.name}</Text>
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
