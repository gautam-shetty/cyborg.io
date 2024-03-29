import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler'
import User from '../../User'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

class ChatScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', null)
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam('name'),
        phone: props.navigation.getParam('phone'),
      },
      textMessage: '',
      messageList:[],
    }
    console.ignoredYellowBox = ['Setting a timer'];
  }

  componentDidMount() {
    firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).on('child_added', (value)=>{
      this.setState((prevState)=>{
        return{
          messageList: [...prevState.messageList, value.val()]
        }
      })
    })
  }

  state = {
    textMessage: ''
  }

  handleChange = key=> val=> {
    this.setState({[key]:val})
  }

  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = ( d.getHours() < 10 ? '0' : '') + d.getHours() + ":";
    result += ( d.getMinutes() < 10 ? '0': '') + d.getMinutes();
    if(c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result
  }

  sendMessage = async() => {
    if(this.state.textMessage.length>0) {
      let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key
      let updates = {}
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
      }
      updates['messages/'+User.phone+'/'+this.state.person.phone+'/'+msgId]=message;
      updates['messages/'+this.state.person.phone+'/'+User.phone+'/'+msgId]=message;
      firebase.database().ref().update(updates);
      this.setState({ textMessage: '' });
    }
  }

  renderRow = ({item}) => {
    return(
      <View style={{
        flexDirection: 'row',
        alignSelf: item.from==User.phone ? 'flex-end' : 'flex-start',
        backgroundColor: item.from==User.phone ? '#00897b' : '#7cb342',
        paddingHorizontal:10,
        borderRadius:9,
        marginBottom:10,
      }}>
        <Text style = { styles.msgData }>{item.message}</Text>
        <Text style = { styles.msgTime }>{this.convertTime(item.time)}</Text>
      </View>
    )
  }

  render() {
    let {height, width} = Dimensions.get('window');
    const KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + StatusBar.currentHeight;
    return(
      <SafeAreaView>
        <FlatList
          style={{padding: 10, height: height*0.8}}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item,index)=>index.toString()}
        />
        <View style={styles.chatFooter}>
          <TextInput
            style={styles.input}
            value={this.state.textMessage}
            placeholder="Type a message"
            onChangeText={this.handleChange('textMessage')}
          />
          <TouchableOpacity onPress={this.sendMessage} style = { styles.btnSend }>
            <Icon style = { styles.profileIcon } name="send" size={32} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

}

export default ChatScreen
