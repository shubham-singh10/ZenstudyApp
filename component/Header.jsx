import React from 'react'
import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';

function Header() {
  return (
    <View style={styles.header}>
          <View>
          <Text style={styles.logoh1}>ZenStudy.</Text>
          <Text style={styles.logoh2}>Make Education Imaginative</Text>
          </View>
          <Text style={styles.helpText}>Help</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor:'white',
        width:'100%',
        paddingHorizontal:15,
        paddingVertical:15,
        top:0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      logoh1: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
      },
      logoh2:{
        fontSize:10,
        color:'#054BB4',
      },
      helpText: {
        fontSize: 16,
        color: '#007BFF',
      },
})

export default Header