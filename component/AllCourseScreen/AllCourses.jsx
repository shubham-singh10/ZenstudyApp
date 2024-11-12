import React, {useEffect, useState} from 'react';
import homestyle from '../HomeScreen/homeStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { UserData } from '../userData/UserData';
import { REACT_APP_RAZORPAY_KEY_ID } from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import { initiatePayment, verifyPayment } from '../CourseDetail/store/payment';
import Loader from '../Loader';
import { RecentCourseData } from '../HomeScreen/store';

const AllCourses = ({navigation}) => {
  const {usersData} = UserData();
  const {courseData, loading} = useSelector(state => state.RecentCourseData);
  const dispatch = useDispatch();
  const [payLoading, setPayLoading] = useState(null);  
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');


  useEffect(() => {
    if (usersData?._id) {
      dispatch(RecentCourseData(usersData._id));
    }
  }, [usersData, dispatch]);

  const handlePayment = async (amount, courseId) => {
    setPayLoading(courseId); 
    try {
      const userId = usersData?._id;
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

  const handleOpenModal = courseId => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const handleProceedWithPayment = () => {
    setShowModal(false);
    handlePayment(
      courseData.find(course => course._id === selectedCourseId).price,
      selectedCourseId,
    );
  };

  if (loading) {
    return <Loader />;
  }

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
        <View style={homestyle.coursesContainer}>
          <Text style={homestyle.coursesTitle}>Available Courses</Text>
          {courseData && courseData.length > 0 && (
            <ScrollView contentContainerStyle={homestyle.scrollViewContent}>
              {courseData.map(course => (
                <View key={course._id} style={homestyle.courseCard}>
                  <Text style={homestyle.title}>{course.title}</Text>
                  <View style={homestyle.cImgContainer}>
                    <Image
                      source={{uri: course?.imageUrl}}
                      style={homestyle.courseImage}
                    />
                  </View>
                  <Text style={homestyle.courseDescription}>
                    {getShortDescription(course.description, 20)}
                  </Text>
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
                      }>
                      <Text style={homestyle.exploreBtnText}>View Course</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        homestyle.buyNow,
                        payLoading === course._id && {opacity: 0.8},  
                      ]}
                      onPress={() => handleOpenModal(course._id)}
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
        <Modal visible={showModal} transparent animationType="slide">
          <View style={homestyle.modalBackground}>
            <View style={homestyle.modalContainer}>
              <View style={homestyle.modalTop}>
                <Text style={homestyle.modalTitle}>
                  Enter coupon if you have?
                </Text>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={homestyle.modalCross}>
                  <Text style={homestyle.modalCrossText}>X</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={homestyle.modalInput}
                placeholder="Enter your coupon code"
                value={couponCode}
                onChangeText={setCouponCode}
              />
              <TouchableOpacity
                style={homestyle.modalButton}
                onPress={handleProceedWithPayment}>
                <Text style={homestyle.modalButtonText}>OK Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AllCourses;
