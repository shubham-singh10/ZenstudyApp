import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SafeAreaView,
    Platform,
    ImageBackground,
    FlatList,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;

const LandingScreen = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    // Simulated data - in a real app, this would come from an API
    const featuredCourses = [
        {
            id: 1,
            title: 'Complete UPSC CSE Prelims 2025',
            instructor: 'Dr. Rajesh Kumar',
            rating: 4.8,
            students: 12500,
            thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1470&auto=format&fit=crop',
            price: '₹8,999',
            discountPrice: '₹4,999',
            isLive: false,
            tag: 'Bestseller',
        },
        {
            id: 2,
            title: 'LIVE: Current Affairs Daily Analysis',
            instructor: 'Prof. Anand Sharma',
            rating: 4.9,
            students: 8200,
            thumbnail: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1374&auto=format&fit=crop',
            price: '₹1,999',
            discountPrice: '₹999',
            isLive: true,
            nextSession: 'Today, 7:00 PM',
            tag: 'Popular',
        },
        {
            id: 3,
            title: 'Geography & Environment Masterclass',
            instructor: 'Dr. Meera Iyer',
            rating: 4.7,
            students: 9500,
            thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop',
            price: '₹6,999',
            discountPrice: '₹3,499',
            isLive: false,
            tag: 'New',
        },
        {
            id: 4,
            title: 'LIVE: Essay Writing Workshop',
            instructor: 'Dr. Vikram Singh',
            rating: 4.8,
            students: 5600,
            thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop',
            price: '₹2,499',
            discountPrice: '₹1,499',
            isLive: true,
            nextSession: 'Tomorrow, 6:00 PM',
            tag: 'Limited Seats',
        },
    ];

    const liveClasses = [
        {
            id: 1,
            title: 'Current Affairs Analysis - June 2025',
            instructor: 'Prof. Anand Sharma',
            thumbnail: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1374&auto=format&fit=crop',
            time: 'Today, 7:00 PM',
            duration: '1 hour',
            participants: 245,
            status: 'live',
        },
        {
            id: 2,
            title: 'Essay Writing Workshop',
            instructor: 'Dr. Vikram Singh',
            thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop',
            time: 'Tomorrow, 6:00 PM',
            duration: '1.5 hours',
            participants: 180,
            status: 'upcoming',
        },
        {
            id: 3,
            title: 'Indian Polity - Constitutional Amendments',
            instructor: 'Dr. Rajesh Kumar',
            thumbnail: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1470&auto=format&fit=crop',
            time: 'Today, 9:00 PM',
            duration: '1 hour',
            participants: 210,
            status: 'live',
        },
        {
            id: 4,
            title: 'Economics Concepts for UPSC',
            instructor: 'Dr. Priya Mehta',
            thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1472&auto=format&fit=crop',
            time: 'Jun 20, 5:00 PM',
            duration: '2 hours',
            participants: 165,
            status: 'upcoming',
        },
    ];

    const categories = [
        {
            id: 1,
            title: 'Video Courses',
            icon: 'play-circle-filled',
            color: '#4361EE',
            count: 120,
            route: 'videoCoursesScreen',
        },
        {
            id: 2,
            title: 'Test Series',
            icon: 'assignment',
            color: '#3A86FF',
            count: 85,
            route: 'testSeriesScreen',
        },
        {
            id: 3,
            title: 'Current Affairs',
            icon: 'article',
            color: '#FF6B6B',
            count: 250,
            route: 'currentAffairsScreen',
        },
        {
            id: 4,
            title: 'Audio Lectures',
            icon: 'headset',
            color: '#4CC9F0',
            count: 75,
            route: 'audioLecturesScreen',
        },
        {
            id: 5,
            title: 'Study Material',
            icon: 'menu-book',
            color: '#4D908E',
            count: 320,
            route: 'studyMaterialScreen',
        },
        {
            id: 6,
            title: 'Doubt Solving',
            icon: 'question-answer',
            color: '#F77F00',
            count: 'Live',
            route: 'doubtSolvingScreen',
        },
    ];

    const testimonials = [
        {
            id: 1,
            name: 'Priya Sharma',
            rank: 'AIR 45',
            year: '2023',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop',
            quote: 'The structured approach and comprehensive coverage helped me secure a top rank.',
        },
        {
            id: 2,
            name: 'Rahul Verma',
            rank: 'AIR 112',
            year: '2023',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop',
            quote: 'The test series was a game-changer in my preparation strategy.',
        },
        {
            id: 3,
            name: 'Neha Gupta',
            rank: 'AIR 67',
            year: '2023',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop',
            quote: 'The mentorship program and doubt solving sessions were invaluable for my preparation.',
        },
    ];

    // Auto scroll for featured courses
    useEffect(() => {
        const interval = setInterval(() => {
            if (activeIndex < featuredCourses.length - 1) {
                flatListRef.current?.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true,
                });
            } else {
                flatListRef.current?.scrollToIndex({
                    index: 0,
                    animated: true,
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, featuredCourses.length]);

    const renderFeaturedItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.featuredItem}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
            activeOpacity={0.9}
        >
            <View style={styles.featuredCard}>
                <ImageBackground source={{ uri: item.thumbnail }} style={styles.featuredImage}>
                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.featuredGradient}>
                        {item.isLive && (
                            <View style={styles.liveContainer}>
                                <View style={styles.liveDot} />
                                <Text style={styles.liveText}>LIVE</Text>
                            </View>
                        )}

                        {item.tag && (
                            <View style={styles.tagContainer}>
                                <Text style={styles.tagText}>{item.tag}</Text>
                            </View>
                        )}

                        <View style={styles.featuredContent}>
                            <Text style={styles.featuredTitle}>{item.title}</Text>
                            <Text style={styles.featuredInstructor}>
                                <MaterialIcons name="person" size={14} color="#fff" /> {item.instructor}
                            </Text>

                            <View style={styles.featuredStats}>
                                <Text style={styles.featuredRating}>
                                    <MaterialIcons name="star" size={14} color="#FFD700" /> {item.rating}
                                </Text>
                                <Text style={styles.featuredStudents}>
                                    <MaterialIcons name="people" size={14} color="#fff" /> {item.students.toLocaleString()} students
                                </Text>
                            </View>

                            {item.isLive && item.nextSession && (
                                <View style={styles.nextSessionContainer}>
                                    <MaterialIcons name="access-time" size={14} color="#FF6B6B" />
                                    <Text style={styles.nextSessionText}>Next: {item.nextSession}</Text>
                                </View>
                            )}

                            <View style={styles.featuredPricing}>
                                <Text style={styles.featuredDiscountPrice}>{item.discountPrice}</Text>
                                <Text style={styles.featuredOriginalPrice}>{item.price}</Text>
                            </View>

                            <TouchableOpacity style={styles.enrollButton}>
                                <Text style={styles.enrollButtonText}>{item.isLive ? 'Join Now' : 'Enroll Now'}</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );

    const renderDot = (index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View
                key={index}
                style={[styles.dot, { width: dotWidth, opacity }, activeIndex === index && styles.activeDot]}
            />
        );
    };

    const renderLiveClassItem = ({ item }) => (
        <TouchableOpacity
            style={styles.liveClassCard}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
            activeOpacity={0.9}
        >
            <ImageBackground source={{ uri: item.thumbnail }} style={styles.liveClassImage}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.liveClassGradient}>
                    <View style={[styles.liveStatusBadge, item.status === 'live' ? styles.liveNowBadge : styles.upcomingBadge]}>
                        {item.status === 'live' && <View style={styles.liveStatusDot} />}
                        <Text style={styles.liveStatusText}>{item.status === 'live' ? 'LIVE NOW' : 'UPCOMING'}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>

            <View style={styles.liveClassContent}>
                <Text style={styles.liveClassTitle} numberOfLines={2}>
                    {item.title}
                </Text>

                <View style={styles.liveClassInstructorRow}>
                    <MaterialIcons name="person" size={14} color="#666" />
                    <Text style={styles.liveClassInstructor}>{item.instructor}</Text>
                </View>

                <View style={styles.liveClassDetails}>
                    <View style={styles.liveClassDetailItem}>
                        <MaterialIcons name="access-time" size={14} color="#666" />
                        <Text style={styles.liveClassDetailText}>{item.time}</Text>
                    </View>

                    <View style={styles.liveClassDetailItem}>
                        <MaterialIcons name="timelapse" size={14} color="#666" />
                        <Text style={styles.liveClassDetailText}>{item.duration}</Text>
                    </View>

                    <View style={styles.liveClassDetailItem}>
                        <MaterialIcons name="people" size={14} color="#666" />
                        <Text style={styles.liveClassDetailText}>{item.participants} joined</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.liveClassButton, item.status === 'live' ? styles.joinNowButton : styles.remindButton]}
                >
                    <Text style={styles.liveClassButtonText}>{item.status === 'live' ? 'Join Now' : 'Set Reminder'}</Text>
                    <MaterialIcons name={item.status === 'live' ? 'play-arrow' : 'notifications'} size={16} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate(item.route)} activeOpacity={0.8}>
            <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
                <MaterialIcons name={item.icon} size={isTablet ? 36 : 28} color="#fff" />
            </View>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <Text style={styles.categoryCount}>{typeof item.count === 'number' ? `${item.count}+ items` : item.count}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>zen</Text>
                    <Text style={styles.logoAccent}>Study</Text>
                </View>
                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('loginScreenNew')}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <ImageBackground
                    source={{
                        uri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
                    }}
                    style={styles.heroBackground}
                >
                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']} style={styles.heroGradient}>
                        <View style={styles.heroContent}>
                            <Text style={styles.heroTitle}>Your Journey to UPSC Success Starts Here</Text>
                            <Text style={styles.heroSubtitle}>Comprehensive preparation with expert guidance</Text>
                            <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate('videoCoursesScreen')}>
                                <Text style={styles.heroButtonText}>Explore Courses</Text>
                                <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                {/* Featured Courses */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Courses</Text>
                        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('videoCoursesScreen')}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <MaterialIcons name="chevron-right" size={20} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.featuredContainer}>
                        <FlatList
                            ref={flatListRef}
                            data={featuredCourses}
                            renderItem={renderFeaturedItem}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                                useNativeDriver: false,
                            })}
                            onMomentumScrollEnd={(event) => {
                                const newIndex = Math.floor(
                                    event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width,
                                );
                                setActiveIndex(newIndex);
                            }}
                            contentContainerStyle={styles.featuredList}
                        />

                        <View style={styles.pagination}>{featuredCourses.map((_, index) => renderDot(index))}</View>
                    </View>
                </View>

                {/* Categories Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Explore Categories</Text>
                    <FlatList
                        data={categories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={isTablet ? 3 : 2}
                        scrollEnabled={false}
                        contentContainerStyle={styles.categoriesContainer}
                    />
                </View>

                {/* Live Classes Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Live Classes</Text>
                        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('doubtSolvingScreen')}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <MaterialIcons name="chevron-right" size={20} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={liveClasses}
                        renderItem={renderLiveClassItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.liveClassesContainer}
                    />
                </View>

                {/* Learning Path Section */}
                <View style={styles.learningPathContainer}>
                    <Text style={styles.learningPathTitle}>Your UPSC Learning Path</Text>
                    <Text style={styles.learningPathSubtitle}>Follow our structured approach to success</Text>

                    <View style={styles.pathSteps}>
                        <View style={styles.pathStep}>
                            <View style={[styles.pathStepIcon, { backgroundColor: '#4361EE' }]}>
                                <MaterialIcons name="school" size={24} color="#fff" />
                                <Text style={styles.pathStepNumber}>1</Text>
                            </View>
                            <View style={styles.pathStepContent}>
                                <Text style={styles.pathStepTitle}>Foundation</Text>
                                <Text style={styles.pathStepDescription}>
                                    Build strong fundamentals with comprehensive coverage of basic concepts
                                </Text>
                            </View>
                        </View>

                        <View style={styles.pathConnector} />

                        <View style={styles.pathStep}>
                            <View style={[styles.pathStepIcon, { backgroundColor: '#3A86FF' }]}>
                                <MaterialIcons name="menu-book" size={24} color="#fff" />
                                <Text style={styles.pathStepNumber}>2</Text>
                            </View>
                            <View style={styles.pathStepContent}>
                                <Text style={styles.pathStepTitle}>Advanced Learning</Text>
                                <Text style={styles.pathStepDescription}>
                                    Deep dive into subjects with detailed study material and expert guidance
                                </Text>
                            </View>
                        </View>

                        <View style={styles.pathConnector} />

                        <View style={styles.pathStep}>
                            <View style={[styles.pathStepIcon, { backgroundColor: '#4CC9F0' }]}>
                                <MaterialIcons name="assignment" size={24} color="#fff" />
                                <Text style={styles.pathStepNumber}>3</Text>
                            </View>
                            <View style={styles.pathStepContent}>
                                <Text style={styles.pathStepTitle}>Test & Evaluate</Text>
                                <Text style={styles.pathStepDescription}>
                                    Regular assessments with detailed analysis and personalized feedback
                                </Text>
                            </View>
                        </View>

                        <View style={styles.pathConnector} />

                        <View style={styles.pathStep}>
                            <View style={[styles.pathStepIcon, { backgroundColor: '#F77F00' }]}>
                                <MaterialIcons name="emoji-events" size={24} color="#fff" />
                                <Text style={styles.pathStepNumber}>4</Text>
                            </View>
                            <View style={styles.pathStepContent}>
                                <Text style={styles.pathStepTitle}>Success</Text>
                                <Text style={styles.pathStepDescription}>
                                    Achieve your goals with our comprehensive preparation strategy
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Success Stories */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Success Stories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialScrollView}>
                        {testimonials.map((testimonial) => (
                            <View key={testimonial.id} style={styles.testimonialCard}>
                                <View style={styles.testimonialHeader}>
                                    <Image source={{ uri: testimonial.image }} style={styles.testimonialImage} />
                                    <View style={styles.testimonialInfo}>
                                        <Text style={styles.testimonialName}>{testimonial.name}</Text>
                                        <View style={styles.rankBadge}>
                                            <Text style={styles.rankText}>{testimonial.rank}</Text>
                                            <Text style={styles.yearText}>{testimonial.year}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.testimonialQuote}>"{testimonial.quote}"</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Why Choose Us Section */}
                <View style={styles.whyChooseUsContainer}>
                    <LinearGradient
                        colors={['#4361EE', '#3A86FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.whyChooseUsGradient}
                    >
                        <Text style={styles.whyChooseUsTitle}>Why Choose Us</Text>

                        <View style={styles.whyChooseUsGrid}>
                            <View style={styles.whyChooseUsItem}>
                                <View style={styles.whyChooseUsIcon}>
                                    <MaterialIcons name="people" size={24} color="#4361EE" />
                                </View>
                                <Text style={styles.whyChooseUsItemTitle}>Expert Faculty</Text>
                                <Text style={styles.whyChooseUsItemText}>Learn from experienced educators and UPSC toppers</Text>
                            </View>

                            <View style={styles.whyChooseUsItem}>
                                <View style={styles.whyChooseUsIcon}>
                                    <MaterialIcons name="library-books" size={24} color="#4361EE" />
                                </View>
                                <Text style={styles.whyChooseUsItemTitle}>Comprehensive Content</Text>
                                <Text style={styles.whyChooseUsItemText}>
                                    Complete coverage of syllabus with updated study material
                                </Text>
                            </View>

                            <View style={styles.whyChooseUsItem}>
                                <View style={styles.whyChooseUsIcon}>
                                    <MaterialIcons name="trending-up" size={24} color="#4361EE" />
                                </View>
                                <Text style={styles.whyChooseUsItemTitle}>Proven Results</Text>
                                <Text style={styles.whyChooseUsItemText}>Consistent track record of successful candidates</Text>
                            </View>

                            <View style={styles.whyChooseUsItem}>
                                <View style={styles.whyChooseUsIcon}>
                                    <MaterialIcons name="support-agent" size={24} color="#4361EE" />
                                </View>
                                <Text style={styles.whyChooseUsItemTitle}>Personalized Support</Text>
                                <Text style={styles.whyChooseUsItemText}>One-on-one mentorship and doubt resolution</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* Call to Action */}
                <View style={styles.ctaContainer}>
                    <Text style={styles.ctaTitle}>Ready to Begin Your UPSC Journey?</Text>
                    <Text style={styles.ctaDescription}>
                        Join thousands of aspirants who have successfully cleared the exam with our guidance.
                    </Text>
                    <View style={styles.ctaButtons}>
                        <TouchableOpacity style={styles.ctaSecondaryButton} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.ctaSecondaryButtonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ctaPrimaryButton} onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.ctaPrimaryButtonText}>Create Account</Text>
                            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
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
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontSize: isTablet ? 28 : 22,
        fontWeight: 'bold',
        color: '#333',
    },
    logoAccent: {
        fontSize: isTablet ? 28 : 22,
        fontWeight: 'bold',
        color: '#4361EE',
        marginLeft: 2,
    },
    headerButtons: {
        flexDirection: 'row',
    },
    loginButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    loginButtonText: {
        color: '#4361EE',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
    },
    signupButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        marginLeft: 8,
    },
    signupButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
    },
    heroBackground: {
        height: isTablet ? 400 : 220,
        width: '100%',
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    heroContent: {
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: isTablet ? 32 : 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: isTablet ? 18 : 16,
        color: '#fff',
        marginBottom: 16,
        opacity: 0.9,
    },
    heroButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    heroButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
        marginRight: 8,
    },
    sectionContainer: {
        padding: 16,
        marginTop: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: isTablet ? 24 : 20,
        fontWeight: 'bold',
        color: '#333',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: '#4361EE',
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        marginRight: 4,
    },
    featuredContainer: {
        marginBottom: 16,
    },
    featuredList: {
        paddingBottom: 16,
    },
    featuredItem: {
        width: width - 32,
        paddingHorizontal: 8,
    },
    featuredCard: {
        borderRadius: 12,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    featuredImage: {
        width: '100%',
        height: isTablet ? 300 : 220,
    },
    featuredGradient: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    liveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginRight: 4,
    },
    liveText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    tagContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    tagText: {
        color: '#333',
        fontSize: 12,
        fontWeight: 'bold',
    },
    featuredContent: {
        marginTop: 'auto',
    },
    featuredTitle: {
        fontSize: isTablet ? 22 : 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    featuredInstructor: {
        fontSize: isTablet ? 16 : 14,
        color: '#fff',
        marginBottom: 8,
        opacity: 0.9,
    },
    featuredStats: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    featuredRating: {
        fontSize: isTablet ? 14 : 12,
        color: '#fff',
        marginRight: 16,
    },
    featuredStudents: {
        fontSize: isTablet ? 14 : 12,
        color: '#fff',
    },
    nextSessionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    nextSessionText: {
        color: '#fff',
        fontSize: isTablet ? 14 : 12,
        marginLeft: 4,
    },
    featuredPricing: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featuredDiscountPrice: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 8,
    },
    featuredOriginalPrice: {
        fontSize: isTablet ? 16 : 14,
        color: '#ccc',
        textDecorationLine: 'line-through',
    },
    enrollButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    enrollButtonText: {
        color: '#4361EE',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#4361EE',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#4361EE',
    },
    categoriesContainer: {
        marginTop: 8,
    },
    categoryCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        margin: 8,
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
    categoryIcon: {
        width: isTablet ? 70 : 56,
        height: isTablet ? 70 : 56,
        borderRadius: isTablet ? 35 : 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        textAlign: 'center',
    },
    categoryCount: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        textAlign: 'center',
    },
    liveClassesContainer: {
        paddingRight: 16,
    },
    liveClassCard: {
        width: isTablet ? 300 : 250,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginRight: 12,
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
    liveClassImage: {
        width: '100%',
        height: 120,
    },
    liveClassGradient: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 12,
    },
    liveStatusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    liveNowBadge: {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
    },
    upcomingBadge: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    liveStatusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginRight: 4,
    },
    liveStatusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    liveClassContent: {
        padding: 12,
    },
    liveClassTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    liveClassInstructorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    liveClassInstructor: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginLeft: 4,
    },
    liveClassDetails: {
        marginBottom: 12,
    },
    liveClassDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    liveClassDetailText: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
        marginLeft: 4,
    },
    liveClassButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 6,
    },
    joinNowButton: {
        backgroundColor: '#FF6B6B',
    },
    remindButton: {
        backgroundColor: '#4361EE',
    },
    liveClassButtonText: {
        color: '#fff',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        marginRight: 4,
    },
    learningPathContainer: {
        padding: 16,
        backgroundColor: '#f0f4ff',
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 12,
    },
    learningPathTitle: {
        fontSize: isTablet ? 24 : 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    learningPathSubtitle: {
        fontSize: isTablet ? 16 : 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    pathSteps: {
        paddingHorizontal: 8,
    },
    pathStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    pathStepIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        position: 'relative',
    },
    pathStepNumber: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#fff',
        width: 20,
        height: 20,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 20,
    },
    pathStepContent: {
        flex: 1,
    },
    pathStepTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    pathStepDescription: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        lineHeight: isTablet ? 20 : 18,
    },
    pathConnector: {
        width: 2,
        height: 20,
        backgroundColor: '#ccc',
        marginLeft: 24,
        marginBottom: 16,
    },
    testimonialScrollView: {
        paddingBottom: 8,
    },
    testimonialCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginRight: 16,
        width: isTablet ? 400 : width - 64,
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
    testimonialHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    testimonialImage: {
        width: isTablet ? 70 : 60,
        height: isTablet ? 70 : 60,
        borderRadius: isTablet ? 35 : 30,
        marginRight: 12,
    },
    testimonialInfo: {
        flex: 1,
    },
    testimonialName: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    rankBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    rankText: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: 'bold',
        color: '#4361EE',
    },
    yearText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginLeft: 4,
    },
    testimonialQuote: {
        fontSize: isTablet ? 16 : 14,
        color: '#666',
        fontStyle: 'italic',
        lineHeight: isTablet ? 24 : 20,
    },
    whyChooseUsContainer: {
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    whyChooseUsGradient: {
        padding: 20,
        borderRadius: 12,
    },
    whyChooseUsTitle: {
        fontSize: isTablet ? 24 : 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    whyChooseUsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    whyChooseUsItem: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    whyChooseUsIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f0f4ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    whyChooseUsItemTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    whyChooseUsItemText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: isTablet ? 20 : 18,
    },
    ctaContainer: {
        backgroundColor: '#fff',
        padding: 24,
        margin: 16,
        borderRadius: 12,
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
    ctaTitle: {
        fontSize: isTablet ? 24 : 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    ctaDescription: {
        fontSize: isTablet ? 16 : 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    ctaButtons: {
        flexDirection: isTablet ? 'row' : 'column',
        width: '100%',
        alignItems: 'center',
    },
    ctaSecondaryButton: {
        borderWidth: 1,
        borderColor: '#4361EE',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: isTablet ? 0 : 12,
        width: isTablet ? '48%' : '100%',
        alignItems: 'center',
    },
    ctaSecondaryButtonText: {
        color: '#4361EE',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
    },
    ctaPrimaryButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginLeft: isTablet ? 16 : 0,
        width: isTablet ? '48%' : '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctaPrimaryButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
        marginRight: 8,
    },
});

export default LandingScreen;
