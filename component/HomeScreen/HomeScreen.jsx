import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Course } from '../Icons/MyIcon';
import homestyle from './homeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RecentCourseData } from './store';
import Loader from '../Loader';
import { REACT_APP_RAZORPAY_KEY_ID } from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import { initiatePayment, verifyPayment } from '../CourseDetail/store/payment';
import { UserData } from '../userData/UserData';


const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const bannerScrollViewRef = useRef(null);
  const coursesScrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const { usersData } = UserData();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);
  const [payLoading, setPayLoading] = useState(false);

  const { courseData, loading } = useSelector((state) => state.RecentCourseData);

  const images = [
    { id: 1, image: { uri: 'https://zenstudy.in/assets/1.webp' } },
    { id: 2, image: { uri: 'https://zenstudy.in/assets/2.webp' } },
    { id: 3, image: { uri: 'https://zenstudy.in/assets/3.webp' } },
  ];

  const handleBannerScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveBannerIndex(index);
  };

  const handleCourseScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveCourseIndex(index);
  };

  const scrollToBannerIndex = (index) => {
    if (bannerScrollViewRef.current) {
      bannerScrollViewRef.current.scrollTo({
        x: screenWidth * index,
        animated: true, // Added animation for smooth scrolling
      });
      setActiveBannerIndex(index);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (bannerScrollViewRef.current) {
        const nextIndex = (activeBannerIndex + 1) % images.length; // Loop back to the first image
        scrollToBannerIndex(nextIndex);
      }
    }, 2000); // Scroll every 2 seconds

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [activeBannerIndex, images.length]);

  useEffect(() => {
    dispatch(RecentCourseData());
  }, [dispatch]);

  const handlePayment = async (amount, courseId) => {
    setPayLoading(true);
    try {
      const userId = usersData?._id;
      const orderData = await dispatch(initiatePayment({ amount, userId, courseId })).unwrap();
      //  console.log('OrderData: ', orderData)
      // Handle payment verification after successful initiation
      if (orderData) {
        handlePaymentVerify(orderData, courseId);
      }
    } catch (err) {
      console.error('Error initiating payment:', err);
    } finally {
      setPayLoading(false); // End loading
    }
  };

  const handlePaymentVerify = async (data, courseIdd) => {
    const options = {
      key: REACT_APP_RAZORPAY_KEY_ID,
      amount: data.data.amount,
      currency: data.data.currency,
      name: 'ZenStudy',
      description: 'Making Education Imaginative',
      order_id: data.data.id,
      theme: {
        color: '#5f63b8',
      },
    };

    // Trigger Razorpay payment UI
    RazorpayCheckout.open(options)
      .then(async (response) => {
        // Verifying the payment after successful payment
        try {
          const verifyData = await dispatch(
            verifyPayment({
              razorpayData: response,
              userId: usersData._id,
              courseId: courseIdd,
            })
          ).unwrap();

          // Check if the verification was successful
          // console.log('VerifyData: ', verifyData);
          if (verifyData.message === 'Payment Successful') {
            Alert.alert(
              'Payment Successful',
              `Your payment with ID: ${response.razorpay_payment_id} has been completed successfully.`,
              [{ text: 'OK' }]
            );
            navigation.navigate('myCourseScreen');
          }
        } catch (err) {
          console.error('Error verifying payment:', err);
        }
      })
      .catch((errors) => {
        // Handle failure
        // console.log('Error: ', error);
        Alert.alert(
          'Payment Failed',
          'Your payment could not be completed. Please try again or contact support if the issue persists.',
          [{ text: 'OK' }]
        );
      });
  };

  const getShortDescription = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={homestyle.container}>
      <ScrollView contentContainerStyle={homestyle.scrollViewContent}>
        {/* Banner/Carousel */}
        <View style={homestyle.carouselContainer}>
          <ScrollView
            ref={bannerScrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleBannerScroll}
            scrollEventThrottle={16}
          >
            {images.map((item) => (
              <View key={item.id} style={homestyle.imageContainer}>
                <Image source={item.image} style={homestyle.image} />
              </View>
            ))}
          </ScrollView>

          {/* Pagination Indicators for Banner */}
          <View style={homestyle.pagination}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  homestyle.paginationDot,
                  activeBannerIndex === index
                    ? homestyle.activeDot
                    : homestyle.inactiveDot,
                ]}
                onPress={() => scrollToBannerIndex(index)}
              />
            ))}
          </View>
        </View>

        {/* Courses Section */}
        <View style={homestyle.coursesContainer}>
          <Text style={homestyle.coursesTitle}>Available Courses</Text>
          {courseData && courseData.length > 0 && (
            <ScrollView
              ref={coursesScrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleCourseScroll}
              scrollEventThrottle={16}
            >
              {courseData.map((course) => (
                <View key={course._id} style={homestyle.courseCard}>
                  <Text style={homestyle.title}>{course.title}</Text>
                  <View style={homestyle.cImgContainer}>
                    <Image
                      source={{ uri: course?.imageUrl }}
                      style={homestyle.courseImage}
                    />
                  </View>
                  <Text style={homestyle.courseDescription}>
                    {getShortDescription(course.description, 20)}
                  </Text>
                  <View style={homestyle.languageTag}>
                    <Text style={homestyle.languageText}>
                      {course.language}
                    </Text>
                  </View>
                  <View style={homestyle.afterDesc}>
                    <Text style={homestyle.createdAt}>
                      {course?.createdAt.slice(0, 10)}
                    </Text>
                    <Text style={homestyle.price}>₹ {course.price}</Text>
                  </View>
                  <View style={homestyle.cardBtns}>
                    <TouchableOpacity
                      style={homestyle.exploreBtn}
                      onPress={() =>
                        navigation.navigate('courseDetail', {
                          courseId: course._id,
                        })
                      }
                    >
                      <Text style={homestyle.exploreBtnText}>View Course</Text>
                    </TouchableOpacity>
                    {payLoading ? (
                      <TouchableOpacity disabled={true}>
                        <ActivityIndicator size="small" color="#000" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={homestyle.buyNow}
                        onPress={() => handlePayment(course.price, course._id)}
                      >
                        <Text style={homestyle.buyNowText}>Buy Now</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {
          /* Explore our */
        }
        <View style={homestyle.exploreContainer}>
          <Text style={homestyle.exploreText}>Explore Our</Text>
          <View style={homestyle.exploreIcons}>
            <TouchableOpacity style={homestyle.exploreContent}>
              <Course fill="#054bb4" />
              <Text style={homestyle.exploreContentText}>Free Resources</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homestyle.exploreContent}>
              <Course fill="#054bb4" />
              <Text style={homestyle.exploreContentText}>Demo Content</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={homestyle.exploreCourses}>
          {courseData && courseData.length > 0 &&
            courseData.map((course) => (
              <View key={course._id} style={homestyle.courseCard}>
                <Text style={homestyle.title}>{course.title}</Text>
                <View style={homestyle.cImgContainer}>
                  <Image
                    source={{ uri: course?.imageUrl }}
                    style={homestyle.courseImage}
                  />
                </View>
                <Text style={homestyle.courseDescription}>
                  {getShortDescription(course.description, 20)}
                </Text>
                <View style={homestyle.languageTag}>
                  <Text style={homestyle.languageText}>Hindi</Text>
                </View>
                <View style={homestyle.afterDesc}>
                  <Text style={homestyle.createdAt}>
                    {course?.createdAt.slice(0, 10)}
                  </Text>
                  <Text style={homestyle.price}>₹ {course.price}</Text>
                </View>
                <View style={homestyle.cardBtns}>
                  <TouchableOpacity
                    style={homestyle.exploreBtn}
                    onPress={() =>
                      navigation.navigate('courseDetail', {
                        courseId: course._id,
                      })
                    }
                  >
                    <Text style={homestyle.exploreBtnText}>Explore Course</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={homestyle.buyNow}>
                    <Text style={homestyle.buyNowText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
