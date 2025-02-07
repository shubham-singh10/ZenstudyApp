import React, {Fragment, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dimensions, StyleSheet} from 'react-native';
import {applyCoupon} from '../CourseDetail/store/payment';
import {useDispatch} from 'react-redux';
import {UserData} from '../userData/UserData';
import {REACT_APP_RAZORPAY_KEY_ID} from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import {
  initiatePayment,
  verifyPayment,
} from '../CourseDetail/store/payment';
const {width: screenWidth} = Dimensions.get('window');

function CourseCard({course, navigation}) {
  const {usersData} = UserData();
  const [isModalVisible, setModalVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [applyCouponLoading, setApplyCouponLoading] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [imageLoading, setImageLoading] = useState({});
  const [payLoading, setPayLoading] = useState(null);
  const [selectedCoursePrice, setSelectedCoursePrice] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const dispatch = useDispatch();

  const handlePayment = async (courseId, amount) => {
    setPayLoading(courseId);
    try {
      const userId = usersData?._id;
      console.log('userId:', userId);
      const orderData = await dispatch(
        initiatePayment({amount, userId, courseId}),
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
              [{text: 'OK'}],
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
      setCouponCode('');
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

  const handleImageLoad = (id, isLoading) => {
    setImageLoading(prevState => ({...prevState, [id]: isLoading}));
  };

  return (
    <Fragment>
      <View key={course._id} style={style.courseCard}>
        <Text style={style.title}>{course.title}</Text>
        <View style={style.cImgContainer}>
          <FastImage
            source={{
              uri: course?.imageUrl,
              priority: FastImage.priority.high,
            }}
            style={style.courseImage}
            onLoadStart={() => handleImageLoad(course._id, true)}
            onLoad={() => handleImageLoad(course._id, false)}
            resizeMode={FastImage.resizeMode.cover}
          />
          {imageLoading[course._id] && (
            <ActivityIndicator
              size="large"
              color="#5f63b8"
              style={style.imageLoader}
            />
          )}
        </View>
        <Text style={style.courseDescription}>
          {course.description.slice(0, 150)}...
        </Text>
        <View style={style.afterDesc}>
          <Text style={style.language}>{course?.language.name}</Text>
          
          <Text style={style.price}>
            
            {discountPrice && <Text style={style.crossPrice}>₹ {Math.round(course.price)}</Text>}
            {' '}
            ₹
            {discountPrice
              ? discountPrice?.subTotal === 0
                ? 1
                : discountPrice?.subTotal.toFixed(2)
              : Math.round(course.price)}
          </Text>
        </View>
        <TouchableOpacity
          style={style.couponBtn}
          onPress={() => applyCouponm(course._id, course.price)}>
          <Text style={style.couponBtnText}>Apply coupon if you have?</Text>
        </TouchableOpacity>
        <View style={style.cardBtns}>
          <TouchableOpacity
            style={style.exploreBtn}
            onPress={() =>
              navigation.navigate('courseDetail', {
                courseId: course._id,
              })
            }>
            <Text style={style.exploreBtnText}>View Course</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.buyNow, payLoading === course._id && style.opacity]}
            onPress={() =>
              handlePayment(
                course._id,
                discountPrice
                  ? discountPrice?.subTotal === 0
                    ? 1
                    : discountPrice?.subTotal.toFixed(2)
                  : course?.price,
              )
            }
            disabled={!!payLoading}>
            {payLoading === course._id ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={style.buyNowText}>Enroll Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for applying coupon */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            <Text style={style.modalTitle}>Enter Coupon Code</Text>
            <TextInput
              style={style.couponInput}
              value={couponCode}
              onChangeText={setCouponCode}
              placeholder="Enter your coupon"
              placeholderTextColor="#888"
            />
            {applyCouponLoading ? (
              <ActivityIndicator size="small" color="#5f63b8" />
            ) : (
              <View style={style.modalBtns}>
                <TouchableOpacity
                  style={style.applyCouponBtn}
                  onPress={() => applyCourse()}>
                  <Text style={style.applyCouponBtnText}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.closeBtn}
                  onPress={() => setModalVisible(false)}>
                  <Text style={style.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}

            {
            //   discountPrice !== null && (
            //   <Text style={style.discountMessage}>
            //     {discountPrice.discount > 0
            //       ? `Coupon applied! You get Rs.${discountPrice.discount} off.`
            //       : 'Invalid coupon code'}
            //   </Text>
            // )
          }
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}

const style = StyleSheet.create({
  courseCard: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    marginVertical: 20,
    marginHorizontal: 5,
    width: screenWidth - 50,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#054bb4',
  },
  cImgContainer: {
    width: '100%',
    height: 170,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  courseDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 15,
  },
  languageTag: {
    backgroundColor: '#e0e7ff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  languageText: {
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  afterDesc: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  language: {
    fontSize: 14,
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#054bb4',
    fontWeight: 'bold',
  },
  crossPrice:{
    textDecorationLine: 'line-through',
    color: '#666',
    fontSize: 12,
    marginRight: 5,
  },
  price: {
    fontSize: 16,
    color: '#054bb4',
    fontWeight: 'bold',
  },
  couponBtn: {
    marginTop: 10,
  },
  couponBtnText: {
    color: '#054bb4',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  cardBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  exploreBtn: {
    backgroundColor: '#E6F0FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
  },
  exploreBtnText: {
    color: '#054bb4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  opacitty: {
    opacity: '0.8',
  },
  buyNow: {
    backgroundColor: '#054bb4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
  },
  buyNowLoading: {
    backgroundColor: '#054bb2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
    flexDirection: 'row',
    gap: 2,
    opacity: 0.9,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
export default CourseCard;
