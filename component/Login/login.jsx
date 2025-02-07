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
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginSlider from './LoginSlider';
import Header from '../Header';
import formStyles from './formStyles';
import { Call, Key } from '../Icons/MyIcon';
import { useDispatch, useSelector } from 'react-redux';
import { loginData } from './store';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
  const { userData, loading, error } = useSelector((state) => state.auth);
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    }
  }, [userData, setIsLoggedIn]);

  useEffect(() => {
    if (error && hasAttemptedLogin) {
      Alert.alert('Login Error', error, [{ text: 'OK' }]);
      setHasAttemptedLogin(false);
    }
  }, [error, hasAttemptedLogin]);

  const handleLogin = async () => {
    if (mobileNumber && password) {
      dispatch(loginData({ phone: mobileNumber, password }))
        .unwrap()
        .then((response) => {
          // Success message
          Toast.show({
            type: 'success',
            text1: 'Welcome Back!',
            text2: `Hello ${response.name}, you are successfully logged in!`,
            visibilityTime: 5000, // 5 seconds
            position: 'top',
          });
        })
        .catch((errors) => {
          // Error message
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: errors || 'Something went wrong. Please try again.',
            visibilityTime: 5000, // 5 seconds
            position: 'top',
          });
        });
    } else {
      // Missing input fields
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please enter both your mobile number and password to proceed.',
        visibilityTime: 5000, // 5 seconds
        position: 'top',
      });
    }
  };

  return (
    <ScrollView
      style={formStyles.scrollView}
      contentContainerStyle={formStyles.scrollContent}
    >
      <Header />
      <View style={formStyles.container}>
        <View style={formStyles.section1}>
          <View style={formStyles.titleContainer}>
            <Text style={formStyles.loremText}>Transforming Education</Text>
            <Text style={formStyles.loremSubText}>
              Making Education Imaginative
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

          {/* Mobile Number Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}> <Call fill="#fff" /> </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Mobile Number"
              placeholderTextColor="#888"
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
              placeholderTextColor="#888"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}><Text style={formStyles.forgotText}>Forgot Password ?</Text></TouchableOpacity> */}

          {/* Login Button */}
          {loading ? (
            <TouchableOpacity style={formStyles.button} onPress={handleLogin} disabled>
              <ActivityIndicator size="small" color="#ffffff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={formStyles.button} onPress={handleLogin}>
              <Text style={formStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
          )}

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
    </ScrollView >
  );
};

export default LoginScreen;
