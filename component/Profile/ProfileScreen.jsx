import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Help, Logout} from '../Icons/MyIcon';
import profileStyle from './profileStyle';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={profileStyle.scrollContainer}>
      <View style={profileStyle.profileSection}>
        <Image
          source={{
            uri: 'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg',
          }} // Replace with actual image URL
          style={profileStyle.profileImage}
        />
        <View style={profileStyle.profileText}>
          <View>
            <Text style={profileStyle.greeting}>
              Hi, <Text style={profileStyle.userName}>User Name</Text>
            </Text>
            <Text style={profileStyle.welcomeText}>Welcome to ZenStudy</Text>
          </View>
          <TouchableOpacity style={profileStyle.editButton}>
            <Text style={profileStyle.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={profileStyle.supportSection}>
        <Text style={profileStyle.supportText}>Support</Text>
        <Help fill="#054bb4" />
      </View>

      <TouchableOpacity style={profileStyle.logoutButton}>
        <Text style={profileStyle.logoutText}>Logout</Text>
        <Logout fill="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;