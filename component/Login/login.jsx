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
import formStyles from './formStyles';
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
      <View style={formStyles.container}>
        <View style={formStyles.section1}>
          <View style={formStyles.titleContainer}>
            <Text style={formStyles.loremText}>Lorem Ipsum has been</Text>
            <Text style={formStyles.loremSubText}>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s
            </Text>

            <SafeAreaView style={formStyles.imageContainer}>
              <LoginSlider />
            </SafeAreaView>
          </View>

          {/* Login Section */}
          <Text style={formStyles.welcomeText}>
            Welcome To <Text style={formStyles.brandName}>ZenStudy</Text>
          </Text>
          <Text style={formStyles.taglineText}>
            Curiosity | Intuitive Study | Imaginative
          </Text>
        </View>

        <View style={formStyles.section2}>
          <Text style={formStyles.loginText}>Login</Text>

          {/* Mobile Number Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}> <Call fill="#fff" /> </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          {/* Password Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}> <Key fill="white" /> </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity onPress={()=>navigation.navigate('forgotPassword')}><Text style={formStyles.forgotText}>Forgot Password ?</Text></TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={formStyles.button} onPress={() => navigation.navigate('homeScreen')}>
            <Text style={formStyles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={formStyles.signupContainer}>
            <Text style={formStyles.signupText}>New User? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signupScreen')}>
              <Text style={formStyles.signupLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={formStyles.footer}>
        <Text style={formStyles.footerText}>Copyright ©. All Rights Reserved</Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
