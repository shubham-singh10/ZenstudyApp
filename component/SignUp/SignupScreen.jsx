import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../Header';
import formStyles from '../Login/formStyles';
import { Call, Email, Key, Profile } from '../Icons/MyIcon';
import Toast from 'react-native-toast-message';
import { signupUser } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    cPassword: '',
    phoneStatus: 'notverified',
    userType: 'Reader',
  });
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(state => state.rauth);
  const [passwordError, setPasswordError] = useState('');
  const [hasAttemptedSignUp, setHasAttemptedSignUp] = useState(false);
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    }
  }, [userData, setIsLoggedIn]);

  useEffect(() => {
    if (error && hasAttemptedSignUp) {
      Alert.alert('SignUp Error', error, [{ text: 'OK' }]);
      setHasAttemptedSignUp(false);
    }
  }, [error, hasAttemptedSignUp]);

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

    const requiredFields = {
      name: 'Name',
      phone: 'Phone number',
      email: 'Email',
      password: 'Password',
      cPassword: 'Confirm password',
    };

    // Check for empty fields
    Object.keys(requiredFields).forEach((key) => {
      if (!formData[key]?.trim()) {
        fieldErrors[key] = `${requiredFields[key]} is required`;
        valid = false;
      }
    });

    // Validate phone number (exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.trim())) {
      fieldErrors.phone = 'Phone number must be exactly 10 digits';
      valid = false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      fieldErrors.email = 'Email format is invalid';
      valid = false;
    }

    // Validate password length (at least 8 characters)
    if (formData.password && formData.password.trim().length < 8) {
      fieldErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    // Check password mismatch
    if (formData.password && formData.cPassword && formData.password !== formData.cPassword) {
      fieldErrors.cPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(fieldErrors);
    return valid;
  };


  const handleContinue = () => {
    const isValid = validateForm();
    if (isValid) {
      // //console.log('Form submitted successfully', formData);
      const { phone, name, email, userType, phoneStatus, password } = formData;
      dispatch(signupUser({ phone, name, email, userType, phoneStatus, password }))
        .unwrap()
        .then(response => {
          // Success message
          Toast.show({
            type: 'success',
            text1: 'Welcome Back!',
            text2: `Hello ${response.name}, you are successfully logged in!`,
            visibilityTime: 5000,
            position: 'top',
          });
        })
        .catch(err => {
          let errorMessage = err || 'Something went wrong. Please try again.';
          // Error message
          Toast.show({
            type: 'error',
            text1: 'Signup Failed',
            text2: errorMessage,
            visibilityTime: 5000,
            position: 'top',
          });
        });
    } else {
      // Missing input fields
      const invalidFields = Object.values(errors).join(', ');

      Toast.show({
        type: 'info',
        text1: 'Invalid Input',
        text2: `Please check: ${invalidFields}.`,
        visibilityTime: 5000,
        position: 'top',
      });
    }
  };

  return (
    <ScrollView
      style={formStyles.scrollView}
      contentContainerStyle={formStyles.scrollContent}>
      <Header />

      <View style={formStyles.container}>
        {/* Sign Up Section */}
        <View style={formStyles.section2}>
          <Text style={formStyles.loginText}>Sign Up</Text>

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
              onChangeText={text => onInputChange(text, 'name')}
            />
          </View>
          {errors.name && <Text style={formStyles.error}>{errors.name}</Text>}

          {/* email Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Email fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Email"
              placeholderTextColor="#888"
              value={formData.email}
              onChangeText={text => onInputChange(text, 'email')}
            />
          </View>
          {errors.email && <Text style={formStyles.error}>{errors.email}</Text>}

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
              maxLength={10}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={text => onInputChange(text, 'phone')}
            />
          </View>
          {errors.phone && <Text style={formStyles.error}>{errors.phone}</Text>}

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
              onChangeText={text => onInputChange(text, 'password')}
            />
          </View>
          {errors.password && (
            <Text style={formStyles.error}>{errors.password}</Text>
          )}

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
              onChangeText={text => onInputChange(text, 'cPassword')}
            />
          </View>

          {/* Error Message for Password Mismatch */}
          {errors.cPassword && (
            <Text style={formStyles.error}>{errors.cPassword}</Text>
          )}
          {passwordError ? (
            <Text style={formStyles.error}>{passwordError}</Text>
          ) : null}

          {/* Continue Button */}
          {loading ? (
            <TouchableOpacity
              style={[formStyles.continueButton, formStyles.loadingButton]}
              disabled={true}>
              <ActivityIndicator size="small" color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={formStyles.button}
              onPress={handleContinue}>
              <Text style={formStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
          )}

          {/* Existing User Link */}
          <View style={formStyles.signupContainer}>
            <Text style={formStyles.signupText}>Existing User? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('loginScreen')}>
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
