import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import formStyles from '../Login/formStyles';
import { BackArrow, Location, Profile } from '../Icons/MyIcon';
import axios from 'axios';
import { UserData } from '../userData/UserData';
import Loader from '../Loader';

const EditScreen = ({ navigation }) => {
  // State variables for form inputs
  const [formData, setformData] = useState({
    name: '',
    email: '',
    phone: '',
    Address: '',
    City: '',
    State: '',
    Country: '',
    Pincode: '',
    avatar: '',
  });
  const [Dloading, setDLoading] = useState(true);

  const onInputChange = (value, field) => {
    setformData({ ...formData, [field]: value });

    // if (errors[field]) {
    //   setErrors({ ...errors, [field]: '' });
    // }

    // if (field === 'cPassword' || field === 'password') {
    //   if (formData.password !== value && field === 'cPassword') {
    //     setPasswordError('Passwords do not match');
    //   } else if (formData.cPassword !== value && field === 'password') {
    //     setPasswordError('Passwords do not match');
    //   } else {
    //     setPasswordError('');
    //   }
    // }
  };
  const [errorMessage, setErrorMessage] = useState('');

  const { usersData } = UserData();

  // Function to handle form submission
  const handleContinue = () => {
    setErrorMessage('');
    console.log('Form submitted with:', formData);
  };

  //Get User Data API
  const getUserData = async (userId) => {
    setDLoading(true); // Start loading
    try {
      // Make API call using axios
      const response = await axios.get(
        `${process.env.REACT_APP_API}zenstudy/api/user/userdetail/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract data directly, no need for response.json()
      const resData = response.data;

      // Construct the image URL
      const imageUrl = `${process.env.REACT_APP_API}zenstudy/api/image/getimage/${resData.userdetail.avatar}`;

      const updatedUserDetail = {
        ...resData.userdetail,
        imageUrl,
      };

      // Update state with the fetched user data
      setformData(updatedUserDetail || {});

    } catch (error) {
      // Catching and displaying any error that occurred during the API call
      // Alert.alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      // Always stop loading regardless of success or error
      setDLoading(false);
    }
  };

  useEffect(() => {
    getUserData(usersData?._id);
  }, [usersData?._id]);

  if (Dloading) {
    return <Loader />;
  }

  return (
    <ScrollView
      style={formStyles.containerBack}
      contentContainerStyle={formStyles.containerFlex}>
      <View style={[formStyles.container, formStyles.padding]}>
        {/* Sign Up Section */}
        <View style={formStyles.section2}>
          <View style={formStyles.TopHead}>
            <TouchableOpacity onPress={() => navigation.navigate('profileScreen')}>
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
              value={formData.name}
              onChangeText={(text) => onInputChange(text, 'name')}
            />
          </View>

          {/* E-mail field */}
          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Profile fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your Email"
              value={formData.email}
              onChangeText={(text) => onInputChange(text, 'email')}
            />
          </View>

          {/* Phone No */}

          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Profile fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your Phone no"
              value={formData.phone}
              readOnly
              onChangeText={(text) => onInputChange(text, 'phone')}
            />
          </View>

          {/* Address */}

          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Location fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your Address"
              value={formData.Address}
              onChangeText={(text) => onInputChange(text, 'Address')}
            />
          </View>

          {/* State */}

          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Location fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your State"
              value={formData.State}
              onChangeText={(text) => onInputChange(text, 'State')}
            />
          </View>

          {/* City */}

          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Location fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your City"
              value={formData.City}
              onChangeText={(text) => onInputChange(text, 'City')}
            />
          </View>

          {/* Country */}

          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Location fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your Country"
              value={formData.Country}
              onChangeText={(text) => onInputChange(text, 'Country')}
            />
          </View>

          {/* Pincode */}

          <View style={formStyles.inputContainer}>
            <View style={formStyles.inputlogo}>
              <Text style={formStyles.inputlogoContent}>
                <Profile fill="#fff" />
              </Text>
            </View>
            <TextInput
              style={formStyles.input}
              placeholder="Update Your Pincode"
              value={formData.Pincode}
              onChangeText={(text) => onInputChange(text, 'Pincode')}
            />
          </View>


          {/* Error Message for Password Mismatch */}
          {errorMessage ? (
            <Text style={formStyles.errorText}>{errorMessage}</Text>
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
