import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginSlider from './LoginSlider';
import Header from '../Header';
import LoginStyle from './LoginStyle';
import { Call, Key } from '../Icons/MyIcon';


const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView 
      style={{ backgroundColor: '#fff' }} 
      contentContainerStyle={{ flexGrow: 1 }} 
    >
      <Header />
      <View style={LoginStyle.container}>
        <View style={LoginStyle.section1}>
          <View style={LoginStyle.titleContainer}>
            <Text style={LoginStyle.loremText}>Lorem Ipsum has been</Text>
            <Text style={LoginStyle.loremSubText}>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s
            </Text>

            <SafeAreaView style={LoginStyle.imageContainer}>
              <LoginSlider />
            </SafeAreaView>
          </View>

          {/* Login Section */}
          <Text style={LoginStyle.welcomeText}>
            Welcome To <Text style={LoginStyle.brandName}>ZenStudy</Text>
          </Text>
          <Text style={LoginStyle.taglineText}>
            Curiosity | Intuitive Study | Imaginative
          </Text>
        </View>

        <View style={LoginStyle.section2}>
          <Text style={LoginStyle.loginText}>Login</Text>

          {/* Mobile Number Input */}
          <View style={LoginStyle.inputContainer}>
            <View style={LoginStyle.inputlogo}>
              <Text style={LoginStyle.inputlogoContent}> <Call fill="#fff" /> </Text>
            </View>
            <TextInput
              style={LoginStyle.input}
              placeholder="Enter Your Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          {/* Password Input */}
          <View style={LoginStyle.inputContainer}>
            <View style={LoginStyle.inputlogo}>
              <Text style={LoginStyle.inputlogoContent}> <Key fill="white" /> </Text>
            </View>
            <TextInput
              style={LoginStyle.input}
              placeholder="Enter Your Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={LoginStyle.button} onPress={() => navigation.navigate('homeScreen')}>
            <Text style={LoginStyle.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={LoginStyle.signupContainer}>
            <Text style={LoginStyle.signupText}>New User? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signupScreen')}>
              <Text style={LoginStyle.signupLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={LoginStyle.footer}>
        <Text style={LoginStyle.footerText}>Copyright ©. All Rights Reserved</Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
