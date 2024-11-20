import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import formStyles from '../Login/formStyles';
import { BackArrow, Call, Key } from '../Icons/MyIcon';
import Header from '../Header';

const ForgotScreen = ({ navigation }) => {
  // State variables for input values
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle the "Continue" button action
  const handleContinue = () => {
    // Add validation logic here
    if (!phone || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      setErrorMessage('');
      // Add logic for processing, e.g., API calls, navigation, etc.
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <Header />
      <View style={[formStyles.container, { paddingHorizontal: 30 }]}>
        {/* Header Section */}
        <View style={formStyles.section2}>
          <View style={formStyles.TopHead}>
            <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
              <View style={formStyles.backbtn}>
                <BackArrow fill="white" />
              </View>
            </TouchableOpacity>
            <Text style={formStyles.loginText}>Reset Password</Text>
          </View>

          {/* Phone Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Call fill="#fff" />
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Phone Number"
              placeholderTextColor="#888"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"  // Ensure proper keyboard type for phone number
            />
          </View>

          {/* Password Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Key fill="white" />
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter New Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}  // Hide password input
            />
          </View>

          {/* Confirm Password Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Key fill="white" />
            </View>
            <TextInput
              style={formStyles.input}  // Adjust height for textarea effect
              placeholder="Confirm Your Password"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}  // Hide confirm password input
            />
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
          ) : null}

          {/* Continue Button */}
          <TouchableOpacity style={formStyles.button} onPress={handleContinue}>
            <Text style={formStyles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer */}
      <View style={formStyles.footer}>
        <Text style={formStyles.footerText}>Copyright ©. All Rights Reserved</Text>
      </View>
    </ScrollView>
  );
};

export default ForgotScreen;
