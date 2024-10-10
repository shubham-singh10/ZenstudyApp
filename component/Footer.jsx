import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import { Course, Home, Live, Settings } from './Icons/MyIcon';
import { useNavigation } from '@react-navigation/native';

// Reusable FooterTab component
const FooterTab = ({ tabName, screenName, IconComponent, activeTab, handleTabPress }) => {
  const isActive = activeTab === tabName;

  return (
    <TouchableOpacity
      style={[styles.fnavbox, isActive ? styles.activeTab : null]}
      onPress={() => handleTabPress(tabName, screenName)}
    >
      <Text style={[styles.ficons, isActive ? styles.activeIcon : null]}>
        <IconComponent fill={isActive ? '#03f0fc' : 'white'} />
      </Text>
      <Text style={[styles.ficonText, isActive ? styles.activeText : null]}>
        {tabName}
      </Text>
    </TouchableOpacity>
  );
};

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
        <FooterTab
          tabName="Home"
          screenName="HomeScreen"
          IconComponent={Home}
          activeTab={activeTab}
          handleTabPress={handleTabPress}
        />
        <FooterTab
          tabName="Mycourse"
          screenName="myCourseScreen"
          IconComponent={Course}
          activeTab={activeTab}
          handleTabPress={handleTabPress}
        />
        <FooterTab
          tabName="LiveClass"
          screenName="liveScreen"
          IconComponent={Live}
          activeTab={activeTab}
          handleTabPress={handleTabPress}
        />
        <FooterTab
          tabName="Settings"
          screenName="profileScreen"
          IconComponent={Settings}
          activeTab={activeTab}
          handleTabPress={handleTabPress}
        />
      </View>
    </View>
  );
}

export default Footer;
