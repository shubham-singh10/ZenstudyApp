import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../Header';
import formStyles from '../Login/formStyles';
import { Call, Key, Profile } from '../Icons/MyIcon';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    cPassword: '',
  });
  const [loading, setloading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const onInputChange = (value, field) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    if (field === 'cPassword' || field === 'password') {
      if (formData.password !== value && field === 'cPassword') {
        setPasswordError('Passwords do not match');
      } else if (formData.cPassword !== value && field === 'password') {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const validateForm = () => {
    let fieldErrors = {};
    let valid = true;

    // Check if fields are empty only

    const stepFields = ['name', 'password', 'cPassword', 'phone'];

    stepFields.forEach((key) => {
      if (!formData[key].trim()) {
        fieldErrors[key] = 'This field is required';
        valid = false;
      }
    });

    // Additional password matching validation
    if (formData.password !== formData.cPassword) {
      fieldErrors.cPassword = 'Passwords do not match';
      valid = false;
    }

    // Check if user agreed to terms and conditions
    if (!isChecked) {
      Alert.alert('Please agree to terms and conditions.');
      valid = false;
    }

    // Set errors for empty fields
    setErrors(fieldErrors);

    return valid;
  };

  // const handleContinue = () => {
  //   if (password !== confirmPassword) {
  //     setErrorMessage('Passwords do not match');
  //     return;
  //   }
  //   setErrorMessage('');
  //   navigation.navigate('otpScreen');
  // };

  const handleContinue = () => {
    const isValid = validateForm();
    setloading(true);
    if (isValid) {
      if (passwordError) {
        console.log('Fix password errors first');
      } else {
        console.log('form submitted successfully', formData);
        setloading(false);
      }
    }
  };

  return (
    <ScrollView
      style={formStyles.scrollView}
      contentContainerStyle={formStyles.scrollContent}
    >
      <Header />

      <View style={formStyles.container}>
        {/* Sign Up Section */}
        <View style={formStyles.section2}>
          <Text style={formStyles.loginText}>Sign Up</Text>

          {/* Mobile Number Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Call fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Mobile Number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => onInputChange(text, 'phone')}
            />
            {errors.phone && <Text style={formStyles.error}>{errors.phone}</Text>}
          </View>

          {/* Name Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Profile fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Name"
              value={formData.name}
              onChangeText={(text) => onInputChange(text, 'name')}
            />
            {errors.name && <Text style={formStyles.error}>{errors.name}</Text>}
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
              value={formData.password}
              onChangeText={(text) => onInputChange(text, 'password')}
            />
            {errors.password && <Text style={formStyles.error}>{errors.password}</Text>}
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
              value={formData.cPassword}
              onChangeText={(text) => onInputChange(text, 'cPassword')}
            />
          </View>

          {/* Error Message for Password Mismatch */}
          {errors.cPassword && <Text style={formStyles.error}>{errors.cPassword}</Text>}
          {passwordError ? <Text style={formStyles.error}>{passwordError}</Text> : null}

          {/* Continue Button */}
          {loading ? (
            <TouchableOpacity style={[formStyles.continueButton, formStyles.loadingButton]} disabled={true}>
              <ActivityIndicator size="small" color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={formStyles.button}
              onPress={handleContinue}
            >
              <Text style={formStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
          )}

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
