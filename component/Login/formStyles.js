import { StyleSheet } from 'react-native';

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 3,
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
    color: '#000',
  },
  brandName: {
    color: '#054BB4',
  },
  taglineText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#054BB4',
  },
  TopHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backbtn: {
    backgroundColor: '#054BB4',
    padding: 5,
    borderRadius: 3,
  },
  loginText: {
    fontSize: 18, // Increased size for better visibility
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
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
    paddingHorizontal: 10,
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputlogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#054BB4',
    paddingHorizontal: 10,
    height: 50,
  },
  inputlogoContent: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#054BB4',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20, // added bottom margin for spacing
  },
  forgotText: {
    color: '#054bb4',
    fontSize: 14,
    fontWeight: '500',
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

export default formStyles;