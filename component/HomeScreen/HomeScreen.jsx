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
  TextInput,
  Modal,
  Linking,
} from 'react-native';
import homestyle from './homeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RecentCourseData } from './store';
import { REACT_APP_RAZORPAY_KEY_ID } from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import FastImage from 'react-native-fast-image';
import {
  applyCoupon,
  initiatePayment,
  verifyPayment,
} from '../CourseDetail/store/payment';
import { UserData } from '../userData/UserData';
import { PurchaseCourseData } from '../myCourseScreen/store';
import { Course, YouTubeIcon } from '../Icons/MyIcon';
import myCourseStyle from '../myCourseScreen/myCourseStyle';
import PurchaseModal from '../purchaseCheck/PurchaseModal';
import { HomeScreenSakelton } from './HomeScreenSakelton';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const bannerScrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const { usersData, userStatus, refreshUserData } = UserData();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [payLoading, setPayLoading] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedCoursePrice, setSelectedCoursePrice] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [applyCouponLoading, setapplyCouponLoading] = useState(false);
  const [discountPrice, setdiscountPrice] = useState(null);
  const [imageLoading, setImageLoading] = useState({});
  const [loading, setLoading] = useState(true);

  const { courseData } = useSelector(state => state.RecentCourseData);
  const watchCourse = useSelector(state => state.PurchaseCourseDetails);
  const watchData = watchCourse.courseData;

  const images = [
    { id: 1, image: { uri: 'https://zenstudy.in/assets/1.webp' } },
    { id: 2, image: { uri: 'https://zenstudy.in/assets/2.webp' } },
    { id: 3, image: { uri: 'https://zenstudy.in/assets/3.webp' } },
  ];

  const handleBannerScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveBannerIndex(index);
  };

  const handleImageLoad = (id, isLoading) => {
    setImageLoading(prevState => ({ ...prevState, [id]: isLoading }));
  };

  const scrollToBannerIndex = index => {
    if (bannerScrollViewRef.current) {
      bannerScrollViewRef.current.scrollTo({
        x: screenWidth * index,
        animated: true,
      });
      setActiveBannerIndex(index);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (bannerScrollViewRef.current) {
        const nextIndex = (activeBannerIndex + 1) % images.length;
        scrollToBannerIndex(nextIndex);
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [activeBannerIndex, images.length]);

  useEffect(() => {
    const fetchUserData = async () => {
      await refreshUserData();
    };
    fetchUserData();
  }, [isModalVisible1, refreshUserData]);

  useEffect(() => {
    const fetchData = async () => {
      if (usersData?._id) {
        await dispatch(RecentCourseData(usersData._id));
        await dispatch(PurchaseCourseData(usersData._id));
        setLoading(false);
      }
    };
    fetchData();
  }, [usersData, dispatch]);


  const handlePayment = async (amount, courseId) => {
    setPayLoading(courseId);
    try {
      const userId = usersData?._id;
      const orderData = await dispatch(
        initiatePayment({ amount, userId, courseId }),
      ).unwrap();
      if (orderData) {
        handlePaymentVerify(orderData, courseId);
      }
    } catch (err) {
      console.error('Error initiating payment:', err);
    } finally {
      setPayLoading(null);
    }
  };

  const handlePaymentVerify = async (data, courseId) => {
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

    RazorpayCheckout.open(options)
      .then(async response => {
        try {
          const verifyData = await dispatch(
            verifyPayment({
              razorpayData: response,
              userId: usersData._id,
              courseId,
            }),
          ).unwrap();
          if (verifyData.message === 'Payment Successful') {
            Alert.alert(
              'Payment Successful',
              `Your payment with ID: ${response.razorpay_payment_id} has been completed successfully.`,
              [{ text: 'OK' }],
            );
            navigation.navigate('myCourseScreen');
          }
        } catch (err) {
          console.error('Error verifying payment:', err);
        }
      })
      .catch(() => {
        Alert.alert(
          'Payment Failed',
          'Your payment could not be completed. Please try again or contact support if the issue persists.',
          [{ text: 'OK' }],
        );
      });
  };

  const handleOpenModal = async (courseId, price) => {
    if (userStatus.emailStatus === 'notverified') {
      setIsModalVisible(true);
    } else {
      setSelectedCourseId(courseId);
      setSelectedCoursePrice(price);
      setShowModal(true);
    }
  };

  const applyCourse = async () => {
    setapplyCouponLoading(true);
    try {
      const applyCouponData = await dispatch(
        applyCoupon({
          code: couponCode,
          price: selectedCoursePrice,
          courseId: selectedCourseId,
        }),
      ).unwrap();
      if (applyCouponData?.discount !== undefined) {
        setdiscountPrice(applyCouponData.discount);
      } else {
        setdiscountPrice(null);
      }
    } catch (err) {
      Alert.alert(`${err}`);
    } finally {
      setapplyCouponLoading(false);
    }
  };

  const handleProceedWithPayment = price => {
    setShowModal(false);
    setdiscountPrice(null);
    setCouponCode('');
    handlePayment(price, selectedCourseId);
  };

  const discard = () => {
    setShowModal(false);
    setdiscountPrice(null);
    setCouponCode('');
  };

  const getShortDescription = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <View style={homestyle.container}>
      <ScrollView contentContainerStyle={homestyle.scrollViewContent}>
        {/* Show Loader while data is loading */}
        {loading && (<HomeScreenSakelton />)}
        {!loading && (
          <>
            {/* Banner/Carousel */}
            <View style={homestyle.carouselContainer}>
              <ScrollView
                ref={bannerScrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleBannerScroll}
                scrollEventThrottle={16}>
                {images.map(item => (
                  <View key={item.id} style={homestyle.imageContainer}>
                    <Image source={item.image} style={homestyle.image} />
                  </View>
                ))}
              </ScrollView>
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
              <Text style={homestyle.coursesTitle}>Recently Added Courses</Text>
              {courseData && courseData.length > 0 && (
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}>
                  {courseData.map(course => (
                    <View key={course._id} style={homestyle.courseCard}>
                      <Text style={homestyle.title}>{course.title}</Text>
                      <View style={homestyle.cImgContainer}>
                        <FastImage
                          source={{
                            uri: course?.imageUrl,
                            priority: FastImage.priority.high,
                          }}
                          style={homestyle.courseImage}
                          onLoadStart={() => handleImageLoad(course._id, true)}
                          onLoad={() => handleImageLoad(course._id, false)}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        {/* Show a loading spinner or placeholder */}
                        {imageLoading[course._id] && (
                          <ActivityIndicator
                            size="large"
                            color="#5f63b8"
                            style={homestyle.imageLoader}
                          />
                        )}
                      </View>
                      <Text style={homestyle.courseDescription}>
                        {course.description.slice(0, 150)}...
                      </Text>
                      <View style={homestyle.afterDesc}>
                        <Text style={homestyle.createdAt}>
                          {course?.language.name}
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
                          }>
                          <Text style={homestyle.exploreBtnText}>View Course</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            homestyle.buyNow,
                            payLoading === course._id && homestyle.opacity,
                          ]}
                          onPress={() => handleOpenModal(course._id, course.price)}
                          disabled={!!payLoading}>
                          {payLoading === course._id ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <Text style={homestyle.buyNowText}>Buy Now</Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Coupon Modal */}
            <Modal visible={showModal} transparent animationType="slide">
              <View style={homestyle.modalBackground}>
                <View style={homestyle.modalContainer}>
                  <View style={homestyle.modalTop}>
                    <Text style={homestyle.modalTitle}>
                      Enter coupon if you have ?
                    </Text>
                    <TouchableOpacity
                      onPress={() => discard()}
                      style={homestyle.modalCross}>
                      <Text style={homestyle.modalCrossText}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={homestyle.inputBtn}>
                    <TextInput
                      style={homestyle.modalInput}
                      placeholder="Enter your coupon code"
                      placeholderTextColor="#888"
                      value={couponCode}
                      onChangeText={setCouponCode}
                    />
                    <TouchableOpacity
                      style={homestyle.applyButton}
                      onPress={applyCourse}
                      disabled={applyCouponLoading}>
                      {applyCouponLoading ? (
                        <Text style={homestyle.disableButtonText}>
                          Please wait...
                        </Text>
                      ) : (
                        <Text style={homestyle.applyButtonText}>Apply</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  {discountPrice !== null && discountPrice !== undefined && (
                    <Text style={homestyle.finalPriceText}>
                      Final Course Price: ₹{' '}
                      {Math.round(discountPrice) === 0
                        ? 1
                        : Math.round(discountPrice)}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={homestyle.modalButton}
                    onPress={() => {
                      const finalPrice =
                        discountPrice !== null && Number(discountPrice) === 0
                          ? 1
                          : discountPrice
                            ? Math.round(discountPrice)
                            : selectedCoursePrice;
                      handleProceedWithPayment(finalPrice);
                    }}>
                    <Text style={homestyle.modalButtonText}>OK Proceed</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Explore our */}
            <View style={homestyle.exploreContainer}>
              <View style={homestyle.exploreIcons}>
                <TouchableOpacity
                  style={homestyle.exploreContent}
                  onPress={() => navigation.navigate('allCoursesScreen')}>
                  <Course fill="#054bb4" />
                  <Text style={homestyle.exploreContentText}>All courses</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={homestyle.exploreContent}
                  onPress={() =>
                    Linking.openURL('https://www.youtube.com/@Zenstudyz')
                  }>
                  <YouTubeIcon fill="#054bb4" />
                  <Text style={homestyle.exploreContentText}>Youtube</Text>
                </TouchableOpacity>
              </View>
            </View>

            {watchData && watchData.length > 0 && (
              <View style={homestyle.exploreCourses}>
                <Text style={homestyle.coursesTitle}>My Courses</Text>

                {watchData.map(course => (
                  <View style={myCourseStyle.card} key={course._id}>
                    {/* Title */}
                    <Text style={myCourseStyle.title}>
                      {course?.course_id?.title}
                    </Text>

                    {/* Image with play button */}
                    <View style={myCourseStyle.imageContainer}>
                      <Image
                        style={myCourseStyle.courseImage}
                        source={{ uri: course?.imageurl }}
                      />
                      <View style={myCourseStyle.playButtonContainer}>
                        <View style={myCourseStyle.playButton}>
                          <Text style={myCourseStyle.playButtonText}>▶</Text>
                        </View>
                      </View>
                    </View>

                    {/* Language tag */}
                    <View style={myCourseStyle.languageTag}>
                      <Text style={myCourseStyle.languageText}>
                        {course?.course_id?.language?.name}
                      </Text>
                    </View>

                    {/* Description */}
                    <Text style={myCourseStyle.description}>
                      {getShortDescription(course?.course_id?.description, 25)}
                    </Text>

                    {/* Continue Learning Button */}
                    <TouchableOpacity
                      style={myCourseStyle.continueButton}
                      onPress={() =>
                        navigation.navigate('watchCourse', { courseId: course?._id })
                      }>
                      <Text style={myCourseStyle.continueButtonText}>
                        Continue Learning
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      <PurchaseModal
        isVisible={isModalVisible}
        setIsModalVisible1={setIsModalVisible1}
        onClose={() => setIsModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

export default HomeScreen;
