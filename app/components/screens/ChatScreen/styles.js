import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '85%',
    marginBottom: 7,
    marginLeft: 7,
    borderRadius: 10,
  },
  chatFooter: {
    marginTop: 7,
    flexDirection:'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  msgData: {
    color: '#fff',
    padding: 7,
    fontSize: 15
  },
  msgTime:{
    color: '#eee',
    padding: 3,
    fontSize: 12
  },
  btnSend: {
    paddingBottom: 10,
    marginLeft: 10,
  }
})
