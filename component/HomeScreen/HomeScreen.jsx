import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const bannerScrollViewRef = useRef(null);
  const coursesScrollViewRef = useRef(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);

  const images = [
    {id: 1, image: {uri: 'https://zenstudy.in/assets/1.webp'}},
    {id: 2, image: {uri: 'https://zenstudy.in/assets/2.webp'}},
    {id: 3, image: {uri: 'https://zenstudy.in/assets/3.webp'}},
  ];

  const courses = [
    {
      id: 1,
      title: 'Course 1',
      description:
        'Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley',
      image: {
        uri: 'https://api.zenstudy.in/zenstudy/api/image/getimage/1726640310463-INDIAN%20SOCIETY.webp',
      },
    },
    {
      id: 2,
      title: 'Course 2',
      description:
        'Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley',
      image: {
        uri: 'https://api.zenstudy.in/zenstudy/api/image/getimage/1726640310463-INDIAN%20SOCIETY.webp',
      },
    },
    {
      id: 3,
      title: 'Course 3',
      description:
        'Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley',
      image: {
        uri: 'https://api.zenstudy.in/zenstudy/api/image/getimage/1726640310463-INDIAN%20SOCIETY.webp',
      },
    },
  ];

  const handleBannerScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveBannerIndex(index);
  };

  const handleCourseScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveCourseIndex(index);
  };

  const scrollToBannerIndex = index => {
    bannerScrollViewRef.current.scrollTo({
      x: screenWidth * index,
      animated: false,
    });
    setActiveBannerIndex(index);
  };

  const scrollToCourseIndex = index => {
    coursesScrollViewRef.current.scrollTo({
      x: screenWidth * index,
      animated: false,
    });
    setActiveCourseIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeBannerIndex + 1) % images.length; // Loop back to the first image
      scrollToBannerIndex(nextIndex);
    }, 2000); // Scroll every 2 seconds

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [activeBannerIndex, images.length]); // Dependency array

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Banner/Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={bannerScrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleBannerScroll}
            scrollEventThrottle={16}>
            {images.map(item => (
              <View key={item.id} style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
            ))}
          </ScrollView>

          {/* Pagination Indicators for Banner */}
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationDot,
                  activeBannerIndex === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
                onPress={() => scrollToBannerIndex(index)}
              />
            ))}
          </View>
        </View>

        {/* Courses Section */}
        <View style={styles.coursesContainer}>
          <Text style={styles.coursesTitle}>Available Courses</Text>
          <ScrollView
            ref={coursesScrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleCourseScroll}
            scrollEventThrottle={16}>
            {courses.map(course => (
              <View key={course.id} style={styles.courseCard}>
                <Text style={styles.title}>{course.title}</Text>
                <View style={styles.cImgContainer}>
                  <Image source={course.image} style={styles.courseImage} />
                </View>
                <Text style={styles.courseDescription}>
                  {course.description}
                </Text>
                <View style={styles.afterDesc}>
                  <Text style={styles.createdAt}>Created At</Text>
                  <Text style={styles.price}>rs. 999</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full screen space
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures ScrollView content stretches to full height
  },
  carouselContainer: {
    marginHorizontal: 20,
    height: 200,
  },
  imageContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
  inactiveDot: {
    backgroundColor: '#ddd',
  },
  coursesContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  coursesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseCard: {
    flexDirection: 'column',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 30,
    marginRight: 10,
    width: screenWidth - 50,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#054bb4',
  },
  cImgContainer: {
    width: '100%',
    height: 170,
    paddingHorizontal: 25,
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
  },
  afterDesc: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  createdAt:{
    fontSize:14,
    color:'#054bb4',
    fontWeight:'bold',
  },
  price:{
    fontSize:16,
    color:'#054bb4',
    fontWeight:'bold',
  },
});

export default HomeScreen;
