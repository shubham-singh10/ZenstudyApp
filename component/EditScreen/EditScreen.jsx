import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import formStyles from '../Login/formStyles';
import {BackArrow, Image, Key, Location, Profile} from '../Icons/MyIcon';

const EditScreen = ({navigation}) => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleContinue = () => {
    setErrorMessage('');
    console.log('Form submitted with:', {name, password, image, location});
  };

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={[formStyles.container, {paddingHorizontal: 30}]}>
        {/* Sign Up Section */}
        <View style={formStyles.section2}>
          <View style={formStyles.TopHead}>
            <TouchableOpacity onPress={()=>navigation.navigate('profileScreen')}>
              <Text style={formStyles.backbtn}>
                {' '}
                <BackArrow fill="white" />
              </Text>
            </TouchableOpacity>
            <Text style={formStyles.loginText}> Edit Profile</Text>
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
              placeholder="Update Your Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Password Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Key fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Profile Image Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Image fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your Profile Image URL"
              value={image}
              onChangeText={setImage}
            />
          </View>

          {/* Location Input */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Location fill="white" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your Location"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Error Message for Password Mismatch */}
          {errorMessage ? (
            <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text>
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

export default EditScreen;
