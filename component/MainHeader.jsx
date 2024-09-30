import React from 'react';
import { View, Text } from 'react-native';
import styles from './Style';
import { Bell, Search, User } from './Icons/MyIcon';

function MainHeader() {
  return (
      <View style={styles.mainHeader}>
        <View style={styles.leftContent}>
          <Text style={styles.userIcon}><User fill="white"/></Text>
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
