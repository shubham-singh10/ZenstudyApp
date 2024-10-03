import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '../Header';
import formStyles from '../Login/formStyles';
import { Call, Key, Profile } from '../Icons/MyIcon';

const SignupScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Function to handle the form submission and validation
  const handleContinue = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match'); // Set error message
      return;
    }
    setErrorMessage(''); // Clear the error if passwords match
    navigation.navigate('otpScreen'); // Proceed to the next screen if valid
  };

  return (
    <ScrollView 
      style={{ backgroundColor: '#fff' }} 
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Header />

      <View style={[formStyles.container, { paddingHorizontal: 30 }]}>
        {/* Sign Up Section */}
        <View style={formStyles.section2}>
          <Text style={formStyles.loginText}>Sign Up</Text>

          {/* Mobile Number Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Call fill='#fff' />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          {/* Name Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Profile fill='white' />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Password Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Key fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Key fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Confirm Your Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Error Message for Password Mismatch */}
          {errorMessage ? (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
          ) : null}

          {/* Continue Button */}
          <TouchableOpacity
            style={formStyles.button}
            onPress={handleContinue} // Call the validation function
          >
            <Text style={formStyles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/* Existing User Link */}
          <View style={formStyles.signupContainer}>
            <Text style={formStyles.signupText}>Existing User? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
              <Text style={formStyles.signupLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={formStyles.footer}>
        <Text style={formStyles.footerText}>
          Copyright ©. All Rights Reserved
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
