import {StyleSheet} from 'react-native';

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#b5b5b5',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 20,
    marginTop: 30,
  },
  loremText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  loremSubText: {
    fontSize: 14,
    color: '#7E7E7E',
    textAlign: 'left',
  },
  welcomeText: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  brandName: {
    color: '#054BB4',
  },
  taglineText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#054BB4',
  },
  loginText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#054BB4',
    borderRadius: 5,
  },
  input: {
    flex: 5,
    fontSize: 16,
    paddingVertical: 10,
  },
  inputlogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#054BB4',
    paddingHorizontal: 5,
    height: 50,
  },
  inputlogoContent: {
    color: '#fff',
  },

  inputlogo2: {
    flex: 0,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#054bb4',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
  signupText: {
    fontSize: 14,
    color: '#7E7E7E',
  },
  signupLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginStyle;
