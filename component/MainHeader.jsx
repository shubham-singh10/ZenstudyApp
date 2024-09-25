import React from 'react';
import {View, Text} from 'react-native';
import styles from './Style';

function MainHeader() {
  return (
    <View style={styles.mainHcontainer}>
      <View style={styles.mainHeader}>
        
        <View style={styles.leftContent}>
            <Text style={styles.userIcon}>icon</Text>
            <Text style={styles.username}>Username</Text>
        </View>

        <View style={styles.rightContent}>
            <Text style={styles.searchIcon}>search</Text>
            <Text style={styles.bellIcon}>bell</Text>
        </View>

      </View>
    </View>
  );
}

export default MainHeader;
