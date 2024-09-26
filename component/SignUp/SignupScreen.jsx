import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '../Header';
import LoginStyle from '../Login/LoginStyle';
import { Call, Key, Lock, Profile, User } from '../Icons/MyIcon';

const { height } = Dimensions.get('window');

const SignupScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');


  return (
    <ScrollView>
      <Header />
      <View style={{height:height, paddingHorizontal:30, backgroundColor:'#fff'}}>
        <View style={LoginStyle.section2}>
          <Text style={LoginStyle.loginText}>SignUp</Text>

          {/* Mobile Number Input */}
          <View style={LoginStyle.inputContainer}>
            <View style={LoginStyle.inputlogo}>
              <Text style={LoginStyle.inputlogoContent}> <Call fill='#fff'/> </Text>
            </View>
            <View style={LoginStyle.inputlogo2}>
              
            </View>

            <TextInput
              style={LoginStyle.input}
              placeholder="Enter Your Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          <View style={LoginStyle.inputContainer}>
            <View style={LoginStyle.inputlogo}>
              <Text style={LoginStyle.inputlogoContent}><Profile fill='white'/> </Text>
            </View>
            <View style={LoginStyle.inputlogo2}>
              
            </View>

            <TextInput
              style={LoginStyle.input}
              placeholder="Enter Your Name"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          <View style={LoginStyle.inputContainer}>
            <View style={LoginStyle.inputlogo}>
              <Text style={LoginStyle.inputlogoContent}> <Key fill="white"/> </Text>
            </View>
            <View style={LoginStyle.inputlogo2}>
              
            </View>

            <TextInput
              style={LoginStyle.input}
              placeholder="Enter Your Password"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          {/* Password Input */}
          <View style={LoginStyle.inputContainer}>
            <View style={LoginStyle.inputlogo}>
              <Text style={LoginStyle.inputlogoContent}> <Key fill="white"/> </Text>
            </View>
            <View style={LoginStyle.inputlogo2}>
            
              
            </View>
            <TextInput
              style={LoginStyle.input}
              placeholder="Confirm Your Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={LoginStyle.button}
            onPress={() => navigation.navigate('otpScreen')}>
            <Text style={LoginStyle.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={LoginStyle.signupContainer}>
            <Text style={LoginStyle.signupText}>Existing User? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
              <Text style={LoginStyle.signupLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={LoginStyle.footer}>
        <Text style={LoginStyle.footerText}>
          Copyright (c). All Rights Reserved
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
