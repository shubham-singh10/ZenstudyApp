import { Dimensions, StyleSheet } from 'react-native';

const Otpstyle = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  phoneText: {
    fontSize: 14,
    color: '#717171',
    fontWeight: 'bold',
  },
  editIcon: {
    marginLeft: 8,
  },
  editText: {
    fontSize: 14,
    color: '#007bff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#000000',
    textAlign: 'center', // Center label text
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Adjust spacing between OTP inputs
    marginVertical: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: '#054bb4',
    color: '#fff',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 12,
    color: '#666',
  },
  resendLink: {
    fontSize: 12,
    color: '#007bff',
  },
  continueButton: {
    backgroundColor: '#054bb4',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Otpstyle;
