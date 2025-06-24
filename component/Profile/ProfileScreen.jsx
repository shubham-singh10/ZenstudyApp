import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Help, Logout } from '../Icons/MyIcon';
import profileStyle from './profileStyle';
import { useNavigation } from '@react-navigation/native';
import { UserData } from '../userData/UserData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileDetails } from '../EditScreen/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../Loader';

const ProfileScreen = ({ onLogout }) => {
  const navigation = useNavigation();
  const { usersData } = UserData();
  const dispatch = useDispatch();

  const { profileData, loading } = useSelector(state => state.ProfileData);

  const [imageLoading, setImageLoading] = useState(true); // Track image loading state

  useEffect(() => {
    if (usersData?._id) {
      dispatch(fetchProfileDetails(usersData._id));
    }
  }, [dispatch, usersData?._id]);

  // Fallback image for loading or error
  const defaultImage =
    'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg';

  return (
    <ScrollView contentContainerStyle={profileStyle.scrollContainer}>
      {/* Show loader while fetching profile data */}
      {loading ? (
        <Loader />
      ) : (
        <View>
          {/* Profile Section */}
          <View style={profileStyle.profileSection}>
            <View style={profileStyle.imageWrapper}>
              <Image
                source={{
                  uri: profileData?.imageUrl || defaultImage,
                }}
                style={profileStyle.profileImage}
                onLoadEnd={() => setImageLoading(false)} // Set image loading to false once the image loads
                onError={() => setImageLoading(false)} // Ensure fallback if image fails
              />
              {imageLoading && (
                <ActivityIndicator
                  style={profileStyle.imageLoader}
                  size="small"
                  color="#054bb4"
                />
              )}
            </View>
            <View style={profileStyle.profileText}>
              <Text style={profileStyle.greeting}>
                Hi,{' '}
                <Text style={profileStyle.userName}>
                  {usersData?.name || 'Guest'}
                </Text>
              </Text>
              <Text style={profileStyle.welcomeText}>
                Welcome to ZenStudy
              </Text>

              <TouchableOpacity
                style={profileStyle.editButton}
                onPress={() => navigation.navigate('editScreen')}>
                <MaterialIcons name="edit" size={20} color="#fff" />
                <Text style={profileStyle.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Support Section */}
          <TouchableOpacity
            style={profileStyle.supportSection}
            onPress={() => navigation.navigate('supportScreen')}>
            <Text style={profileStyle.supportText}>Support</Text>
            <Help fill="#054bb4" />
          </TouchableOpacity>

          {/* Logout Section */}
          <TouchableOpacity
            style={profileStyle.logoutButton}
            onPress={() => onLogout()}>
            <Text style={profileStyle.logoutText}>Logout</Text>
            <Logout fill="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
