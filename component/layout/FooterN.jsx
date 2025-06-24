import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Course, Home, Live, Settings } from './Icons/MyIcon';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Reusable FooterTab component
// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
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

function FooterN() {
    const [activeTab, setActiveTab] = useState('Home');
    const navigation = useNavigation();

    const handleTabPress = (tabName, screenName) => {
        setActiveTab(tabName);
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.bottomNavItem}>
                <MaterialIcons name="home" size={24} color="#4361EE" />
                <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('videoCoursesScreen')}>
                <MaterialIcons name="menu-book" size={24} color="#999" />
                <Text style={styles.bottomNavText}>Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem}>
                <MaterialIcons name="assignment" size={24} color="#999" />
                <Text style={styles.bottomNavText}>Tests</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('Progress')}>
                <MaterialIcons name="analytics" size={24} color="#999" />
                <Text style={styles.bottomNavText}>Progress</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomNavItem}>
                <MaterialIcons name="person" size={24} color="#999" />
                <Text style={styles.bottomNavText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

export default FooterN;

const styles = StyleSheet.create({
bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomNavItem: {
        alignItems: 'center',
        paddingVertical: 4,
    },
    bottomNavText: {
        fontSize: isTablet ? 12 : 10,
        color: '#999',
        marginTop: 2,
    },
    bottomNavTextActive: {
        color: '#4361EE',
        fontWeight: '600',
    },
});
