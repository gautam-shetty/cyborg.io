import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '85%',
    marginBottom: 10,
    borderRadius: 10,
  },
  chatView: {
    flexDirection:'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  msgDate: {
    color: '#fff',
    padding: 7,
    fontSize: 20
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
