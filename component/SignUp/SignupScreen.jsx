import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import Header from '../Header';
import formStyles from '../Login/formStyles';
import Toast from 'react-native-toast-message';
import { checkUser, sendOtp, signupUser, verifyOtp } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    cPassword: '',
    phoneStatus: 'notverified',
    userType: 'Reader',
    otp: '',
  });
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(state => state.rauth);
  const [passwordError, setPasswordError] = useState('');
  const [hasAttemptedSignUp, setHasAttemptedSignUp] = useState(false);
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn } = useContext(AuthContext);
  const slideAnim = useState(new Animated.Value(0))[0];

  const animate = (direction) => {
    Animated.timing(slideAnim, {
      toValue: direction === 'right' ? width : -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0);
    });
  };

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
  //Handle User Check and send OTP
  const handleNext = async () => {
    const isValid = validateForm();
    if (step === 1 && isValid) {
      const result = await dispatch(checkUser({ email: formData.email, phone: formData.phone }));
      if (result.payload === 'User not found.') {
        const otpResult = await dispatch(sendOtp(formData.email));
        if (otpResult.payload.message === 'OTP sent successfully') {
          Toast.show({
            type: 'success',
            text1: 'OTP Sent',
            text2: 'OTP has been sent successfully.',
            visibilityTime: 5000,
            position: 'top',
          });
          animate('right');
          setStep(2);
        } else {
          Toast.show({
            type: 'error',
            text1: 'OTP Error',
            text2: otpResult.payload.message || 'Failed to send OTP.',
            visibilityTime: 5000,
            position: 'top',
          });
        }
      } else {
        Toast.show({
          type: 'info',
          text1: 'Account Already Exists',
          text2: 'Please log in to continue.',
          visibilityTime: 5000,
          position: 'top',
        });
        navigation.navigate('loginScreen');
      }
    } else if (step === 2 && formData.otp) {
      // Verify OTP
      const otpResult = await dispatch(verifyOtp({ email: formData.email, otp: formData.otp }));
      if (otpResult.payload.message === 'Success') {
        handleContinue();
      } else {
        Toast.show({
          type: 'error',
          text1: 'OTP Verification Failed',
          text2: otpResult.payload.message || 'Failed to verify OTP.',
          visibilityTime: 5000,
          position: 'top',
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      animate('left');
      setStep(step - 1);
    }
  };

  const isNextDisabled = step === 2 && formData.otp.length !== 6;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          //Sign Up Section
          <View style={formStyles.section2}>
            <Text style={formStyles.loginText}>Sign Up</Text>

            {/* Name Input */}
            <View style={formStyles.inputContainer}>
              <View style={formStyles.inputlogo}>
                <Text style={formStyles.inputlogoContent}>
                  <Icon name="person" size={24} color="#fff" />
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
                  <Icon name="email" size={24} color="#fff" />
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
                  <Icon name="phone" size={24} color="#fff" />
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
                  <Icon name="lock" size={24} color="#fff" />
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
                  <Icon name="check-circle" size={24} color="#fff" />
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
          </View>
        );
      case 2:
        return (
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Icon name="vpn-key" size={24} color="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#888"
              onChangeText={text => onInputChange(text, 'otp')}
              maxLength={6}
            />
            {errors.otp && <Text style={formStyles.error}>{errors.otp}</Text>}
          </View>
        );
    }
  };

  return (
    <ScrollView
      style={formStyles.scrollView}
      contentContainerStyle={formStyles.scrollContent}>
      <Header />

      <Animated.View
        style={[
          formStyles.container,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >

        {renderStep()}
        {/* Continue Button */}
        {loading ? (
          <TouchableOpacity
            style={[formStyles.continueButton, formStyles.loadingButton]}
            disabled={true}>
            <ActivityIndicator size="small" color="#fff" />
          </TouchableOpacity>
        ) : (
          <View>
            {step > 1 && (
              <TouchableOpacity style={formStyles.backButton} onPress={handleBack}>
                <Icon name="arrow-back" size={24} color="#000" />
                <Text style={formStyles.backText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[formStyles.button, isNextDisabled && formStyles.disabledButton]}
              disabled={isNextDisabled}
              onPress={handleNext}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Text style={formStyles.buttonText}>{step === 2 ? 'Sign Up' : 'Next'}</Text>
                  <Icon name={step === 2 ? 'check' : 'arrow-forward'} size={24} color="#fff" />
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Existing User Link */}
        <View style={formStyles.signupContainer}>
          <Text style={formStyles.signupText}>Existing User? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('loginScreen')}>
            <Text style={formStyles.signupLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

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
