import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import { Search, User } from './Icons/MyIcon';
import { useNavigation } from '@react-navigation/native';
import { UserData } from './userData/UserData';

function MainHeader() {
  const navigation = useNavigation();
  const { usersData } = UserData();

  return (
    <View style={styles.mainHeader}>
      <View style={styles.leftContent}>
        <TouchableOpacity onPress={() => navigation.navigate('livecourseDetail')}>
          <Text style={styles.userIcon}><User fill="white" /></Text>
        </TouchableOpacity>
        <Text style={styles.username}>{usersData?.name}</Text>
      </View>

    {
      //   <View style={styles.rightContent}>
      //   <Text style={styles.searchIcon}><Search fill="white" /></Text>
      // </View>
    }

    </View>
  );
}

export default MainHeader;
