import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../Header';
import Otpstyle from './OtpStyle';
import formStyles from '../Login/formStyles';
import { BackArrow } from '../Icons/MyIcon';

const OtpVerificationScreen = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    //console.log('Entered OTP:', otp.join(''));
    // Add OTP verification logic
  };

  return (
    <ScrollView 
      style={{ backgroundColor: '#fff' }} 
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Header />
        <View style={Otpstyle.container}>
        <View style={formStyles.TopHead}>
        <TouchableOpacity onPress={() => navigation.navigate('signupScreen')}>
          <View style={formStyles.backbtn}>
            <BackArrow fill="white" />
          </View>
        </TouchableOpacity>
        <Text style={Otpstyle.title}>OTP Verification</Text>
      </View>

          <View style={[Otpstyle.phoneContainer, {marginTop:20}]}>
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
    
  );
};

export default OtpVerificationScreen;
