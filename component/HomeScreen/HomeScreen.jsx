import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Course } from '../Icons/MyIcon';
import homestyle from './homeStyle';

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
        uri: 'https://api.zenstudy.in/zenstudy/api/image/getimage/1727009055230-INDIAN%20SOCIETY%20(1).webp',
      },
    },
    {
      id: 3,
      title: 'Course 3',
      description:
        'Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley',
      image: {
        uri: 'https://api.zenstudy.in/zenstudy/api/image/getimage/1726573585694-IR%20THUMBNAIL%20WEBP.webp',
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


  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeBannerIndex + 1) % images.length; // Loop back to the first image
      scrollToBannerIndex(nextIndex);
    }, 2000); // Scroll every 2 seconds

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [activeBannerIndex, images.length]); // Dependency array

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
            scrollEventThrottle={16}>
            {images.map(item => (
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
          <ScrollView
            ref={coursesScrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleCourseScroll}
            scrollEventThrottle={16}>
            {courses.map(course => (
              <View key={course.id} style={homestyle.courseCard}>
                <Text style={homestyle.title}>{course.title}</Text>
                <View style={homestyle.cImgContainer}>
                  <Image source={course.image} style={homestyle.courseImage} />
                </View>
                <Text style={homestyle.courseDescription}>
                  {course.description}
                </Text>
                <View style={homestyle.afterDesc}>
                  <Text style={homestyle.createdAt}>22-10-2024</Text>
                  <Text style={homestyle.price}>₹ 999</Text>
                </View>
                <View style={homestyle.cardBtns}>
                  <TouchableOpacity style={homestyle.exploreBtn}><Text  style={homestyle.exploreBtnText}>Explore Course</Text></TouchableOpacity>
                  <TouchableOpacity  style={homestyle.buyNow}><Text style={homestyle.buyNowText}>Buy Now</Text></TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

         {/* Explore our */}
          <View style={homestyle.exploreContainer}>
            <Text style={homestyle.exploreText}>Explore Our</Text>
            <View style={homestyle.exploreIcons}>
              
              <TouchableOpacity>
                <Course fill="black"/>
              </TouchableOpacity>
              <TouchableOpacity>
              <Course fill="black"/>
              </TouchableOpacity>

            </View>
          </View>
          
          <View style={homestyle.exploreCourses}>
          {courses.map(course => (
            <View key={course.id} style={homestyle.courseCard}>
              <Text style={homestyle.title}>{course.title}</Text>
              <View style={homestyle.cImgContainer}>
                <Image source={course.image} style={homestyle.courseImage} />
              </View>
              <Text style={homestyle.courseDescription}>
                {course.description}
              </Text>
              <View style={homestyle.afterDesc}>
                <Text style={homestyle.createdAt}>22-10-2024</Text>
                <Text style={homestyle.price}>₹ 999</Text>
              </View>
              <View style={homestyle.cardBtns}>
                <TouchableOpacity style={homestyle.exploreBtn}><Text  style={homestyle.exploreBtnText}>Explore Course</Text></TouchableOpacity>
                <TouchableOpacity  style={homestyle.buyNow}><Text style={homestyle.buyNowText}>Buy Now</Text></TouchableOpacity>
              </View>
            </View>
          ))}
          </View>

      </ScrollView>
    </View>
  );
};


export default HomeScreen;
