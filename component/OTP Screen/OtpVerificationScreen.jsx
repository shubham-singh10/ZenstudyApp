import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../Header';
import Otpstyle from './OtpStyle';
import Footer from '../Footer';
import MainHeader from '../MainHeader';

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    // Set the current input value
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus next input if text is entered
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }

    // If input is empty and not the first input, focus previous input
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace key to focus the previous input if empty
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    console.log('Entered OTP:', otp.join(''));
    // Add your OTP verification logic here
  };

  return (
    <View style={{position:'relative'}}>
    <MainHeader/>
    <ScrollView>
      <View style={Otpstyle.container}>
        <Text style={Otpstyle.title}>OTP Verification</Text>
        <View style={Otpstyle.phoneContainer}>
          <Text style={Otpstyle.phoneText}>OTP Sent To +91-798xxxx31</Text>
          <TouchableOpacity style={Otpstyle.editIcon}>
            <Text style={Otpstyle.editText}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={Otpstyle.label}>Enter OTP</Text>
        <View style={Otpstyle.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={Otpstyle.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(input) => (inputs.current[index] = input)}
            />
          ))}
        </View>
        <View style={Otpstyle.resendContainer}>
          <Text style={Otpstyle.resendText}>Didn’t receive the OTP? </Text>
          <TouchableOpacity>
            <Text style={Otpstyle.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={Otpstyle.continueButton} onPress={handleContinue}>
          <Text style={Otpstyle.continueText}>Continue</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
    <Footer/>
    </View>
  );
};

export default OtpVerificationScreen;