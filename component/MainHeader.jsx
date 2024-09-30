import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import { Bell, Search, User } from './Icons/MyIcon';
import { useNavigation } from '@react-navigation/native';

function MainHeader() {
  const navigation = useNavigation();
  return (
      <View style={styles.mainHeader}>
        <View style={styles.leftContent}>
          <TouchableOpacity onPress={() => navigation.navigate('profileScreen')}> 
              <Text style={styles.userIcon}><User fill="white"/></Text>
          </TouchableOpacity>
          <Text style={styles.username}>Username</Text>
        </View>

        <View style={styles.rightContent}>
          <Text style={styles.searchIcon}><Search fill="white"/></Text>
          <Text style={styles.bellIcon}><Bell fill="white"/></Text>
        </View>

      </View>
  );
}

export default MainHeader;
