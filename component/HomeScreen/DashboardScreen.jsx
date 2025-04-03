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
    FlatList,
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulate fetching user data
    useEffect(() => {
        // In a real app, this would be an API call
        setTimeout(() => {
            setUserData({
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                profilePic: 'https://via.placeholder.com/150',
                progress: 42,
                streak: 15,
                points: 2450,
                rank: 128,
                lastActive: 'Today',
            });

            setEnrolledCourses([
                {
                    id: '1',
                    title: 'Complete UPSC Prelims 2025',
                    instructor: 'Dr. Rajesh Kumar',
                    thumbnail: 'https://via.placeholder.com/600x400',
                    progress: 65,
                    nextLesson: 'Indian Polity: Constitutional Framework',
                    lastAccessed: '2 hours ago',
                },
                {
                    id: '2',
                    title: 'Indian Economy for UPSC',
                    instructor: 'Prof. Meera Iyer',
                    thumbnail: 'https://via.placeholder.com/600x400',
                    progress: 30,
                    nextLesson: 'Banking System and Monetary Policy',
                    lastAccessed: 'Yesterday',
                },
                {
                    id: '3',
                    title: 'Geography & Environment',
                    instructor: 'Dr. Vikram Singh',
                    thumbnail: 'https://via.placeholder.com/600x400',
                    progress: 48,
                    nextLesson: 'Climate and Weather Systems',
                    lastAccessed: '3 days ago',
                },
            ]);

            setRecommendedCourses([
                {
                    id: '4',
                    title: 'Ethics, Integrity & Aptitude',
                    instructor: 'Dr. Sanjay Gupta',
                    thumbnail: 'https://via.placeholder.com/600x400',
                    rating: 4.8,
                    students: 9200,
                    price: '₹3,499',
                    discountPrice: '₹2,299',
                },
                {
                    id: '5',
                    title: 'International Relations',
                    instructor: 'Prof. Anand Sharma',
                    thumbnail: 'https://via.placeholder.com/600x400',
                    rating: 4.7,
                    students: 7500,
                    price: '₹2,999',
                    discountPrice: '₹1,999',
                },
            ]);

            setUpcomingEvents([
                {
                    id: '1',
                    title: 'Mock Test: UPSC Prelims Paper I',
                    date: 'June 15, 2025',
                    time: '10:00 AM',
                    type: 'test',
                },
                {
                    id: '2',
                    title: 'Live Session: Current Affairs Analysis',
                    date: 'June 10, 2025',
                    time: '6:00 PM',
                    type: 'live',
                },
                {
                    id: '3',
                    title: 'Assignment Deadline: Indian Economy',
                    date: 'June 12, 2025',
                    time: '11:59 PM',
                    type: 'assignment',
                },
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    const renderEnrolledCourseItem = ({ item }) => (
        <TouchableOpacity
            style={styles.enrolledCourseCard}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.enrolledCourseThumbnail} resizeMode="cover" />
            <View style={styles.enrolledCourseContent}>
                <Text style={styles.enrolledCourseTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.enrolledCourseInstructor}>{item.instructor}</Text>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${item.progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{item.progress}% completed</Text>
                </View>

                <View style={styles.nextLessonContainer}>
                    <MaterialIcons name="play-circle-outline" size={16} color="#4361EE" />
                    <Text style={styles.nextLessonText} numberOfLines={1}>
                        Continue: {item.nextLesson}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderRecommendedCourseItem = ({ item }) => (
        <TouchableOpacity
            style={styles.recommendedCourseCard}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.recommendedCourseThumbnail} resizeMode="cover" />
            <View style={styles.recommendedCourseContent}>
                <Text style={styles.recommendedCourseTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.recommendedCourseInstructor}>{item.instructor}</Text>

                <View style={styles.recommendedCourseStats}>
                    <Text style={styles.recommendedCourseRating}>
                        <MaterialIcons name="star" size={14} color="#FFD700" /> {item.rating}
                    </Text>
                    <Text style={styles.recommendedCourseStudents}>
                        <MaterialIcons name="people" size={14} color="#666" /> {item.students.toLocaleString()}
                    </Text>
                </View>

                <View style={styles.recommendedCoursePricing}>
                    <Text style={styles.recommendedCourseDiscountPrice}>{item.discountPrice}</Text>
                    <Text style={styles.recommendedCourseOriginalPrice}>{item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderEventItem = ({ item }) => {
        let iconName = 'event';
        let iconColor = '#4361EE';

        if (item.type === 'test') {
            iconName = 'assignment';
            iconColor = '#FF6B6B';
        } else if (item.type === 'live') {
            iconName = 'videocam';
            iconColor = '#4ECDC4';
        } else if (item.type === 'assignment') {
            iconName = 'description';
            iconColor = '#FFD166';
        }

        return (
            <TouchableOpacity style={styles.eventCard}>
                <View style={[styles.eventIconContainer, { backgroundColor: `${iconColor}20` }]}>
                    <MaterialIcons name={iconName} size={24} color={iconColor} />
                </View>
                <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <View style={styles.eventTimeContainer}>
                        <MaterialIcons name="access-time" size={14} color="#666" />
                        <Text style={styles.eventTimeText}>
                            {item.date} • {item.time}
                        </Text>
                    </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <MaterialIcons name="school" size={48} color="#4361EE" />
                <Text style={styles.loadingText}>Loading your dashboard...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.userName}>{userData?.name}</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.notificationButton}>
                        <MaterialIcons name="notifications" size={24} color="#333" />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                        <Image source={{ uri: userData?.profilePic }} style={styles.profilePic} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsCard}>
                        <View style={[styles.statsIconContainer, { backgroundColor: '#E6F0FF' }]}>
                            <MaterialIcons name="trending-up" size={20} color="#4361EE" />
                        </View>
                        <View>
                            <Text style={styles.statsValue}>{userData?.progress}%</Text>
                            <Text style={styles.statsLabel}>Overall Progress</Text>
                        </View>
                    </View>

                    <View style={styles.statsCard}>
                        <View style={[styles.statsIconContainer, { backgroundColor: '#FFF2E6' }]}>
                            <MaterialIcons name="local-fire-department" size={20} color="#FF8C00" />
                        </View>
                        <View>
                            <Text style={styles.statsValue}>{userData?.streak} days</Text>
                            <Text style={styles.statsLabel}>Study Streak</Text>
                        </View>
                    </View>

                    <View style={styles.statsCard}>
                        <View style={[styles.statsIconContainer, { backgroundColor: '#E6FFE6' }]}>
                            <MaterialIcons name="emoji-events" size={20} color="#008000" />
                        </View>
                        <View>
                            <Text style={styles.statsValue}>{userData?.points}</Text>
                            <Text style={styles.statsLabel}>Points Earned</Text>
                        </View>
                    </View>
                </View>

                {/* Continue Learning Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Continue Learning</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>See All</Text>
                            <MaterialIcons name="chevron-right" size={16} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={enrolledCourses}
                        renderItem={renderEnrolledCourseItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.enrolledCoursesContainer}
                    />
                </View>

                {/* Study Plan */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Today's Study Plan</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>View Plan</Text>
                            <MaterialIcons name="chevron-right" size={16} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.studyPlanCard}>
                        <LinearGradient
                            colors={['#4568DC', '#B06AB3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.studyPlanGradient}
                        >
                            <View style={styles.studyPlanContent}>
                                <View style={styles.studyPlanLeft}>
                                    <Text style={styles.studyPlanTitle}>Your personalized study plan is ready!</Text>
                                    <Text style={styles.studyPlanDescription}>
                                        4 hours of focused study with breaks to maximize your productivity
                                    </Text>
                                    <TouchableOpacity style={styles.studyPlanButton}>
                                        <Text style={styles.studyPlanButtonText}>Start Now</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.studyPlanRight}>
                                    <MaterialIcons name="schedule" size={isTablet ? 80 : 60} color="rgba(255,255,255,0.3)" />
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Upcoming Events */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Upcoming Events</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>Calendar</Text>
                            <MaterialIcons name="chevron-right" size={16} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={upcomingEvents}
                        renderItem={renderEventItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={styles.eventsContainer}
                    />
                </View>

                {/* Recommended Courses */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recommended For You</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>See All</Text>
                            <MaterialIcons name="chevron-right" size={16} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={recommendedCourses}
                        renderItem={renderRecommendedCourseItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.recommendedCoursesContainer}
                    />
                </View>

                {/* Performance Insights */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Performance Insights</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>Details</Text>
                            <MaterialIcons name="chevron-right" size={16} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.performanceCard}>
                        <View style={styles.performanceHeader}>
                            <Text style={styles.performanceTitle}>Mock Test Performance</Text>
                            <Text style={styles.performanceSubtitle}>Last 5 tests</Text>
                        </View>

                        <View style={styles.performanceStats}>
                            <View style={styles.performanceStatItem}>
                                <View style={styles.performanceStatCircle}>
                                    <Text style={styles.performanceStatValue}>72%</Text>
                                </View>
                                <Text style={styles.performanceStatLabel}>Average Score</Text>
                            </View>

                            <View style={styles.performanceStatItem}>
                                <View style={[styles.performanceStatCircle, styles.performanceStatCircleSecondary]}>
                                    <Text style={[styles.performanceStatValue, styles.performanceStatValueSecondary]}>128</Text>
                                </View>
                                <Text style={styles.performanceStatLabel}>Your Rank</Text>
                            </View>

                            <View style={styles.performanceStatItem}>
                                <View style={[styles.performanceStatCircle, styles.performanceStatCircleTertiary]}>
                                    <Text style={[styles.performanceStatValue, styles.performanceStatValueTertiary]}>+12%</Text>
                                </View>
                                <Text style={styles.performanceStatLabel}>Improvement</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.performanceButton}>
                            <Text style={styles.performanceButtonText}>View Detailed Analysis</Text>
                            <MaterialIcons name="analytics" size={16} color="#4361EE" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Quick Access */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Quick Access</Text>

                    <View style={styles.quickAccessGrid}>
                        <TouchableOpacity style={styles.quickAccessItem} onPress={() => navigation.navigate('TestSeries')}>
                            <View style={[styles.quickAccessIcon, { backgroundColor: '#E6F0FF' }]}>
                                <MaterialIcons name="assignment" size={24} color="#4361EE" />
                            </View>
                            <Text style={styles.quickAccessText}>Test Series</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickAccessItem} onPress={() => navigation.navigate('CurrentAffairs')}>
                            <View style={[styles.quickAccessIcon, { backgroundColor: '#FFF2E6' }]}>
                                <MaterialIcons name="article" size={24} color="#FF8C00" />
                            </View>
                            <Text style={styles.quickAccessText}>Current Affairs</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickAccessItem} onPress={() => navigation.navigate('AudioLectures')}>
                            <View style={[styles.quickAccessIcon, { backgroundColor: '#E6FFE6' }]}>
                                <MaterialIcons name="headset" size={24} color="#008000" />
                            </View>
                            <Text style={styles.quickAccessText}>Audio Lectures</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickAccessItem} onPress={() => navigation.navigate('DoubtSolving')}>
                            <View style={[styles.quickAccessIcon, { backgroundColor: '#F0E6FF' }]}>
                                <MaterialIcons name="question-answer" size={24} color="#6600CC" />
                            </View>
                            <Text style={styles.quickAccessText}>Doubt Solving</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Community Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.communityCard}>
                        <ImageBackground
                            source={{ uri: 'https://via.placeholder.com/800x400' }}
                            style={styles.communityBackground}
                            imageStyle={styles.communityBackgroundImage}
                        >
                            <View style={styles.communityOverlay}>
                                <View style={styles.communityContent}>
                                    <Text style={styles.communityTitle}>Join the UPSC Community</Text>
                                    <Text style={styles.communityDescription}>
                                        Connect with fellow aspirants, share resources, and participate in group discussions
                                    </Text>
                                    <TouchableOpacity style={styles.communityButton}>
                                        <Text style={styles.communityButtonText}>Join Now</Text>
                                        <MaterialIcons name="group-add" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>

                {/* Bottom spacing */}
                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <MaterialIcons name="home" size={24} color="#4361EE" />
                    <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('Courses')}>
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
    scrollView: {
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    statsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        width: width / 3.5,
        alignItems: 'center',
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
    statsIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statsValue: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    statsLabel: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllButtonText: {
        fontSize: isTablet ? 14 : 12,
        color: '#4361EE',
        fontWeight: '600',
    },
    enrolledCoursesContainer: {
        paddingHorizontal: 12,
    },
    enrolledCourseCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: isTablet ? 320 : 280,
        marginHorizontal: 4,
        overflow: 'hidden',
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
    enrolledCourseThumbnail: {
        width: '100%',
        height: 140,
    },
    enrolledCourseContent: {
        padding: 12,
    },
    enrolledCourseTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    enrolledCourseInstructor: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginBottom: 8,
    },
    progressContainer: {
        marginBottom: 8,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 3,
        marginBottom: 4,
    },
    progressBarFill: {
        height: 6,
        backgroundColor: '#4361EE',
        borderRadius: 3,
    },
    progressText: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    nextLessonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextLessonText: {
        fontSize: isTablet ? 12 : 10,
        color: '#4361EE',
        marginLeft: 4,
    },
    studyPlanCard: {
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    studyPlanGradient: {
        borderRadius: 12,
    },
    studyPlanContent: {
        padding: 16,
        flexDirection: 'row',
    },
    studyPlanLeft: {
        flex: 3,
    },
    studyPlanRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    studyPlanTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    studyPlanDescription: {
        fontSize: isTablet ? 14 : 12,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 16,
    },
    studyPlanButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    studyPlanButtonText: {
        color: '#4361EE',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
    },
    eventsContainer: {
        paddingHorizontal: 16,
    },
    eventCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
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
    eventIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    eventContent: {
        flex: 1,
    },
    eventTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    eventTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventTimeText: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
        marginLeft: 4,
    },
    recommendedCoursesContainer: {
        paddingHorizontal: 12,
    },
    recommendedCourseCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: isTablet ? 280 : 240,
        marginHorizontal: 4,
        overflow: 'hidden',
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
    recommendedCourseThumbnail: {
        width: '100%',
        height: 120,
    },
    recommendedCourseContent: {
        padding: 12,
    },
    recommendedCourseTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    recommendedCourseInstructor: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
        marginBottom: 6,
    },
    recommendedCourseStats: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    recommendedCourseRating: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
        marginRight: 12,
    },
    recommendedCourseStudents: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    recommendedCoursePricing: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recommendedCourseDiscountPrice: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: 'bold',
        color: '#4361EE',
        marginRight: 6,
    },
    recommendedCourseOriginalPrice: {
        fontSize: isTablet ? 12 : 10,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    performanceCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
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
    performanceHeader: {
        marginBottom: 16,
    },
    performanceTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    performanceSubtitle: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    performanceStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    performanceStatItem: {
        alignItems: 'center',
    },
    performanceStatCircle: {
        width: isTablet ? 70 : 60,
        height: isTablet ? 70 : 60,
        borderRadius: isTablet ? 35 : 30,
        backgroundColor: '#E6F0FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    performanceStatCircleSecondary: {
        backgroundColor: '#FFF2E6',
    },
    performanceStatCircleTertiary: {
        backgroundColor: '#E6FFE6',
    },
    performanceStatValue: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#4361EE',
    },
    performanceStatValueSecondary: {
        color: '#FF8C00',
    },
    performanceStatValueTertiary: {
        color: '#008000',
    },
    performanceStatLabel: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    performanceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    performanceButtonText: {
        fontSize: isTablet ? 14 : 12,
        color: '#4361EE',
        fontWeight: '600',
        marginRight: 4,
    },
    quickAccessGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 12,
    },
    quickAccessItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: '48%',
        alignItems: 'center',
        marginBottom: 12,
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
    quickAccessIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickAccessText: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        color: '#333',
    },
    communityCard: {
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
        height: 160,
    },
    communityBackground: {
        width: '100%',
        height: '100%',
    },
    communityBackgroundImage: {
        borderRadius: 12,
    },
    communityOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    communityContent: {
        maxWidth: '80%',
    },
    communityTitle: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    communityDescription: {
        fontSize: isTablet ? 14 : 12,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 16,
    },
    communityButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    communityButtonText: {
        color: '#fff',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        marginRight: 4,
    },
    bottomSpacing: {
        height: 80,
    },
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

export default DashboardScreen;
