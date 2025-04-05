import { StyleSheet } from 'react-native';

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  background: {
    backgroundColor: '#fff',
  },
  icon: {
    marginLeft: 2,
  },
  flex: {
    flexGrow: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: 30,
  },
  opacityView: {
    opacity: 0.6,
  },
  textInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  height: {
    height: 120,
  },
  errormessText: {
    color: 'red',
    marginBottom: 10,
  },
  containerBack: {
    backgroundColor: '#fff',
  },
  containerFlex: {
    flexGrow: 1,
  },
  padding: {
    paddingHorizontal: 30,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
    textAlign: 'center',
  },
  loremSubText: {
    fontSize: 12,
    color: '#7E7E7E',
    textAlign: 'center',
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
  section2: {
    marginTop: 20,
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
  continueButton: {
    backgroundColor: '#00239C', // Dark blue color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingButton: {
    opacity: 0.7,
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
    marginBottom: 20,
    flexDirection: 'row', // Ensures items are in a row
    alignItems: 'center', // Vertically aligns text and icon
    justifyContent: 'center', // Centers content horizontally
  },
  forgotText: {
    marginTop: 10, // Adjust space above the link
    textAlign: 'right', // Align to the right side, you can adjust as needed
    color: '#0066CC', // Blue color for the link
    fontSize: 14, // Font size for the link
    fontWeight: 'bold', // Optional, to make it stand out
    textDecorationLine: 'underline',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
  CheckBoxText: {
    color: '#333',
  },
  CheckBox: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default formStyles;
