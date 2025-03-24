import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { checkUser, sendOtp, verifyOtp, signupUser } from './store';
import formStyles from '../Login/formStyles';

const SignupScreenNew = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    cPassword: '',
    otp: '',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { setIsLoggedIn } = useContext(AuthContext);
  const { userData, loading, error } = useSelector(state => state.rauth);

   useEffect(() => {
     if (userData) {
       setIsLoggedIn(true);
     }
   }, [userData, setIsLoggedIn]);

  const onInputChange = (value, field) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {setErrors({ ...errors, [field]: '' });}
  };

  const validateForm = (fields) => {
    let fieldErrors = {};
    fields.forEach((field) => {
      if (!formData[field].trim()) {
        fieldErrors[field] = `${field} is required`;
      }
    });

    if (formData.password && formData.password.length < 8) {
      fieldErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.cPassword) {
      fieldErrors.cPassword = 'Passwords do not match';
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleNext = async () => {
    if (step === 1 && validateForm(['name', 'phone', 'email', 'password', 'cPassword'])) {
      const result = await dispatch(checkUser(formData.email));
      if (result.payload.message === 'User not found') {
        await dispatch(sendOtp(formData.phone));
        setStep(2);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Account already exists',
          text2: 'Please login.',
          visibilityTime: 5000,
          position: 'top',
        });
      }
    } else if (step === 2 && formData.otp) {
      const otpResult = await dispatch(verifyOtp({ phone: formData.phone, otp: formData.otp }));
      if (otpResult.payload.success) {
        setStep(3);
      } else {
        Alert.alert('OTP Error', 'Invalid OTP, please try again.');
      }
    } else if (step === 3) {
      await dispatch(signupUser(formData));
    }
  };

  const handleBack = () => step > 1 && setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            {['name', 'email', 'phone', 'password', 'cPassword'].map(field => (
              <View key={field} style={formStyles.inputContainer}>
                <TextInput
                  style={formStyles.input}
                  placeholder={`Enter ${field}`}
                  secureTextEntry={field.includes('password')}
                  value={formData[field]}
                  onChangeText={text => onInputChange(text, field)}
                />
                {errors[field] && <Text style={formStyles.error}>{errors[field]}</Text>}
              </View>
            ))}
          </>
        );
      case 2:
        return (
          <View style={formStyles.inputContainer}>
            <TextInput
              style={formStyles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={formData.otp}
              onChangeText={text => onInputChange(text, 'otp')}
            />
          </View>
        );
      case 3:
        return <Text>Registering...</Text>;
    }
  };

  return (
    <ScrollView contentContainerStyle={formStyles.scrollContent}>
      <View style={formStyles.container}>
        {renderStep()}
        <View style={formStyles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={formStyles.backButton} onPress={handleBack}>
              <Icon name="arrow-back" size={24} color="#000" />
              <Text style={formStyles.backText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={formStyles.button} onPress={handleNext}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={formStyles.buttonText}>{step === 3 ? 'Sign Up' : 'Next'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreenNew;
