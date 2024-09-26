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
        <View style={{flexDirection:'row', gap:3, alignItems:'center',justifyContent:'center'}}>
        <Text><Help fill='#054bb4'/></Text>
        <Text style={styles.helpText}> Help</Text>
        </View>
      </View>
    </View>
  );
}

export default Header;
