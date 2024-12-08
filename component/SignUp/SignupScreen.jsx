import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from '../Header';
import formStyles from '../Login/formStyles';
import { Call, Key, Profile } from '../Icons/MyIcon';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    cPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
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

    const requiredFields = {
      name: 'Name',
      phone: 'Phone number',
      email: 'Email',
      password: 'Password',
      cPassword: 'Confirm password',
    };

    // Check for empty fields
    Object.keys(requiredFields).forEach((key) => {
      if (!formData[key].trim()) {
        fieldErrors[key] = `${requiredFields[key]} is required`;
        valid = false;
      }
    });

    // Validate phone number length
    if (formData.phone && formData.phone.trim().length < 10) {
      fieldErrors.phone = 'Phone number is not valid';
      valid = false;
    }

    // Check password mismatch
    if (formData.password !== formData.cPassword) {
      fieldErrors.cPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(fieldErrors);
    return valid;
  };


  const handleContinue = () => {
    const isValid = validateForm();
    setLoading(true);
    if (isValid) {
      console.log('Form submitted successfully', formData);

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
              maxLength={10}
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

          {/* email Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Profile fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Email"
              placeholderTextColor="#888"
              value={formData.email}
              onChangeText={(text) => onInputChange(text, 'email')}
            />
          </View>
          {errors.email && <Text style={formStyles.error}>{errors.email}</Text>}

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

          {/* Continue Button */}
          {loading ? (
            <TouchableOpacity
              style={[formStyles.continueButton, formStyles.loadingButton]}
              disabled={true}
            >
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

    </ScrollView >
  );
};

export default SignupScreen;
