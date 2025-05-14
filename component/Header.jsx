import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import { Help } from './Icons/MyIcon';
import { useNavigation } from '@react-navigation/native';

function Header() {
  const navigation = useNavigation();
  return (
      <View style={styles.header}>
        <View style={styles.logosection}>
          <Text style={styles.logoh1}>ZenStudy.</Text>
          <Text style={styles.logoh2}>Make Education Imaginative</Text>
        </View>
        <View style={{flexDirection:'row', gap:1, alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={()=> navigation.navigate('supportScreen')}><Text><Help fill='#054bb4'/></Text></TouchableOpacity>
        <Text style={styles.helpText}> Help</Text>
        </View>
      </View>
    
  );
}

export default Header;
