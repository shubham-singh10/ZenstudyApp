import React from 'react';
import { View, Text } from 'react-native';
import styles from './Style';
import { Help } from './Icons/MyIcon';

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logoh1}>ZenStudy.</Text>
          <Text style={styles.logoh2}>Make Education Imaginative</Text>
        </View>
        <Text style={styles.helpText}><Help fill='#054bb4'/> Help</Text>
      </View>
    </View>
  );
}

export default Header;
