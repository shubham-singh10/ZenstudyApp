import React from 'react';
import {View, Text} from 'react-native';
import styles from './Style';

function Footer() {
  return (
    <View style={styles.footcontainer}>
      <View style={styles.footer}>
        
        <View style={styles.fnavbox}>
            <Text style={styles.ficons}>icon</Text>
            <Text style={styles.ficonText}>Home</Text>
        </View>

        <View style={styles.navbox}>
            <Text style={styles.ficons}>search</Text>
            <Text style={styles.ficonText}>Mycourse</Text>
        </View>

        <View style={styles.fnavbox}>
            <Text style={styles.ficons}>icon</Text>
            <Text style={styles.ficonText}>Live Class</Text>
        </View>

        <View style={styles.fnavbox}>
            <Text style={styles.ficons}>search</Text>
            <Text style={styles.ficonText}>Settings</Text>
        </View>

      </View>
    </View>
  );
}

export default Footer;
