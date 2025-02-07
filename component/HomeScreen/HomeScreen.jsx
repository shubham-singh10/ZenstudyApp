import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import homestyle from './homeStyle';
import {useDispatch, useSelector} from 'react-redux';
import {RecentCourseData} from './store';
import {UserData} from '../userData/UserData';
import {PurchaseCourseData} from '../myCourseScreen/store';
import myCourseStyle from '../myCourseScreen/myCourseStyle';
import PurchaseModal from '../purchaseCheck/PurchaseModal';
import {HomeScreenSakelton} from './HomeScreenSakelton';
import CourseCard from '../Common/CourseCard';
import LinearGradient from 'react-native-linear-gradient';

const {width: screenWidth} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const bannerScrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const {usersData, refreshUserData} = UserData();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageloading, setpageLoading] = useState(false);

  const {courseData} = useSelector(state => state.RecentCourseData);
  const watchCourse = useSelector(state => state.PurchaseCourseDetails);
  const watchData = watchCourse.courseData;

  const images = [
    {id: 1, image: {uri: 'https://zenstudy.in/assets/1.webp'}},
    {id: 2, image: {uri: 'https://zenstudy.in/assets/2.webp'}},
    {id: 3, image: {uri: 'https://zenstudy.in/assets/3.webp'}},
  ];

  const handleBannerScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveBannerIndex(index);
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
  }, [usersData, dispatch, pageloading]);

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
        {loading && <HomeScreenSakelton />}
        {pageloading && <HomeScreenSakelton />}
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
              <Text style={homestyle.HeadText}>Recently Added Courses</Text>
              {courseData && courseData.length > 0 && (
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}>
                  {courseData.map(course => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      setpageLoading={setpageLoading}
                      navigation={navigation}
                    />
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Explore Section */}
            <View style={homestyle.exploreContainer}>
              <Text style={homestyle.HeadText}>Explore Our</Text>
              <View style={homestyle.exploreIcons}>
                {/* All Courses Button */}
                <TouchableOpacity
                  style={homestyle.exploreContent}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('allCoursesScreen')}>
                  <LinearGradient
                    colors={['#054bb4', '#007bff']}
                    style={homestyle.gradientButton}>
                    <View style={homestyle.iconWrapper}>
                      <Image
                        style={homestyle.exploricon}
                        source={require('../../assets/courseicon.png')}
                      />
                    </View>
                    <Text style={homestyle.exploreContentText}>
                      All Courses
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* YouTube Button */}
                <TouchableOpacity
                  style={homestyle.exploreContent}
                  activeOpacity={0.8}
                  onPress={() =>
                    Linking.openURL('https://www.youtube.com/@Zenstudyz')
                  }>
                  <LinearGradient
                    colors={['#ff0000', '#cc0000']}
                    style={homestyle.gradientButton}>
                    <View style={homestyle.iconWrapper}>
                      <Image
                        style={homestyle.exploricon}
                        source={require('../../assets/youtubeicon.png')}
                      />
                    </View>
                    <Text style={homestyle.exploreContentText}>YouTube</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
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
