import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import myCourseStyle from '../myCourseStyle';

const getShortDescription = (text, wordLimit = 25) => {
  const words = text.split(' ');
  return words.length > wordLimit ? `${words.slice(0, wordLimit).join(' ')}...` : text;
};

const CourseCard = ({ course, navigation }) => (
  <View style={myCourseStyle.card}>
    <Text style={myCourseStyle.title}>{course?.title}</Text>

    <View style={myCourseStyle.imageContainer}>
      <Image style={myCourseStyle.courseImage} source={{ uri: course?.thumbnailS3 }} />
      <View style={myCourseStyle.playButtonContainer}>
        <View style={myCourseStyle.playButton}>
          <Text style={myCourseStyle.playButtonText}>▶</Text>
        </View>
      </View>
    </View>

    <View style={myCourseStyle.languageTag}>
      <Text style={myCourseStyle.languageText}>{course?.language?.name}</Text>
    </View>

    <Text style={myCourseStyle.description}>
      {getShortDescription(course?.description)}
    </Text>

    <TouchableOpacity
      style={myCourseStyle.continueButton}
      onPress={() => navigation.navigate('watchCourse', { courseId: course?.paymentId })}
    >
      <MaterialIcons name="play-circle-outline" size={20} color="#fff" />
      <Text style={myCourseStyle.continueButtonText}>Continue Learning</Text>
    </TouchableOpacity>
  </View>
);

export default CourseCard;
