import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import formStyles from '../Login/formStyles';
import { BackArrow, Location, Profile, Email } from '../Icons/MyIcon';
import { UserData } from '../userData/UserData';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileDetails, updateProfileDetails } from './store';
import Toast from 'react-native-toast-message';

const EditScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // State variables for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    Address: '',
    City: '',
    State: '',
    Country: '',
    Pincode: '',  // Make sure it's a string
    avatar: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const { usersData } = UserData();
  const { profileData, loading, error } = useSelector(state => state.ProfileData);

  // Log fetched profile data to check if Pincode exists
  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  // Fetch profile details when component mounts
  useEffect(() => {
    if (usersData?._id) {
      dispatch(fetchProfileDetails(usersData._id));
    }
  }, [dispatch, usersData?._id]);

  // Function to handle input changes
  const onInputChange = (value, field) => {
    if (field === 'Pincode') {
      value = value.replace(/\D/g, '');
    }
    setFormData({ ...formData, [field]: value });
  };

  // Function to handle form submission
  const handleContinue = () => {
    setErrorMessage('');
    const userUpdate = {
      ...formData,
      avatar: profileData.avatar,
    };
    dispatch(updateProfileDetails({ userId: profileData._id, userUpdate: userUpdate }))
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Profile Updated!',
          text2: 'Your profile has been updated successfully. Changes are now reflected!',
          visibilityTime: 5000,
          position: 'top',
        });
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: err || 'Something went wrong while updating your profile. Please try again later.',
          visibilityTime: 5000,
          position: 'top',
        });
      });
  };

  // If loading, show loader
  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      style={formStyles.containerBack}
      contentContainerStyle={formStyles.containerFlex}>
      <View style={[formStyles.container, formStyles.padding]}>
        {/* Header Section */}
        <View style={formStyles.section2}>
          <View style={formStyles.TopHead}>
            <TouchableOpacity onPress={() => navigation.navigate('profileScreen')}>
              <Text style={formStyles.backbtn}>
                <BackArrow fill="white" />
              </Text>
            </TouchableOpacity>
            <Text style={formStyles.loginText}>Edit Profile</Text>
          </View>

          {/* Form Fields */}
          {['name', 'email', 'phone', 'Address', 'State', 'City', 'Country', 'Pincode'].map((field, index) => (
            <View key={index} style={formStyles.inputContainer}>
              <View style={formStyles.inputlogo}>
                <Text style={formStyles.inputlogoContent} placeholderTextColor="#888">
                  {field === 'Address' || field === 'State' || field === 'City' || field === 'Country' ? (
                    <Location fill="#fff" />
                  ) : field === 'email' ? (
                    <Email fill="#fff" />
                  ) : (
                    <Profile fill="#fff" />
                  )}
                </Text>
              </View>
              <TextInput
                style={formStyles.input}
                placeholder={`Update Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                placeholderTextColor="#888"
                value={formData[field] != null ? formData[field].toString() : ''}

                onChangeText={(text) => onInputChange(text, field)}
                editable={field !== 'phone'} // Phone field is read-only
              />
            </View>
          ))}

          {/* Error Message for Form Submission */}
          {errorMessage ? <Text style={formStyles.errorText}>{errorMessage}</Text> : null}
          {error ? <Text style={formStyles.errorText}>{error}</Text> : null}

          {/* Continue Button */}
          <TouchableOpacity
            style={[formStyles.button, loading && formStyles.opacityView]}
            onPress={handleContinue}
            disabled={loading}
          >
            <Text style={formStyles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditScreen;
