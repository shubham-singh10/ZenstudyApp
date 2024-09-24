import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginSlider from './LoginSlider';
import Header from '../Header';

const LoginScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login Button Clicked');
  };

  return (
    <ScrollView>
      <Header />
      <View style={styles.container}>
        <View style={styles.section1}>
          <View style={styles.titleContainer}>
            <Text style={styles.loremText}>Lorem Ipsum has been</Text>
            <Text style={styles.loremSubText}>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s
            </Text>

            <SafeAreaView style={styles.imageContainer}>
              <LoginSlider />
            </SafeAreaView>
          </View>

          {/* Login Section */}
          <Text style={styles.welcomeText}>
            Welcome To <Text style={styles.brandName}>ZenStudy</Text>
          </Text>
          <Text style={styles.taglineText}>
            Curiosity | Intuitive Study | Imaginative
          </Text>
        </View>

        <View style={styles.section2}>
          <Text style={styles.loginText}>Login</Text>

          {/* Mobile Number Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputlogo}>91</Text>
            <Text style={styles.inputlogo2}>91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>New User? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.signupLink}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
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
    fontSize: 14,
    color: '#054BB4',
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#054BB4',
    borderRadius: 5,
    
  },
  input: {
    flex: 5,
    fontSize: 16,
    paddingVertical: 10,
  },
  inputlogo:{
    flex:1,
    color:'white',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#054BB4',
    height:'100%',
    paddingHorizontal:5,
  },
  inputlogo2:{
    
  },
  button: {
    backgroundColor: '#007BFF',
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

export default LoginScreen;
