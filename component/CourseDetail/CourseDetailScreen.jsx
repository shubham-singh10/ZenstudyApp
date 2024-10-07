import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import { Language } from '../Icons/MyIcon';

const CourseDetail = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={courseStyle.scrollContainer}>
      <View style={courseStyle.container}>
        <Text style={courseStyle.title}>Title of the course</Text>

        <Text style={courseStyle.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>

        <View style={courseStyle.aboutCourse}>
          <View style={courseStyle.language}>
            <Language fill='#054bb4'/>
            <Text style={courseStyle.languageText}>Hindi</Text>
          </View>
          <Text style={courseStyle.tutor}>Tutor Name</Text>
        </View>
      </View>

      {/* Course Card */}
      <View style={courseStyle.card}>
        <Image
          source={{ uri: 'https://api.zenstudy.in/zenstudy/api/image/getimage/1726640310463-INDIAN%20SOCIETY.webp' }} // Replace with your image URL
          style={courseStyle.courseImage}
        />

        <View style={courseStyle.datePriceRow}>
          <Text style={courseStyle.courseDate}>02/05/2024</Text>
          <Text style={courseStyle.coursePrice}>$999</Text>
        </View>

        <TouchableOpacity style={courseStyle.buyButton} onPress={()=>navigation.navigate('watchCourse')}>
          <Text style={courseStyle.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* About Course Section */}
      <View style={courseStyle.aboutCourseSection}>
        <Text style={courseStyle.aboutCourseTitle}>About Course</Text>

        <View style={courseStyle.bulletPoint}>
          <View style={courseStyle.customBullet} />
          <Text style={courseStyle.bulletText}>Lorem Ipsum has been the industry’s standard dummy text.</Text>
        </View>

        <View style={courseStyle.bulletPoint}>
          <View style={courseStyle.customBullet} />
          <Text style={courseStyle.bulletText}>Lorem Ipsum has been the industry’s standard dummy text.</Text>
        </View>

        {/* Add more bullet points as necessary */}
      </View>
    </ScrollView>
  );
};

const courseStyle = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    flexGrow: 1,
    backgroundColor: '#fff',
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
  tutor: {
    color: '#054bb4',
    fontSize: 14,
    fontWeight: '500',
  },

  // New Card Styles
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginTop: -30,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
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
  coursePrice: {
    fontSize: 20,
    color: '#054bb4',
    fontWeight: '700',
  },
  buyButton: {
    backgroundColor: '#054bb4',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // About Course Section
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
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletText: {
    fontSize: 16,
    color: '#494949',
    marginLeft: 10, // Space between bullet and text
  },
  customBullet: {
    width: 8,
    height: 8,
    backgroundColor: '#054bb4',  // Blue bullet
    borderRadius: 4,  // Circular bullet
    marginRight: 10,  // Space between bullet and text
  },
});

export default CourseDetail;
