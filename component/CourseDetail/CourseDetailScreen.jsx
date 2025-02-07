import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import {Language} from '../Icons/MyIcon';
import {useDispatch, useSelector} from 'react-redux';
import {DetailsCourseData} from './store';
import Loader from '../Loader';
import RazorpayCheckout from 'react-native-razorpay';
import {UserData} from '../userData/UserData';
import {applyCoupon, initiatePayment, verifyPayment} from './store/payment';
import {REACT_APP_RAZORPAY_KEY_ID} from '@env';
import FastImage from 'react-native-fast-image';
import {VdoPlayerView} from 'vdocipher-rn-bridge';

const CourseDetail = ({navigation, route}) => {
  const {courseId} = route.params;
  const {usersData} = UserData();
  const dispatch = useDispatch();
  const [payLoading, setPayLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [applyCouponLoading, setApplyCouponLoading] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [selectedCoursePrice, setSelectedCoursePrice] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const {courseData, loading, error} = useSelector(
    state => state.CourseDetailData,
  );

  const embedInfo = {
    otp: '20160313versUSE323UMMJcpv7HqvbGuL35Mz1xqV9b2YyKdPYw9Pg2EqGo1UVKY',
    playbackInfo:
      'eyJ2aWRlb0lkIjoiY2U0MGQ4YzFmNGQxNGE3Njg4YmZhMDE2NmFiZTFkODEifQ==',
  };

  const handleImageLoad = (id, isLoading) => {
    setImageLoading(prevState => ({...prevState, [id]: isLoading}));
  };
  // Fetch course data on mount
  useEffect(() => {
    dispatch(DetailsCourseData(courseId));
  }, [dispatch, courseId]);

  const handlePayment = async amount => {
    setPayLoading(true);
    try {
      const userId = usersData?._id;
      const orderData = await dispatch(
        initiatePayment({amount, userId, courseId}),
      ).unwrap();
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
      .then(async response => {
        // Verifying the payment after successful payment
        try {
          const verifyData = await dispatch(
            verifyPayment({
              razorpayData: response,
              userId: usersData._id,
              courseId: courseIdd,
            }),
          ).unwrap();

          // Check if the verification was successful
          // console.log('VerifyData: ', verifyData);
          if (verifyData.message === 'Payment Successful') {
            Alert.alert(
              'Payment Successful',
              `Your payment with ID: ${response.razorpay_payment_id} has been completed successfully.`,
              [{text: 'OK'}],
            );
            navigation.navigate('myCourseScreen');
          }
        } catch (err) {
          console.error('Error verifying payment:', err);
        }
      })
      .catch(errors => {
        // Handle failure
        // console.log('Error: ', error);
        Alert.alert(
          'Payment Failed',
          'Your payment could not be completed. Please try again or contact support if the issue persists.',
          [{text: 'OK'}],
        );
      });
  };

  const applyCourse = async () => {
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
      console.log('applyCouponData:', applyCouponData);

      if (applyCouponData?.discount !== undefined) {
        setDiscountPrice(applyCouponData);
      } else {
        setDiscountPrice(null);
      }
    } catch (err) {
      Alert.alert(`${err}`);
    } finally {
      setApplyCouponLoading(false);
      setModalVisible(false);
    }
  };

  const applyCouponm = (course_id, price) => {
    console.log('course_id:', course_id, price);
    setSelectedCourseId(course_id);
    setSelectedCoursePrice(price);
    setModalVisible(true);
  };

  // Display loading indicator while fetching data
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Text style={courseStyle.errorText}>
        Failed to load course details. Please try again.
      </Text>
    );
  }

  return (
    <ScrollView contentContainerStyle={courseStyle.scrollContainer}>
      <View style={courseStyle.container}>
        <Text style={courseStyle.title}>{courseData?.title}</Text>
        <Text style={courseStyle.text}>{courseData?.description}</Text>

        <View style={courseStyle.aboutCourse}>
          <View style={courseStyle.language}>
            <Language fill="#054bb4" />
            <Text style={courseStyle.languageText}>
              {courseData?.language?.name}
            </Text>
          </View>
        </View>
      </View>

      <View style={courseStyle.card}>
        {courseData && courseData?.tags === 'notlive' ? (
          <View style={courseStyle.videoContainer}>
            <VdoPlayerView
              style={courseStyle.courseVideo}
              embedInfo={embedInfo}
            />
          </View>
        ) : (
          <View style={courseStyle.cImgContainer}>
            <FastImage
              source={{
                uri: courseData?.imageUrl,
                priority: FastImage.priority.high,
              }}
              style={courseStyle.courseImage}
              onLoadStart={() => handleImageLoad(courseData?._id, true)}
              onLoad={() => handleImageLoad(courseData?._id, false)}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* Show a loading spinner or placeholder */}
            {imageLoading[courseData?._id] && (
              <ActivityIndicator
                size="large"
                color="#5f63b8"
                style={courseStyle.imageLoader}
              />
            )}
          </View>
        )}

        <View style={courseStyle.datePriceRow}>
          <TouchableOpacity
            style={courseStyle.couponBtn}
            onPress={() => applyCouponm(courseData._id, courseData.price)}>
            <Text style={courseStyle.couponBtnText}>
              Apply coupon if you have?
            </Text>
          </TouchableOpacity>
          <Text style={courseStyle.coursePrice}>
            {discountPrice && (
              <Text style={courseStyle.crossPrice}>
                ₹{Math.round(courseData.price)}
              </Text>
            )}{' '}
            ₹
            {discountPrice
              ? discountPrice?.subTotal === 0
                ? 1
                : discountPrice?.subTotal.toFixed(2)
              : Math.round(courseData?.price)}
          </Text>
        </View>

        {payLoading ? (
          <TouchableOpacity disabled={true} style={courseStyle.buyNowLoading}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={courseStyle.buyButtonText}>please wait..</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={courseStyle.buyButton}
            onPress={() =>
              handlePayment(
                discountPrice
                  ? discountPrice?.subTotal === 0
                    ? 1
                    : discountPrice?.subTotal.toFixed(2)
                  : courseData?.price,
              )
            }>
            <Text style={courseStyle.buyButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        )}

        {/* Modal for applying coupon */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={courseStyle.modalOverlay}>
            <View style={courseStyle.modalContainer}>
              <Text style={courseStyle.modalTitle}>Enter Coupon Code</Text>
              <TextInput
                style={courseStyle.couponInput}
                value={couponCode}
                onChangeText={setCouponCode}
                placeholder="Enter your coupon"
                placeholderTextColor="#888"
              />
              {applyCouponLoading ? (
                <ActivityIndicator size="small" color="#5f63b8" />
              ) : (
                <View style={courseStyle.modalBtns}>
                  <TouchableOpacity
                    style={courseStyle.applyCouponBtn}
                    onPress={() =>
                      applyCourse(courseData._id, courseData.price)
                    }>
                    <Text style={courseStyle.applyCouponBtnText}>Apply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={courseStyle.closeBtn}
                    onPress={() => setModalVisible(false)}>
                    <Text style={courseStyle.closeBtnText}>Close</Text>
                  </TouchableOpacity>
                </View>
              )}

              {discountPrice !== null && (
                <Text style={courseStyle.discountMessage}>
                  {discountPrice.discount > 0
                    ? `Coupon applied! You get Rs.${discountPrice.discount} off.`
                    : 'Invalid coupon code'}
                </Text>
              )}
            </View>
          </View>
        </Modal>
      </View>

      <View style={courseStyle.aboutCourseSection}>
        <Text style={courseStyle.aboutCourseTitle}>About Course</Text>

        {courseData?.other1 && (
          <View style={courseStyle.bulletPoint}>
            <View style={courseStyle.customBullet} />
            <Text style={courseStyle.bulletText}>{courseData.other1}</Text>
          </View>
        )}

        {courseData?.other2 && (
          <View style={courseStyle.bulletPoint}>
            <View style={courseStyle.customBullet} />
            <Text style={courseStyle.bulletText}>{courseData.other2}</Text>
          </View>
        )}

        <View style={courseStyle.moduleList}>
          {courseData?.modules?.map((module, index) => (
            <Module
              key={index}
              title={module.moduleTitle || `Module ${index + 1}`}
              index={index + 1}
              videoTitle={
                module.videos.length > 0 ? (
                  module.videos.map(({num, videoTitle}) => (
                    <Text key={num} style={courseStyle.videoTitleText}>
                      {videoTitle || 'No video title available'}
                    </Text>
                  ))
                ) : (
                  <Text>No videos available</Text>
                )
              }
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const Module = ({title, index, videoTitle}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <View style={courseStyle.moduleContainer}>
      <TouchableOpacity
        style={courseStyle.moduleHeader}
        onPress={() => setIsExpanded(!isExpanded)}>
        <View style={courseStyle.moduleTitleRow}>
          <View style={courseStyle.customBullet} />
          <Text style={courseStyle.moduleTitle}>{title}</Text>
        </View>
        <Text style={courseStyle.toggleIcon}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={courseStyle.moduleContent} key={index}>
          {videoTitle}
        </View>
      )}
    </View>
  );
};

const courseStyle = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  noVideoText: {
    color: '#000000',
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#e6f0fe',
    borderRadius: 5,
    padding: 10,
    paddingBottom: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#054bb4',
    marginBottom: 10,
  },
  cImgContainer: {
    width: '100%',
    height: 170,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageLoader: {
    position: 'absolute',
  },
  text: {
    fontSize: 14,
    color: '#494949',
    fontWeight: '500',
  },
  aboutCourse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  language: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  languageText: {
    fontSize: 14,
    color: '#000000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoContainer: {
  width: '100%',
  height: 230, 
  borderRadius: 8,
  overflow: 'hidden', // Prevents content overflow
  backgroundColor: '#000', // Background for video container
},

courseVideo: {
  width: '100%',
  height: '100%',
  borderRadius: 8,
},
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  datePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  courseDate: {
    fontSize: 14,
    color: '#054bb4',
  },
  couponBtn: {
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
  couponBtnText: {
    color: '#054bb4',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  crossPrice: {
    textDecorationLine: 'line-through',
    color: '#666',
    fontSize: 16,
    marginRight: 5, // Fixed typo
  },
  coursePrice: {
    fontSize: 20,
    color: '#054bb4',
    fontWeight: '700',
  },
  buyButton: {
    backgroundColor: '#054bb4',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Full width for better appearance
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
  aboutCourseSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  aboutCourseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#054bb4',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  bulletText: {
    fontSize: 16,
    color: '#494949',
    paddingHorizontal: 10,
    textAlign: 'justify',
    marginTop: -8,
  },
  customBullet: {
    width: 8,
    height: 8,
    backgroundColor: '#054bb4',
    borderRadius: 2,
    marginRight: 10,
  },

  moduleContainer: {
    backgroundColor: '#e6f0fe',
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    paddingHorizontal: 15,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleTitle: {
    fontSize: 16,
    color: '#054bb4',
    fontWeight: '500',
  },
  toggleIcon: {
    fontSize: 16,
    color: '#054bb4',
  },
  moduleContent: {
    marginTop: 10,
    paddingLeft: 15,
  },
  moduleText: {
    fontSize: 14,
    color: '#494949',
  },
  moduleList: {
    marginTop: 20,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  couponInput: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  applyCouponBtn: {
    backgroundColor: '#5f63b8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  applyCouponBtnText: {
    color: '#fff',
    fontSize: 16,
  },

  closeBtn: {
    marginTop: 10,
  },

  closeBtnText: {
    color: '#5f63b8',
    fontSize: 16,
  },

  discountMessage: {
    marginTop: 15,
    color: '#5f63b8',
    fontSize: 16,
  },
});

export default CourseDetail;
