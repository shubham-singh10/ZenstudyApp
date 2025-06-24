import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserData } from '../userData/UserData';
import { useNavigation } from '@react-navigation/native';

const defaultImage =
    'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg';

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
function MainHeaderN() {
    const navigation = useNavigation();
    const { usersData } = UserData();

    return (

        <View style={styles.header}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.headerLeft}>
                <Text style={styles.welcomeText}>Welcome back,</Text>
                <Text style={styles.userName}>{usersData?.name}</Text>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.notificationButton}>
                    <MaterialIcons name="notifications" size={24} color="#333" />
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationBadgeText}>3</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <Image source={{ uri: usersData?.profilePic || defaultImage }} style={styles.profilePic} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MainHeaderN;


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerLeft: {
        flex: 1,
    },
    welcomeText: {
        fontSize: isTablet ? 16 : 14,
        color: '#666',
    },
    userName: {
        fontSize: isTablet ? 22 : 18,
        fontWeight: 'bold',
        color: '#333',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationButton: {
        position: 'relative',
        padding: 8,
        marginRight: 8,
    },
    notificationBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#FF6B6B',
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    profileButton: {
        padding: 2,
    },
    profilePic: {
        width: isTablet ? 40 : 36,
        height: isTablet ? 40 : 36,
        borderRadius: isTablet ? 20 : 18,
    },

});
