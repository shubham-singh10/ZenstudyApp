import React from 'react';
import {View, Text} from 'react-native';
import styles from './Style';
import { Course, Home, Live, Settings } from './Icons/MyIcon';

function Footer() {
  return (
    <View style={styles.footcontainer}>
      <View style={styles.footer}>
        <View style={styles.fnavbox}>
            <Text style={styles.ficons}><Home fill="white"/></Text>
            <Text style={styles.ficonText}>Home</Text>
        </View>

        <View style={styles.navbox}>
            <Text style={styles.ficons}><Course fill="white"/></Text>
            <Text style={styles.ficonText}>Mycourse</Text>
        </View>

        <View style={styles.fnavbox}>
            <Text style={styles.ficons}><Live fill="white"/></Text>
            <Text style={styles.ficonText}>Live Class</Text>
        </View>

        <View style={styles.fnavbox}>
            <Text style={styles.ficons}><Settings fill="white"/></Text>
            <Text style={styles.ficonText}>Settings</Text>
        </View>

      </View>
    </View>
  );
}

export default Footer;
