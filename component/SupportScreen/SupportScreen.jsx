import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import formStyles from './supportStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

const SupportScreen = ({ navigation }) => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleContinue = async () => {
    setErrorMessage('');

    // Basic form validation example
    if (!name || !email || !message || !phone) {
      setErrorMessage('All fields are required.');
      return;
    }
    setIsLoading(true);
    const sendData = {
      name: name,
      email: email,
      phone: phone,
      type: 'enquiry',
      message: message,
    };
    try {
      const response = await fetch(
        'https://api.zenstudy.in/zenstudy/api/contact',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data) {
        Toast.show({
          type: 'success',
          text1: 'Message Sent',
          text2: 'Thank you for reaching out. We will get back to you soon.',
        });

        // Optionally clear form
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (error) {
      // console.error('Error sending support form:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again later.',
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={formStyles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={formStyles.flexContainer}
      >
        <View style={formStyles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#004aad" />
          </TouchableOpacity>
          <Text style={formStyles.headerTitle}>Support</Text>
        </View>

        <View style={formStyles.card}>
          {/* Name */}
          <View style={formStyles.inputWrapper}>
            <MaterialIcons name="person" size={24} color="#004aad" />
            <TextInput
              placeholder="Full Name"
              style={formStyles.input}
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View style={formStyles.inputWrapper}>
            <MaterialIcons name="email" size={24} color="#004aad" />
            <TextInput
              placeholder="Email Address"
              style={formStyles.input}
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Phone */}
          <View style={formStyles.inputWrapper}>
            <MaterialIcons name="phone" size={24} color="#004aad" />
            <TextInput
              placeholder="Phone Number"
              style={formStyles.input}
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Message */}
          <View style={[formStyles.inputWrapper, formStyles.textAreaWrapper]}>
            <MaterialIcons name="message" size={24} color="#004aad" />
            <TextInput
              placeholder="Your Message"
              style={[formStyles.input, formStyles.textArea]}
              placeholderTextColor="#888"
              multiline
              numberOfLines={5}
              value={message}
              onChangeText={setMessage}
            />
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={formStyles.errorText}>{errorMessage}</Text>
          ) : null}

          {/* Button */}
          <TouchableOpacity
            style={formStyles.button}
            onPress={handleContinue}
            disabled={isLoading}
          >
            <Text style={formStyles.buttonText}>
              {isLoading ? 'Please wait...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SupportScreen;
