import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import myCourseStyle from '../myCourseStyle';

const getShortDescription = (text, wordLimit = 25) => {
  const words = text.split(' ');
  return words.length > wordLimit ? `${words.slice(0, wordLimit).join(' ')}...` : text;
};

const LiveCourseCard = ({ course, navigation }) => (
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

    <View style={myCourseStyle.buttonContainer}>
      <TouchableOpacity
        style={myCourseStyle.continueButton}
        onPress={() => navigation.navigate('liveScreen')}
      >
        <MaterialIcons name="live-tv" size={20} color="#fff" />
        <Text style={myCourseStyle.continueButtonText}>Visit Live Class</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={course?.modules?.length === 0 ? myCourseStyle.continueButtonDisable : myCourseStyle.continueButton}
        disabled={course?.modules?.length === 0}
        onPress={() => navigation.navigate('watchCourse', { courseId: course?.paymentId })}
      >
        <MaterialIcons
          name={course?.modules?.length === 0 ? 'error-outline' : 'video-library'}
          size={20}
          color="#fff"
        />
        <Text style={myCourseStyle.continueButtonText}>
          {course?.modules?.length === 0 ? 'No Recorded Yet' : 'Recorded Lectures'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default LiveCourseCard;
