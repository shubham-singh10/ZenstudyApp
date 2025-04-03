import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    SafeAreaView,
    Platform,
    Switch,
    Modal,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');
const isTablet = width > 768;

const ProfileScreenNew = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [downloadOverWifi, setDownloadOverWifi] = useState(true);
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedCity, setEditedCity] = useState('');
    const [editedState, setEditedState] = useState('');
    const [editedCountry, setEditedCountry] = useState('');
    const [editedPincode, setEditedPincode] = useState('');
    const [imagePickerVisible, setImagePickerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Simulate fetching user data
    useEffect(() => {
        // In a real app, this would be an API call
        setTimeout(() => {
            setUserData({
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                phone: '+91 9876543210',
                profilePic: 'https://via.placeholder.com/150/4361EE/FFFFFF?text=Rahul',
                address: '42 Harmony Apartments, Sector 15',
                city: 'New Delhi',
                state: 'Delhi',
                country: 'India',
                pincode: '110001',
                joinDate: 'May 2023',
                subscription: 'Premium Plan',
                subscriptionValidTill: 'June 30, 2025',
                progress: 42,
                streak: 15,
                points: 2450,
                rank: 128,
                achievements: [
                    { id: 1, title: 'Fast Learner', icon: 'speed', count: 1 },
                    { id: 2, title: 'Perfect Score', icon: 'grade', count: 3 },
                    { id: 3, title: 'Consistent Learner', icon: 'calendar-today', count: 1 },
                    { id: 4, title: 'Quiz Master', icon: 'emoji-events', count: 2 },
                ],
            });
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (userData) {
            setEditedName(userData.name);
            setEditedEmail(userData.email);
            setEditedPhone(userData.phone);
        }
    }, [userData]);

    const handleSaveProfile = () => {
        // In a real app, this would be an API call to update the user profile
        setUserData({
            ...userData,
            name: editedName,
            email: editedEmail,
            phone: editedPhone,
            profilePic: selectedImage || userData.profilePic,
        });
        setEditProfileModalVisible(false);
    };

    const handleSelectImage = () => {
        // In a real app, this would use a library like react-native-image-picker
        // For this demo, we'll simulate image selection with a modal
        setImagePickerVisible(true);
    };

    const handleImageSelected = (imageUri) => {
        setSelectedImage(imageUri);
        setImagePickerVisible(false);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <MaterialIcons name="person" size={48} color="#4361EE" />
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => setEditProfileModalVisible(true)}>
                    <MaterialIcons name="edit" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <TouchableOpacity onPress={() => setEditProfileModalVisible(true)}>
                            <Image source={{ uri: userData?.profilePic }} style={styles.profilePic} />
                            <View style={styles.editProfilePicOverlay}>
                                <MaterialIcons name="camera-alt" size={isTablet ? 24 : 20} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{userData?.name}</Text>
                            <Text style={styles.profileEmail}>{userData?.email}</Text>
                            <Text style={styles.profilePhone}>{userData?.phone}</Text>
                            <Text style={styles.profilePhone}>{userData?.address}</Text>
                            <Text style={styles.profilePhone}>
                                {userData?.city}, {userData?.state}, {userData?.country} - {userData?.pincode}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.subscriptionContainer}>
                        <View style={styles.subscriptionBadge}>
                            <MaterialIcons name="star" size={16} color="#FFD700" />
                            <Text style={styles.subscriptionText}>{userData?.subscription}</Text>
                        </View>
                        <Text style={styles.subscriptionValidity}>Valid till: {userData?.subscriptionValidTill}</Text>
                    </View>

                    <View style={styles.profileStats}>
                        <View style={styles.profileStatItem}>
                            <Text style={styles.profileStatValue}>{userData?.progress}%</Text>
                            <Text style={styles.profileStatLabel}>Progress</Text>
                        </View>
                        <View style={styles.profileStatDivider} />
                        <View style={styles.profileStatItem}>
                            <Text style={styles.profileStatValue}>{userData?.streak}</Text>
                            <Text style={styles.profileStatLabel}>Day Streak</Text>
                        </View>
                        <View style={styles.profileStatDivider} />
                        <View style={styles.profileStatItem}>
                            <Text style={styles.profileStatValue}>{userData?.points}</Text>
                            <Text style={styles.profileStatLabel}>Points</Text>
                        </View>
                    </View>
                </View>

                {/* Achievements Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Achievements</Text>
                    <View style={styles.achievementsContainer}>
                        {userData?.achievements.map((achievement) => (
                            <View key={achievement.id} style={styles.achievementItem}>
                                <View style={styles.achievementIconContainer}>
                                    <MaterialIcons name={achievement.icon} size={24} color="#4361EE" />
                                </View>
                                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                                {achievement.count > 1 && (
                                    <View style={styles.achievementCountBadge}>
                                        <Text style={styles.achievementCountText}>x{achievement.count}</Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Account Settings */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>

                    <TouchableOpacity style={styles.settingsItem} onPress={() => setEditProfileModalVisible(true)}>
                        <View style={styles.settingsItemLeft}>
                            <MaterialIcons name="person" size={20} color="#4361EE" style={styles.settingsIcon} />
                            <Text style={styles.settingsText}>Edit Profile</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsItem}>
                        <View style={styles.settingsItemLeft}>
                            <MaterialIcons name="lock" size={20} color="#4361EE" style={styles.settingsIcon} />
                            <Text style={styles.settingsText}>Change Password</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsItem}>
                        <View style={styles.settingsItemLeft}>
                            <MaterialIcons name="payment" size={20} color="#4361EE" style={styles.settingsIcon} />
                            <Text style={styles.settingsText}>Payment Methods</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsItem}>
                        <View style={styles.settingsItemLeft}>
                            <MaterialIcons name="receipt" size={20} color="#4361EE" style={styles.settingsIcon} />
                            <Text style={styles.settingsText}>Purchase History</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>
                </View>

                {/* App Settings */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>App Settings</Text>

                    <View style={styles.settingsCard}>
                        <View style={styles.settingsToggleItem}>
                            <View style={styles.settingsItemLeft}>
                                <MaterialIcons name="notifications" size={20} color="#4361EE" style={styles.settingsIcon} />
                                <Text style={styles.settingsText}>Notifications</Text>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: '#ccc', true: '#4361EE' }}
                                thumbColor="#fff"
                            />
                        </View>

                        <View style={styles.settingsToggleItem}>
                            <View style={styles.settingsItemLeft}>
                                <MaterialIcons name="dark-mode" size={20} color="#4361EE" style={styles.settingsIcon} />
                                <Text style={styles.settingsText}>Dark Mode</Text>
                            </View>
                            <Switch
                                value={darkModeEnabled}
                                onValueChange={setDarkModeEnabled}
                                trackColor={{ false: '#ccc', true: '#4361EE' }}
                                thumbColor="#fff"
                            />
                        </View>

                        <View style={styles.settingsToggleItem}>
                            <View style={styles.settingsItemLeft}>
                                <MaterialIcons name="wifi" size={20} color="#4361EE" style={styles.settingsIcon} />
                                <Text style={styles.settingsText}>Download over Wi-Fi only</Text>
                            </View>
                            <Switch
                                value={downloadOverWifi}
                                onValueChange={setDownloadOverWifi}
                                trackColor={{ false: '#ccc', true: '#4361EE' }}
                                thumbColor="#fff"
                            />
                        </View>

                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemLeft}>
                                <MaterialIcons name="storage" size={20} color="#4361EE" style={styles.settingsIcon} />
                                <Text style={styles.settingsText}>Clear Cache</Text>
                            </View>
                            <Text style={styles.cacheSize}>45.2 MB</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Support & Help */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Support & Help</Text>

                    <View style={styles.settingsCard}>
                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemLeft}>
                                <MaterialIcons name="help-outline" size={20} color="#4361EE" style={styles.settingsIcon} />
                                <Text style={styles.settingsText}>Help Center</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemLeft}>
                                <MaterialIcons name="chat" size={20} color="#4361EE" style={styles.settingsIcon} />
                                <Text style={styles.settingsText}>Contact Support</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemLeft}>
                                <MaterialIcons name="feedback" size={20} color="#4361EE" style={styles.settingsIcon} />
                                <Text style={styles.settingsText}>Send Feedback</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemLeft}>
                                <MaterialIcons name="info-outline" size={20} color="#4361EE" style={styles.settingsIcon} />
                                <Text style={styles.settingsText}>About App</Text>
                            </View>
                            <Text style={styles.versionText}>v1.2.3</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Landing')}>
                    <MaterialIcons name="logout" size={20} color="#FF6B6B" />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>

                {/* Bottom spacing */}
                <View style={styles.bottomSpacing} />
            </ScrollView>
            {/* Edit Profile Modal */}
            <Modal
                visible={editProfileModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setEditProfileModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.editProfileModalContent}>
                        <View style={styles.editProfileModalHeader}>
                            <Text style={styles.editProfileModalTitle}>Edit Profile</Text>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setEditProfileModalVisible(false)}>
                                <MaterialIcons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.editProfileModalBody}>
                            <View style={styles.profileImageEditContainer}>
                                <Image source={{ uri: selectedImage || userData?.profilePic }} style={styles.profileImageEdit} />
                                <TouchableOpacity style={styles.changePhotoButton} onPress={handleSelectImage}>
                                    <MaterialIcons name="camera-alt" size={20} color="#fff" />
                                    <Text style={styles.changePhotoText}>Change Photo</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.inputSectionTitle}>Personal Information</Text>

                            <Text style={styles.inputLabel}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                value={editedName}
                                onChangeText={setEditedName}
                                placeholder="Enter your full name"
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.inputLabel}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                value={editedEmail}
                                onChangeText={setEditedEmail}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.inputLabel}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                value={editedPhone}
                                onChangeText={setEditedPhone}
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.inputSectionTitle}>Address Information</Text>

                            <Text style={styles.inputLabel}>Address</Text>
                            <TextInput
                                style={styles.input}
                                value={editedAddress}
                                onChangeText={setEditedAddress}
                                placeholder="Enter your address"
                                placeholderTextColor="#999"
                            />

                            <View style={styles.inputRow}>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>City</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedCity}
                                        onChangeText={setEditedCity}
                                        placeholder="City"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>State</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedState}
                                        onChangeText={setEditedState}
                                        placeholder="State"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputRow}>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>Country</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedCountry}
                                        onChangeText={setEditedCountry}
                                        placeholder="Country"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>Pincode</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedPincode}
                                        onChangeText={setEditedPincode}
                                        placeholder="Pincode"
                                        keyboardType="number-pad"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Image Picker Modal */}
            <Modal
                visible={imagePickerVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setImagePickerVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.imagePickerModalContent}>
                        <View style={styles.imagePickerModalHeader}>
                            <Text style={styles.imagePickerModalTitle}>Select Profile Picture</Text>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setImagePickerVisible(false)}>
                                <MaterialIcons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.imagePickerModalBody}>
                            <Text style={styles.imagePickerLabel}>Sample Images</Text>
                            <View style={styles.sampleImagesContainer}>
                                {[
                                    'https://via.placeholder.com/150/4361EE/FFFFFF?text=User+1',
                                    'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=User+2',
                                    'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=User+3',
                                    'https://via.placeholder.com/150/FFD166/FFFFFF?text=User+4',
                                    'https://via.placeholder.com/150/6A0572/FFFFFF?text=User+5',
                                    'https://via.placeholder.com/150/1A535C/FFFFFF?text=User+6',
                                ].map((uri, index) => (
                                    <TouchableOpacity key={index} style={styles.sampleImageItem} onPress={() => handleImageSelected(uri)}>
                                        <Image source={{ uri }} style={styles.sampleImage} />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity style={styles.uploadButton}>
                                <MaterialIcons name="file-upload" size={20} color="#fff" />
                                <Text style={styles.uploadButtonText}>Upload from Device</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.cameraButton}>
                                <MaterialIcons name="camera-alt" size={20} color="#fff" />
                                <Text style={styles.cameraButtonText}>Take Photo</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 16,
        fontSize: isTablet ? 18 : 16,
        color: '#666',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    profileCard: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    profilePic: {
        width: isTablet ? 100 : 80,
        height: isTablet ? 100 : 80,
        borderRadius: isTablet ? 50 : 40,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginBottom: 4,
    },
    profilePhone: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
    },
    subscriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    subscriptionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
    },
    subscriptionText: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        color: '#FF8C00',
        marginLeft: 4,
    },
    subscriptionValidity: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    profileStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    profileStatItem: {
        alignItems: 'center',
    },
    profileStatValue: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    profileStatLabel: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    profileStatDivider: {
        width: 1,
        height: '80%',
        backgroundColor: '#eee',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 16,
        marginBottom: 12,
    },
    achievementsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
    },
    achievementItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        margin: 4,
        width: isTablet ? width / 4 - 24 : width / 2 - 24,
        alignItems: 'center',
        position: 'relative',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    achievementIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E6F0FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    achievementTitle: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    achievementCountBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#4361EE',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    achievementCountText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    settingsCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingsToggleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingsItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsIcon: {
        marginRight: 12,
    },
    settingsText: {
        fontSize: isTablet ? 16 : 14,
        color: '#333',
    },
    cacheSize: {
        fontSize: isTablet ? 14 : 12,
        color: '#999',
    },
    versionText: {
        fontSize: isTablet ? 14 : 12,
        color: '#999',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 24,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF6B6B',
    },
    logoutButtonText: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        color: '#FF6B6B',
        marginLeft: 8,
    },
    bottomSpacing: {
        height: 40,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editProfileModalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: isTablet ? '70%' : '90%',
        maxHeight: '80%',
    },
    editProfileModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    editProfileModalTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
    },
    modalCloseButton: {
        padding: 4,
    },
    editProfileModalBody: {
        padding: 16,
    },
    profileImageEditContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    profileImageEdit: {
        width: isTablet ? 120 : 100,
        height: isTablet ? 120 : 100,
        borderRadius: isTablet ? 60 : 50,
        marginBottom: 12,
    },
    changePhotoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4361EE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    changePhotoText: {
        color: '#fff',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '500',
        marginLeft: 4,
    },
    inputLabel: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        padding: 12,
        fontSize: isTablet ? 16 : 14,
        marginBottom: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#4361EE',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
    },
    imagePickerModalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: isTablet ? '70%' : '90%',
        maxHeight: '80%',
    },
    imagePickerModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    imagePickerModalTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
    },
    imagePickerModalBody: {
        padding: 16,
    },
    imagePickerLabel: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    sampleImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    sampleImageItem: {
        width: isTablet ? '30%' : '30%',
        marginBottom: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },
    sampleImage: {
        width: '100%',
        height: isTablet ? 100 : 80,
        borderRadius: 8,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4361EE',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#666',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 24,
    },
    cameraButtonText: {
        color: '#fff',
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    editProfilePicOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(67, 97, 238, 0.8)',
        width: isTablet ? 32 : 28,
        height: isTablet ? 32 : 28,
        borderRadius: isTablet ? 16 : 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
});

export default ProfileScreenNew;
