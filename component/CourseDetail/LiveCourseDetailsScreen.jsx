import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Modal,
    TextInput,
    Platform,
    Animated,
    SafeAreaView,
    StatusBar,
    Alert,
} from 'react-native';

// Import MaterialIcons directly with a specific name to avoid undefined issues
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { VdoPlayerView } from 'vdocipher-rn-bridge';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsCourseData } from './store';
import { UserData } from '../userData/UserData';
import { applyCoupon, initiatePayment, verifyPayment } from './store/payment';
import { REACT_APP_RAZORPAY_KEY_ID } from '@env';
import RazorpayCheckout from 'react-native-razorpay';


const LiveCourseDetailsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { courseId } = route.params;

    // Refs for scrolling to sections
    const scrollViewRef = useRef(null);
    const sectionPositions = useRef({
        features: 0,
        about: 0,
        schedule: 0,
        faq: 0,
        moreDetails: 0,
    });
    const sectionHeights = useRef({
        features: 0,
        about: 0,
        schedule: 0,
        faq: 0,
        moreDetails: 0,
    });

    // State variables
    const [activeTab, setActiveTab] = useState('features');
    const [showAll, setShowAll] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [payLoading, setPayLoading] = useState(false);
    const [contentVisible] = useState(new Animated.Value(0));
    const { usersData, userStatus } = UserData();
    const [discountPrice, setDiscountPrice] = useState(null);
    const [pageloading, setpageLoading] = useState(false);
    const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
    const [selectedCoursePrice, setSelectedCoursePrice] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [applyCouponLoading, setApplyCouponLoading] = useState(false);

    const { courseData, loading, error } = useSelector(
        state => state.CourseDetailData,
    );

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                await dispatch(DetailsCourseData(courseId));
            } catch (err) {
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching course data',
                    text2: err.message || 'Please try again later.',
                });
            } finally {
                // Simulate image loading if needed
                setTimeout(() => {
                    Animated.timing(contentVisible, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                }, 1000);
            }
        };

        fetchCourseDetails();
    }, [dispatch, courseId, contentVisible]);

    // Handle scroll event to update active tab
    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setCurrentScrollPosition(scrollY);

        // Determine which section is most visible
        const sections = Object.keys(sectionPositions.current);

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const position = sectionPositions.current[section];

            // If we've scrolled past the start of this section
            if (scrollY >= position - 50) {
                // 50px buffer for better UX
                if (activeTab !== section) {
                    setActiveTab(section);
                }
                break;
            }
        }
    };

    // Scroll to section function
    const scrollToSection = (section) => {
        if (scrollViewRef.current && sectionPositions.current[section] !== undefined) {
            scrollViewRef.current.scrollTo({
                y: sectionPositions.current[section],
                animated: true,
            });
            setActiveTab(section);
        }
    };

    // Handle section layout to capture positions
    const handleLayout = (section, event) => {
        const layout = event.nativeEvent.layout;
        sectionPositions.current[section] = layout.y;
        sectionHeights.current[section] = layout.height;
    };

    // Toggle schedule items
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Toggle FAQ items
    const handleFaqToggle = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // Show more/less schedule items
    const handleShowMore = () => {
        setShowAll(!showAll);
    };

    // Handle payment
    const handlePayment = async (amount, originalPrice) => {
        if (userStatus.emailStatus !== 'verified') {
            // Show alert for unverified email
            Toast.show({
                type: 'error',
                text1: 'Verify Your Email',
                text2: 'Please verify your email to proceed with the payment.',
            });
            return;
        }
        setPayLoading(true);
        try {
            const userId = usersData?._id;
            const orderData = await dispatch(
                initiatePayment({ amount, userId, courseId }),
            ).unwrap();
            //  //console.log('OrderData: ', orderData)
            // Handle payment verification after successful initiation
            if (orderData) {
                handlePaymentVerify(orderData, courseId, originalPrice);
            }
        } catch (err) {
            console.error('Error initiating payment:', err);
            Toast.show({
                type: 'info',
                text1: err,
                text2: 'Visit "My Course" to access this course.',
                zIndex: 9999,
                topOffset: 80,
            });
        } finally {
            setPayLoading(false); // End loading
        }
    };

    //Handle Payment Verify
    const handlePaymentVerify = async (data, courseIdd, originalPrice) => {
        try {
            setpageLoading(true);

            const options = {
                key: REACT_APP_RAZORPAY_KEY_ID,
                amount: data.data.amount,
                currency: data.data.currency,
                name: 'ZenStudy',
                description: 'Making Education Imaginative',
                order_id: data.data.id,
                theme: { color: '#5f63b8' },
            };

            // Trigger Razorpay payment UI
            const response = await RazorpayCheckout.open(options);

            const subtotalToUse = discountPrice && discountPrice.subTotal !== undefined
                ? discountPrice.subTotal === 0 ? 1 : discountPrice.subTotal.toFixed(2)
                : originalPrice;

            // Verify the payment after a successful transaction
            const verifyData = await dispatch(
                verifyPayment({
                    razorpayData: response,
                    userId: usersData._id,
                    courseId: courseIdd,
                    price: originalPrice,
                    code: couponCode || null,
                    discount: discountPrice?.discount || 0,
                    subtotal: subtotalToUse,
                })
            ).unwrap();

            // Check if the verification was successful
            if (verifyData.message === 'Payment Successful') {
                Alert.alert(
                    'Payment Successful',
                    `Your payment with ID: ${response.razorpay_payment_id} has been completed successfully.`,
                    [{ text: 'OK' }]
                );
                navigation.navigate('myCourseScreen');
            }
        } catch (err) {
            Alert.alert(
                'Payment Failed',
                'Your payment could not be completed. Please try again or contact support if the issue persists.',
                [{ text: 'OK' }]
            );
            console.error('Error during payment verification:', err);
        } finally {
            setpageLoading(false);
        }
    };

    // Apply coupon code
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            Alert.alert('Please enter a coupon code');
            return;
        }
        setApplyCouponLoading(true);
        try {
            const applyCouponData = await dispatch(
                applyCoupon({
                    code: couponCode,
                    price: selectedCoursePrice,
                    courseId: selectedCourseId,
                }),
            ).unwrap();
            //console.log('applyCouponData:', applyCouponData);

            if (applyCouponData?.discount !== undefined) {
                setDiscountPrice(applyCouponData);
            } else {
                setDiscountPrice(null);
            }
        } catch (err) {
            Alert.alert(`${err}`);
        } finally {
            setApplyCouponLoading(false);
            setIsModalOpen(false);
            setCouponCode('');
        }
    };

    const applyCouponm = (course_id, price) => {
        //console.log('course_id:', course_id, price);
        setSelectedCourseId(course_id);
        setSelectedCoursePrice(price);
        setIsModalOpen(true);
    };

    const tailwindColors = {
        'text-purple-600': { icon: '#9333ea', bg: '#ede9fe' },
        'text-blue-600': { icon: '#2563eb', bg: '#dbeafe' },
        'text-yellow-600': { icon: '#ca8a04', bg: '#fef9c3' },
        'text-green-600': { icon: '#16a34a', bg: '#dcfce7' },
    };

    // Helper function to get the appropriate icon for dynamic sections
    const renderIcon = (name, color) => {
        const nativeColors = tailwindColors[color] || { icon: '#000', bg: '#f3f4f6' }; // Default to gray bg

        return (
            <View
                style={[styles.iconContainer, {backgroundColor: nativeColors.bg}]}
            >
                <MaterialIcons name={name} size={20} color={nativeColors.icon} />
            </View>
        );
    };

    useEffect(() => {
        const sections = Object.keys(sectionPositions.current);
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const position = sectionPositions.current[section];

            if (currentScrollPosition >= position - 50) {
                if (activeTab !== section) {
                    setActiveTab(section);
                }
                break;
            }
        }
    }, [currentScrollPosition, activeTab]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#5f63b8" />
                <Text style={styles.loadingText}>Loading course details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Failed to load course details.</Text>
                <TouchableOpacity onPress={() => dispatch(DetailsCourseData(courseId))}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            {pageloading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#5f63b8" />
                    <Text style={styles.loadingText}>Loading course details...</Text>
                </View>
            )}
            {/* Tabs Section - Sticky Header */}
            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'features' && styles.activeTab]}
                        onPress={() => scrollToSection('features')}
                    >
                        <Text style={[styles.tabText, activeTab === 'features' && styles.activeTabText]}>Features</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'about' && styles.activeTab]}
                        onPress={() => scrollToSection('about')}
                    >
                        <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>About</Text>
                    </TouchableOpacity>
                    {courseData?.schedule?.length > 0 && (
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
                            onPress={() => scrollToSection('schedule')}
                        >
                            <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>Schedule</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
                        onPress={() => scrollToSection('faq')}
                    >
                        <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>FAQ's</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'moreDetails' && styles.activeTab]}
                        onPress={() => scrollToSection('moreDetails')}
                    >
                        <Text style={[styles.tabText, activeTab === 'moreDetails' && styles.activeTabText]}>More Details</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <Animated.View style={[styles.contentContainer, { opacity: contentVisible }]}>
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={handleScroll}
                    scrollEventThrottle={16} // Important for smooth scroll tracking
                >

                    {/* Main Content */}
                    <View style={styles.mainContentContainer}>
                        {/* Features Section */}
                        <View style={styles.section} onLayout={(e) => handleLayout('features', e)}>
                            {/* Video Preview - Using VdocipherRNBridge instead of WebView */}
                            <View style={styles.videoContainer}>
                                {/* Replace WebView with VdocipherRNBridge */}
                                {courseData && (<VdoPlayerView
                                    style={styles.video}
                                    embedInfo={{
                                        otp: courseData?.previewVideo.previewVideoUrl,
                                        playbackInfo: courseData?.previewVideo.previewVideoDescription,
                                        embedInfoOptions: {
                                            autoplay: false,
                                        },
                                    }}
                                />
                                )}
                            </View>
                        </View>

                        {/* About Section */}
                        <View style={styles.section} onLayout={(e) => handleLayout('about', e)}>
                            <Text style={styles.sectionTitle}>Course Details</Text>

                            {/* Course Overview Card */}
                            <View style={styles.overviewCard}>
                                <Text style={styles.overviewTitle}>Course Overview</Text>
                                <Text style={styles.overviewText}>{courseData?.description}</Text>

                                <View style={styles.dateCard}>
                                    <View style={styles.dateIconContainer}>
                                        <MaterialIcons name="event" size={20} color="#0066cc" />
                                    </View>
                                    <View>
                                        <Text style={styles.dateLabel}>Course Start Date</Text>
                                        <Text style={styles.dateValue}>
                                            {new Date(courseData?.startTime).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={styles.sectionTitle}>About the Batch</Text>

                            <View style={styles.featuresList}>
                                <View style={styles.featureItem}>
                                    <Text style={styles.featureBullet}>⭐</Text>
                                    <View style={styles.featureTextContainer}>
                                        <Text style={styles.featureText}>
                                            <Text style={styles.featureBold}>Course Duration: </Text>
                                            {new Date(courseData?.startTime).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                            {courseData?.endTime ? (
                                                <Text>
                                                    {' | '}
                                                    {new Date(courseData?.endTime).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </Text>
                                            ) : (
                                                <Text style={styles.durationBadge}> 1.5 Years Comprehensive Program</Text>
                                            )}
                                        </Text>
                                    </View>
                                </View>

                                {courseData?.features?.map((item, index) => {
                                    const parts = item.features.split(/:(.*)/);
                                    return (
                                        <View key={index} style={styles.featureItem}>
                                            <Text style={styles.featureBullet}>⭐</Text>
                                            <View style={styles.featureTextContainer}>
                                                <Text style={styles.featureText}>
                                                    <Text style={styles.featureBold}>{parts[0]}: </Text>
                                                    {parts[1]}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}

                                <View style={styles.featureItem}>
                                    <Text style={styles.featureBullet}>⭐</Text>
                                    <View style={styles.featureTextContainer}>
                                        <Text style={styles.featureText}>
                                            <Text style={styles.featureBold}>Subjects: </Text>
                                            {courseData?.subjects?.slice(0, 6).map((item, index) => (
                                                <Text key={index}>
                                                    {item.subject}
                                                    {index < Math.min(5, courseData.subjects.length - 1) && ', '}
                                                </Text>
                                            ))}
                                            {courseData?.subjects?.length > 6 && ' and more'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Schedule Section */}
                        {courseData?.schedule?.length > 0 && (
                            <View style={styles.section} onLayout={(e) => handleLayout('schedule', e)}>
                                <Text style={styles.sectionTitle}>Batch Schedules</Text>

                                <View style={styles.scheduleContainer}>
                                    {(showAll ? courseData.schedule : courseData.schedule?.slice(0, 3))?.map((item, index) => {
                                        const colors = [
                                            { bgColor: '#e6f7ff', textColor: '#0066cc' },
                                            { bgColor: '#f0e6ff', textColor: '#6600cc' },
                                        ];
                                        const colorSet = colors[index % colors.length];

                                        return (
                                            <View key={index} style={styles.scheduleItem}>
                                                <TouchableOpacity
                                                    style={[styles.scheduleHeader, { backgroundColor: colorSet.bgColor }]}
                                                    onPress={() => handleToggle(index)}
                                                >
                                                    <View style={styles.scheduleHeaderContent}>
                                                        <Text style={[styles.scheduleTitle, { color: colorSet.textColor }]}>{item.title}</Text>
                                                        <MaterialIcons
                                                            name={openIndex === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                                            size={20}
                                                            color={colorSet.textColor}
                                                        />
                                                    </View>

                                                    <View style={styles.scheduleSubheader}>
                                                        <Text style={[styles.scheduleLectures, { color: colorSet.textColor }]}>
                                                            ({item.other2} lectures)
                                                        </Text>
                                                        <View style={styles.scheduleDateContainer}>
                                                            <MaterialIcons name="event" size={14} color={colorSet.textColor} />
                                                            <Text style={[styles.scheduleDate, { color: colorSet.textColor }]}>
                                                                {new Date(item.startDate).toLocaleDateString('en-GB', {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                                {' - '}
                                                                {new Date(item.endDate).toLocaleDateString('en-GB', {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>

                                                {openIndex === index && (
                                                    <View style={styles.scheduleContent}>
                                                        {item.description && (
                                                            <Text style={[styles.scheduleDescription, { color: colorSet.textColor }]}>
                                                                {item.description}
                                                            </Text>
                                                        )}

                                                        <View style={styles.lecturelist}>
                                                            {item?.lecture.map((lecture, lectureIndex) => (
                                                                <View key={lectureIndex} style={styles.lectureItem}>
                                                                    <View style={styles.lectureBullet} />
                                                                    <Text style={styles.lectureTitle}>{lecture.title}</Text>
                                                                </View>
                                                            ))}
                                                        </View>
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    })}
                                </View>

                                {courseData?.schedule?.length > 3 && (
                                    <TouchableOpacity style={styles.showMoreButton} onPress={handleShowMore}>
                                        <Text style={styles.showMoreText}>{showAll ? 'Show less...' : 'Show more...'}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}

                        {/* Special Offer */}
                        {courseData?.Offer?.map((item, index) => (
                            <View key={index} style={styles.offerCard}>
                                <View style={styles.offerContent}>
                                    <Text style={styles.offerTitle}>Exclusive Offer</Text>

                                    <View style={styles.offerList}>
                                        <View style={styles.offerItem}>
                                            <View style={styles.offerBullet}>
                                                <MaterialIcons name="check" size={16} color="#FFD700" />
                                            </View>
                                            <Text style={styles.offerText}>
                                                {item.title} {item.description}
                                            </Text>
                                        </View>

                                        <View style={styles.offerItem}>
                                            <View style={styles.offerBullet}>
                                                <MaterialIcons name="check" size={16} color="#FFD700" />
                                            </View>
                                            <Text style={styles.offerText}>{item.refundPolicy}</Text>
                                        </View>
                                    </View>


                                    <TouchableOpacity
                                        style={[styles.offerButton, payLoading && styles.offerButtonDisabled]}
                                        onPress={() => handlePayment(
                                            discountPrice
                                                ? discountPrice?.subTotal === 0
                                                    ? 1
                                                    : discountPrice?.subTotal.toFixed(2)
                                                : courseData?.price,
                                            courseData?.price
                                        )}
                                        disabled={payLoading}
                                    >
                                        <Text style={styles.offerButtonText}>{payLoading ? 'Wait...' : item.buttonText}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

                        {/* FAQ Section */}
                        <View style={styles.section} onLayout={(e) => handleLayout('faq', e)}>
                            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

                            <View style={styles.faqContainer}>
                                {courseData?.fAndQ?.map((item, index) => (
                                    <View key={index} style={styles.faqItem}>
                                        <TouchableOpacity style={styles.faqQuestion} onPress={() => handleFaqToggle(index)}>
                                            <Text style={styles.faqQuestionText}>{item.question}</Text>
                                            <MaterialIcons
                                                name={openFaqIndex === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                                size={20}
                                                color="#333"
                                            />
                                        </TouchableOpacity>

                                        {openFaqIndex === index && (
                                            <View style={styles.faqAnswer}>
                                                <Text style={styles.faqAnswerText}>{item.answer}</Text>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* More Details Section */}
                        <View style={styles.section} onLayout={(e) => handleLayout('moreDetails', e)}>
                            <Text style={styles.sectionTitle}>More Details</Text>

                            {/* Class Features */}
                            <View style={styles.featuresGrid}>
                                {courseData?.dynamicSections?.map((section, index) => {
                                    const isMentorship = section.title.toLowerCase().includes('mentorship');
                                    return (
                                        <View key={index} style={styles.featureCard}>
                                            <View style={styles.featureCardHeader}>
                                                <View style={[styles.featureCardIcon, { backgroundColor: section.bgColor || '#f0f0f0' }]}>
                                                    {/* Use the helper function to get the right icon */}
                                                    {renderIcon(
                                                        section.icon === 'MdOutlineSchool' ? 'school' :
                                                            section.icon === 'BiBook' ? 'menu-book' :
                                                                section.icon === 'MdOutlineQuiz' ? 'support-agent' :
                                                                    section.icon === 'MdOutlinePeople' ? 'people' : 'school',
                                                        section.textColor
                                                    )}
                                                </View>
                                                <Text style={styles.featureCardTitle}>{section.title}</Text>
                                            </View>

                                            {isMentorship ? (
                                                <View>
                                                    <View style={styles.mentorshipContainer}>
                                                        {section?.contents?.map((item, i) => (
                                                            <Text key={i} style={styles.mentorshipText}>
                                                                {item.text}
                                                            </Text>
                                                        ))}
                                                    </View>

                                                    <View style={styles.mentorshipFeatures}>
                                                        <View style={styles.mentorshipFeatureItem}>
                                                            <View style={styles.mentorshipFeatureIcon}>
                                                                <MaterialIcons name="check" size={16} color="#008000" />
                                                            </View>
                                                            <Text style={styles.mentorshipFeatureText}>Personal Guidance</Text>
                                                        </View>

                                                        <View style={styles.mentorshipFeatureItem}>
                                                            <View style={styles.mentorshipFeatureIcon}>
                                                                <MaterialIcons name="check" size={16} color="#008000" />
                                                            </View>
                                                            <Text style={styles.mentorshipFeatureText}>Doubt Clearing Sessions</Text>
                                                        </View>

                                                        <View style={styles.mentorshipFeatureItem}>
                                                            <View style={styles.mentorshipFeatureIcon}>
                                                                <MaterialIcons name="check" size={16} color="#008000" />
                                                            </View>
                                                            <Text style={styles.mentorshipFeatureText}>Motivational Sessions</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ) : (
                                                <View style={styles.featureCardContent}>
                                                    {section?.contents?.map((item, i) => (
                                                        <View key={i} style={styles.featureCardItem}>
                                                            <MaterialIcons name="check" size={16} color="#4CAF50" />
                                                            <Text
                                                                style={[styles.featureCardItemText, item.highlight && styles.featureCardItemHighlight]}
                                                            >
                                                                {item.text}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    );
                                })}
                            </View>

                            {/* Subjects Covered */}
                            <View style={styles.subjectsCard}>
                                <View style={styles.subjectsHeader}>
                                    <View style={styles.subjectsIcon}>
                                        <MaterialIcons name="category" size={20} color="#0066cc" />
                                    </View>
                                    <Text style={styles.subjectsTitle}>Subjects Covered</Text>
                                </View>

                                <View style={styles.subjectsGrid}>
                                    {courseData?.subjects?.map((subject, index) => (
                                        <View key={index} style={styles.subjectItem}>
                                            <Text style={styles.subjectText}>{subject.subject}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Why Choose Us */}
                            <View style={styles.whyChooseUsCard}>
                                <Text style={styles.whyChooseUsTitle}>Why Choose Us?</Text>

                                <View style={styles.whyChooseUsGrid}>
                                    {courseData?.whyChooseUs?.map((item, index) => (
                                        <View key={index} style={styles.whyChooseUsItem}>
                                            <View style={styles.whyChooseUsBullet}>
                                                <MaterialIcons name="check" size={16} color="#fff" />
                                            </View>
                                            <Text style={styles.whyChooseUsText}>{item.point}</Text>
                                        </View>
                                    ))}
                                </View>

                                <View style={styles.whyChooseUsButtonContainer}>
                                    <TouchableOpacity
                                        style={[styles.whyChooseUsButton, payLoading && styles.whyChooseUsButtonDisabled]}
                                        onPress={() => handlePayment(
                                            discountPrice
                                                ? discountPrice?.subTotal === 0
                                                    ? 1
                                                    : discountPrice?.subTotal.toFixed(2)
                                                : courseData?.price,
                                            courseData?.price
                                        )}
                                        disabled={payLoading}
                                    >
                                        <Text style={styles.whyChooseUsButtonText}>
                                            {payLoading ? 'Wait...' : 'Enroll Now and Start Your UPSC Journey!'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Purchase Card - Fixed at Bottom */}
                <View style={styles.purchaseCard}>
                    <View style={styles.purchaseCardContent}>
                        <View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.currentPrice}>
                                    ₹{discountPrice !== null ? (discountPrice.subTotal.toFixed(2)) : courseData?.price}
                                </Text>
                                <Text style={styles.originalPrice}>₹{courseData?.value}</Text>
                            </View>

                            {discountPrice !== null && (
                                <Text style={styles.discountText}>
                                    Extra discount applied! You saved ₹{(courseData?.price - discountPrice?.subTotal).toFixed(2)}
                                </Text>
                            )}
                            {discountPrice !== null ? (
                                <Text style={styles.savingsText}>
                                    Save {Math.round(((courseData?.value - discountPrice?.subTotal) / courseData?.value) * 100)}%
                                </Text>
                            ) : (
                                <Text style={styles.savingsText}>
                                    Save {Math.round(((courseData?.value - courseData?.price) / courseData?.value) * 100)}%
                                </Text>
                            )}
                        </View>
                        {payLoading ? (
                            <TouchableOpacity disabled={true} style={styles.purchaseButton}>
                                <Text style={styles.purchaseButtonText} numberOfLines={1} ellipsizeMode="tail">please wait..</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.purchaseButton, payLoading && styles.purchaseButtonDisabled]}
                                onPress={() => handlePayment(
                                    discountPrice
                                        ? discountPrice?.subTotal === 0
                                            ? 1
                                            : discountPrice?.subTotal.toFixed(2)
                                        : courseData?.price,
                                    courseData?.price
                                )}
                                disabled={payLoading}
                            >
                                <Text style={styles.purchaseButtonText}>{payLoading ? 'Wait...' : 'Enroll Now'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity style={styles.couponButton} onPress={() => applyCouponm(courseData._id, courseData.price)}>
                        <Text style={styles.couponButtonText}>Have a coupon? Apply it here.</Text>
                    </TouchableOpacity>

                </View>

            </Animated.View>
            <Modal visible={isModalOpen} transparent={true} animationType="fade" onRequestClose={() => setIsModalOpen(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Apply Coupon Code</Text>

                        <TextInput
                            style={styles.modalInput}
                            value={couponCode}
                            onChangeText={setCouponCode}
                            placeholder="Enter coupon code"
                            placeholderTextColor="#999"
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setIsModalOpen(false)}>
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalApplyButton, applyCouponLoading && styles.modalApplyButtonDisabled]}
                                onPress={handleApplyCoupon}
                                disabled={applyCouponLoading}
                            >
                                <Text style={styles.modalApplyButtonText}>{applyCouponLoading ? 'Applying...' : 'Apply'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Toast />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    iconContainer: {
        borderRadius: 10,
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    tabsContainer: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        zIndex: 10,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#0066cc',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buyNowLoading: {
        backgroundColor: '#054bb4',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'center',
        opacity: 0.9,
        width: '100%', // Match button width
    },
    activeTabText: {
        color: '#0066cc',
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Extra padding for the fixed purchase card
    },
    bannerContainer: {
        width: '100%',
        height: 180,
        position: 'relative',
    },
    bannerPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientBackground: {
        backgroundColor: '#4a6ee0',
    },
    bannerPlaceholderText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    mainContentContainer: {
        padding: 16,
        marginTop: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    videoContainer: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
    },
    video: {
        flex: 1,
    },
    overviewCard: {
        backgroundColor: '#e8f0fe',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#d0e1fd',
    },
    overviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0066cc',
        marginBottom: 8,
    },
    overviewText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: 16,
    },
    dateCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d0e1fd',
    },
    dateIconContainer: {
        backgroundColor: '#e6f7ff',
        padding: 10,
        borderRadius: 20,
        marginRight: 12,
    },
    dateLabel: {
        fontSize: 12,
        color: '#666',
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    featuresList: {
        marginTop: 8,
    },
    featureItem: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    featureBullet: {
        fontSize: 18,
        color: '#FFD700',
        marginRight: 8,
        marginTop: -2,
    },
    featureTextContainer: {
        flex: 1,
    },
    featureText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    featureBold: {
        fontWeight: 'bold',
    },
    durationBadge: {
        backgroundColor: '#e6f7ff',
        color: '#0066cc',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        overflow: 'hidden',
        fontSize: 12,
        fontWeight: '600',
    },
    scheduleContainer: {
        marginTop: 8,
    },
    scheduleItem: {
        marginBottom: 12,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    scheduleHeader: {
        padding: 12,
        borderRadius: 8,
    },
    scheduleHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scheduleTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    scheduleSubheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    scheduleLectures: {
        fontSize: 12,
    },
    scheduleDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scheduleDate: {
        fontSize: 12,
        marginLeft: 4,
    },
    scheduleContent: {
        padding: 12,
        backgroundColor: '#fff',
    },
    scheduleDescription: {
        fontSize: 14,
        marginBottom: 8,
    },
    lecturelist: {
        marginLeft: 8,
    },
    lectureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    lectureBullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#666',
        marginRight: 8,
    },
    lectureTitle: {
        fontSize: 14,
        color: '#333',
    },
    showMoreButton: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    showMoreText: {
        color: '#6600cc',
        fontWeight: '600',
        fontSize: 14,
    },
    offerCard: {
        backgroundColor: '#4a6ee0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    offerContent: {
        flex: 1,
    },
    offerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    offerList: {
        marginBottom: 16,
    },
    offerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    offerBullet: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    offerText: {
        fontSize: 14,
        color: '#fff',
        flex: 1,
    },
    offerButton: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    offerButtonDisabled: {
        backgroundColor: '#e0e0e0',
    },
    offerButtonText: {
        color: '#4a6ee0',
        fontWeight: 'bold',
        fontSize: 16,
    },
    faqContainer: {
        marginTop: 8,
    },
    faqItem: {
        marginBottom: 12,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#e6f7ff',
        borderWidth: 1,
        borderColor: '#d0e1fd',
    },
    faqQuestion: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        paddingRight: 8,
    },
    faqAnswer: {
        padding: 16,
        paddingTop: 0,
        backgroundColor: '#f0f8ff',
    },
    faqAnswerText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    featureCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    featureCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureCardIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    iconPlaceholder: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    featureCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    featureCardContent: {
        flex: 1,
    },
    featureCardItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    featureCardItemText: {
        fontSize: 13,
        color: '#444',
        marginLeft: 8,
        flex: 1,
    },
    featureCardItemHighlight: {
        fontWeight: '600',
        transform: [{ scale: 1.05 }],
    },
    mentorshipContainer: {
        backgroundColor: '#e6ffe6',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccf2cc',
    },
    mentorshipText: {
        fontSize: 13,
        color: '#444',
        marginBottom: 4,
    },
    mentorshipFeatures: {
        marginTop: 4,
    },
    mentorshipFeatureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    mentorshipFeatureIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#e6ffe6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    mentorshipFeatureText: {
        fontSize: 14,
        paddingHorizontal: 1,
        fontWeight: '400',
        color: '#333',

    },
    subjectsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    subjectsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    subjectsIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e6f7ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    subjectsIconPlaceholder: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0066cc',
    },
    subjectsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subjectsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    subjectItem: {
        width: '31%',
        backgroundColor: '#f0f8ff',
        borderRadius: 8,
        padding: 8,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#d0e1fd',
    },
    subjectText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#0066cc',
        textAlign: 'center',
    },
    whyChooseUsCard: {
        backgroundColor: '#333',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    whyChooseUsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    whyChooseUsGrid: {
        marginBottom: 16,
    },
    whyChooseUsItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    whyChooseUsBullet: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginTop: 2,
    },
    whyChooseUsText: {
        fontSize: 14,
        color: '#fff',
        flex: 1,
        lineHeight: 20,
    },
    whyChooseUsButtonContainer: {
        alignItems: 'center',
        marginTop: 8,
    },
    whyChooseUsButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    whyChooseUsButtonDisabled: {
        backgroundColor: '#e0e0e0',
    },
    whyChooseUsButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    purchaseCard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 24 : 16,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    purchaseCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    originalPrice: {
        fontSize: 14,
        color: '#ff0000',
        textDecorationLine: 'line-through',
        marginLeft: 8,
    },
    discountText: {
        fontSize: 12,
        color: '#0066cc',
        marginTop: 2,
    },
    savingsText: {
        fontSize: 12,
        color: '#008000',
        fontWeight: '600',
        backgroundColor: '#e6ffe6',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderLeftWidth: 2,
        borderLeftColor: '#008000',
        marginTop: 4,
    },
    purchaseButton: {
        backgroundColor: '#4a6ee0',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    purchaseButtonDisabled: {
        backgroundColor: '#999',
    },
    purchaseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    couponButton: {
        marginTop: 8,
        marginBottom: 1,
        alignSelf: 'flex-start',
    },
    couponButtonText: {
        color: '#0066cc',
        fontSize: 12,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        color: '#000',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalCancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    modalCancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    modalApplyButton: {
        backgroundColor: '#4a6ee0',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    modalApplyButtonDisabled: {
        backgroundColor: '#999',
    },
    modalApplyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LiveCourseDetailsScreen;
