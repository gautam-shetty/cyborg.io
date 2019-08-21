import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginHeader: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 45,
    padding: 75,
    color: "#464646",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    marginBottom: 10,
    borderRadius: 55,
  },
  btnLogin: {
    padding: 2,
    marginTop: 30,
    backgroundColor: '#80ac8a',
    width: '90%',
    borderRadius: 55,
  },
  btnReg: {
    padding: 2,
    marginTop: 10,
    backgroundColor: '#91a6d6',
    width: '90%',
    borderRadius: 55,
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "white",
    padding: 13,
  },
})
