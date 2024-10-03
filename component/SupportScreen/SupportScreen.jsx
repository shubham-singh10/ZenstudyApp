import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import formStyles from '../Login/formStyles';
import { BackArrow, Email, MessageIcon, Profile } from '../Icons/MyIcon';

const SupportScreen = ({ navigation }) => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleContinue = () => {
    setErrorMessage('');

    // Basic form validation example
    if (!name || !email || !message) {
      setErrorMessage('All fields are required.');
      return;
    }

    console.log('Form submitted with:', { name, email, message });
  };

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[formStyles.container, { paddingHorizontal: 30 }]}>
        {/* Header Section */}
        <View style={formStyles.section2}>
          <View style={formStyles.TopHead}>
            <TouchableOpacity onPress={() => navigation.navigate('profileScreen')}>
              <Text style={formStyles.backbtn}>
                <BackArrow fill="white" />
              </Text>
            </TouchableOpacity>
            <Text style={formStyles.loginText}>Support</Text>
          </View>

          {/* Name Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Profile fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Email fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Enter Your Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Message TextArea (multiline input) */}
          <View style={formStyles.inputContainer}>
            <View style={[formStyles.inputlogo, { height: 120}]}>
              <Text style={formStyles.inputlogoContent}>
                <MessageIcon fill="white" />
              </Text>
            </View>
            <TextInput
              style={[formStyles.input, { height: 120, textAlignVertical: 'top' }]}  // Adjust height for textarea effect
              placeholder="Enter Your Message"
              value={message}
              onChangeText={setMessage}
              multiline={true}
              numberOfLines={6}  // Define number of lines for textarea effect
            />
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
          ) : null}

          {/* Continue Button */}
          <TouchableOpacity style={formStyles.button} onPress={handleContinue}>
            <Text style={formStyles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SupportScreen;
