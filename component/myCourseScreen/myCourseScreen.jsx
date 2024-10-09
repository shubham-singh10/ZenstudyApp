import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import myCourseStyle from './myCourseStyle';

const MyCourses = () => {
  return (
    <ScrollView contentContainerStyle={myCourseStyle.scrollContainer}>
      <View style={myCourseStyle.card}>
        {/* Title */}
        <Text style={myCourseStyle.title}>Title of the Course here</Text>

        {/* Image with play button */}
        <View style={myCourseStyle.imageContainer}>
          <Image
            style={myCourseStyle.courseImage}
            source={{ uri: 'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg' }}
          />
          <View style={myCourseStyle.playButtonContainer}>
            <View style={myCourseStyle.playButton}><Text style={myCourseStyle.playButtonText}>▶</Text></View>
          </View>
        </View>

        {/* Language tag */}
        <View style={myCourseStyle.languageTag}>
          <Text style={myCourseStyle.languageText}>Hindi</Text>
        </View>

        {/* Description */}
        <Text style={myCourseStyle.description}>
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Text>

        {/* Continue Learning Button */}
        <TouchableOpacity style={myCourseStyle.continueButton}>
          <Text style={myCourseStyle.continueButtonText}>Continue Learning</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default MyCourses;
