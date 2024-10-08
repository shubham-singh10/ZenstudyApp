import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Help, Logout } from '../Icons/MyIcon';
import profileStyle from './profileStyle';
import { useNavigation } from '@react-navigation/native';
import { UserData } from '../userData/UserData';

const ProfileScreen = ({ onLogout }) => {
  const navigation = useNavigation();
  const { usersData } = UserData();

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
              Hi, <Text style={profileStyle.userName}>{usersData?.name}</Text>
            </Text>
            <Text style={profileStyle.welcomeText}>Welcome to ZenStudy</Text>
          </View>
          <TouchableOpacity style={profileStyle.editButton} onPress={() => navigation.navigate('editScreen')}>
            <Text style={profileStyle.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={profileStyle.supportSection} onPress={() => navigation.navigate('supportScreen')}>
        <Text style={profileStyle.supportText}>Support</Text>
        <Help fill="#054bb4" />
      </TouchableOpacity>

      <TouchableOpacity style={profileStyle.logoutButton} onPress={() => onLogout()}>
        <Text style={profileStyle.logoutText}>Logout</Text>
        <Logout fill="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
