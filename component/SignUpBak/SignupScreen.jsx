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
import CheckBox from '@react-native-community/checkbox';
import Header from '../Header';
import formStyles from '../Login/formStyles';
import { Call, Key, Profile } from '../Icons/MyIcon';
import auth from '@react-native-firebase/auth';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    cPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

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

    const stepFields = ['name', 'password', 'cPassword', 'phone'];

    stepFields.forEach((key) => {
      if (!formData[key].trim()) {
        fieldErrors[key] = 'This field is required';
        valid = false;
      }
    });

    if (formData.password !== formData.cPassword) {
      fieldErrors.cPassword = 'Passwords do not match';
      valid = false;
    }

    if (!isChecked) {
      Alert.alert('Please agree to terms and conditions.');
      valid = false;
    }

    setErrors(fieldErrors);

    return valid;
  };

  const signInWithPhoneNumber = async () => {
    // console.log('called: ', phone);
    const confirmations = await auth().signInWithPhoneNumber('+918130325002');
    Alert.alert('Otp send success +918130325002');
    console.log('Confirmations: ', confirmations);
    setConfirmation(confirmations);
  };

  const handleContinue = () => {
    const isValid = validateForm();
    setLoading(true);
    if (isValid) {
      if (passwordError) {
        console.log('Fix password errors first');
      } else {
        console.log('Form submitted successfully', formData);
        signInWithPhoneNumber(formData.phone);
      }
    }
    setLoading(false);
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
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => onInputChange(text, 'phone')}
            />
          </View>
          {errors.phone && <Text style={formStyles.error}>{errors.phone}</Text>}

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
              placeholderTextColor="#888"
              value={formData.name}
              onChangeText={(text) => onInputChange(text, 'name')}
            />
          </View>
          {errors.name && <Text style={formStyles.error}>{errors.name}</Text>}

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
              placeholderTextColor="#888"
              secureTextEntry={true}
              value={formData.password}
              onChangeText={(text) => onInputChange(text, 'password')}
            />
          </View>
          {errors.password && <Text style={formStyles.error}>{errors.password}</Text>}

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
              placeholderTextColor="#888"
              secureTextEntry={true}
              value={formData.cPassword}
              onChangeText={(text) => onInputChange(text, 'cPassword')}
            />
          </View>

          {/* Error Message for Password Mismatch */}
          {errors.cPassword && <Text style={formStyles.error}>{errors.cPassword}</Text>}
          {passwordError ? <Text style={formStyles.error}>{passwordError}</Text> : null}
          <View style={formStyles.CheckBox}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              tintColors={{ true: '#4CAF50', false: 'gray' }}
            />
            <Text style={formStyles.CheckBoxText}>Agree to terms and conditions | Privacy Policy</Text>
          </View>
          {/* Continue Button */}
          {loading ? (
            <TouchableOpacity style={[formStyles.continueButton, formStyles.loadingButton]} disabled={true}>
              <ActivityIndicator size="small" color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={formStyles.button}
              onPress={signInWithPhoneNumber}
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

    </ScrollView >
  );
};

export default SignupScreen;
