import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import { Course, Home, Live, Settings } from './Icons/MyIcon';

function Footer() {
  const [activeTab, setActiveTab] = useState('Home'); // Initial active tab is 'Home'

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.footcontainer}>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.fnavbox, 
            activeTab === 'Home' ? styles.activeTab : null
          ]}
          onPress={() => handleTabPress('Home')}
        >
          <Text style={[
            styles.ficons, 
            activeTab === 'Home' ? styles.activeIcon : null
          ]}>
            <Home fill={activeTab === 'Home' ? "#FFD700" : "white"} /> {/* Gold when active */}
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
          onPress={() => handleTabPress('Mycourse')}
        >
          <Text style={[
            styles.ficons, 
            activeTab === 'Mycourse' ? styles.activeIcon : null
          ]}>
            <Course fill={activeTab === 'Mycourse' ? "#FFD700" : "white"} /> {/* Gold when active */}
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
          onPress={() => handleTabPress('LiveClass')}
        >
          <Text style={[
            styles.ficons, 
            activeTab === 'LiveClass' ? styles.activeIcon : null
          ]}>
            <Live fill={activeTab === 'LiveClass' ? "#FFD700" : "white"} /> {/* Gold when active */}
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
          onPress={() => handleTabPress('Settings')}
        >
          <Text style={[
            styles.ficons, 
            activeTab === 'Settings' ? styles.activeIcon : null
          ]}>
            <Settings fill={activeTab === 'Settings' ? "#FFD700" : "white"} /> {/* Gold when active */}
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
