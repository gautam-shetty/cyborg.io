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
import { Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];

  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chats',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#00897b',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
          <Icon style = { styles.profileIcon } name="person-add" size={32} color="white"/>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Icon style = { styles.profileIcon } name="person" size={32} color="white"/>
        </TouchableOpacity>
      )
    }
  }

  state = {
    users: [],
    search: '',
  }

  updateSearch = search => {
    this.setState({ search });
  };

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
      <Button round
        icon={{
          name: "assignment-ind",
          size: 22,
          color: "#00897b"
        }}
        type="clear"
        buttonStyle={{ justifyContent: 'flex-start', backgroundColor:'#eeeeee' }}
        containerStyle = {{ paddingHorizontal: 10, paddingTop: 7 }}
        title={item.name}
        titleStyle={{ color:"#464646", fontSize: 22}}
        onPress={()=>this.props.navigation.navigate('Chat', item)}
      />
    )
  }

  render() {
    const { search } = this.state;
    return(
      <SafeAreaView>
        <SearchBar lightTheme round
          placeholder="Search contacts ..."
          containerStyle={{ backgroundColor:'white', borderBottomColor: '#00897b', borderBottomWidth: 0.5 }}
          inputContainerStyle={{paddingHorizontal: 8, backgroundColor:'#dedede' }}
          onChangeText={this.updateSearch}
          value={search}
        />
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
