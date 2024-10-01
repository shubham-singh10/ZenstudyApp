import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import { Course, Home, Live, Settings } from './Icons/MyIcon';
import { useNavigation } from '@react-navigation/native';

function Footer() {
  const [activeTab, setActiveTab] = useState('Home');
  const navigation = useNavigation();
  const handleTabPress = (tabName, screenName) => {
    setActiveTab(tabName);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.footcontainer}>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.fnavbox, 
            activeTab === 'Home' ? styles.activeTab : null
          ]}
          onPress={() => handleTabPress('Home', 'homeScreen')}
        >
          <Text style={[
            styles.ficons, 
            activeTab === 'Home' ? styles.activeIcon : null
          ]}>
            <Home fill={activeTab === 'Home' ? "gray" : "white"} /> {/* Gold when active */}
          </Text>
          <Text style={[
            styles.ficonText, 
            activeTab === 'Home' ? styles.activeText : null
          ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.fnavbox, 
            activeTab === 'Mycourse' ? styles.activeTab : null
          ]}
          onPress={() => handleTabPress('Mycourse', 'myCourseScreen')}
        >
          <Text style={[
            styles.ficons, 
            activeTab === 'Mycourse' ? styles.activeIcon : null
          ]}>
            <Course fill={activeTab === 'Mycourse' ? "gray" : "white"} /> {/* Gold when active */}
          </Text>
          <Text style={[
            styles.ficonText, 
            activeTab === 'Mycourse' ? styles.activeText : null
          ]}>
            Mycourse
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.fnavbox, 
            activeTab === 'LiveClass' ? styles.activeTab : null
          ]}
          onPress={() => handleTabPress('LiveClass', 'liveScreen')}
        >
          <Text style={[
            styles.ficons, 
            activeTab === 'LiveClass' ? styles.activeIcon : null
          ]}>
            <Live fill={activeTab === 'LiveClass' ? "gray" : "white"} /> {/* Gold when active */}
          </Text>
          <Text style={[
            styles.ficonText, 
            activeTab === 'LiveClass' ? styles.activeText : null
          ]}>
            Live Class
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.fnavbox, 
            activeTab === 'Settings' ? styles.activeTab : null
          ]}
          onPress={() => handleTabPress('Settings', 'profileScreen')}
        >
          <Text style={[
            styles.ficons, 
            activeTab === 'Settings' ? styles.activeIcon : null
          ]}>
            <Settings fill={activeTab === 'Settings' ? "gray" : "white"} /> {/* Gold when active */}
          </Text>
          <Text style={[
            styles.ficonText, 
            activeTab === 'Settings' ? styles.activeText : null
          ]}>
            Settings
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default Footer;
