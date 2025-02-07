import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import myCourseStyle from './myCourseStyle';
import {useDispatch, useSelector} from 'react-redux';
import {PurchaseCourseData} from './store';
import {UserData} from '../userData/UserData';
import Loader from '../Loader';
import {NotFound} from '../Icons/MyIcon';

const MyCourses = ({navigation}) => {
  const dispatch = useDispatch();
  const {usersData} = UserData();
  const {recordedCourses, liveCourses, loading, error} = useSelector(
    state => state.PurchaseCourseDetails,
  );

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (usersData?._id) {
        await dispatch(PurchaseCourseData(usersData?._id));
        setDataFetched(true); // Mark data as fetched once the API call completes
      }
    };
    fetchData();
  }, [dispatch, usersData]);

  if (loading && !dataFetched) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={myCourseStyle.errorBox}>
        <NotFound />
        <Text style={myCourseStyle.errorText}>{error}</Text>
      </View>
    );
  }

  if (dataFetched && (!recordedCourses || recordedCourses.length === 0)) {
    return (
      <View style={myCourseStyle.nullmsg}>
        <Text style={myCourseStyle.nulltext}>
          You have not purchased any courses yet.
        </Text>
      </View>
    );
  }

  const getShortDescription = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <ScrollView contentContainerStyle={myCourseStyle.scrollContainer}>
      <Text style={myCourseStyle.title}>Recorded Courses</Text>
      {recordedCourses &&
        recordedCourses.map(course => (
          <View style={myCourseStyle.card} key={course._id}>
            {/* Title */}
            <Text style={myCourseStyle.title}>{course?.course_id?.title}</Text>

            {/* Image with play button */}
            <View style={myCourseStyle.imageContainer}>
              <Image
                style={myCourseStyle.courseImage}
                source={{uri: course?.imageUrl}}
              />
              <View style={myCourseStyle.playButtonContainer}>
                <View style={myCourseStyle.playButton}>
                  <Text style={myCourseStyle.playButtonText}>▶</Text>
                </View>
              </View>
            </View>

            {/* Language tag */}
            <View style={myCourseStyle.languageTag}>
              <Text style={myCourseStyle.languageText}>
                {course?.course_id?.language?.name}
              </Text>
            </View>

            {/* Description */}
            <Text style={myCourseStyle.description}>
              {getShortDescription(course?.course_id?.description, 25)}
            </Text>

            {/* Continue Learning Button */}
            <TouchableOpacity
              style={myCourseStyle.continueButton}
              onPress={() =>
                navigation.navigate('watchCourse', {courseId: course?._id})
              }>
              <Text style={myCourseStyle.continueButtonText}>
                Continue Learning
              </Text>
            </TouchableOpacity>
          </View>
        ))}

      <Text style={myCourseStyle.title}>Live Courses</Text>

      {liveCourses &&
        liveCourses.map(course => (
          <View style={myCourseStyle.card} key={course._id}>
            {/* Title */}
            <Text style={myCourseStyle.title}>{course?.course_id?.title}</Text>

            {/* Image with play button */}
            <View style={myCourseStyle.imageContainer}>
              <Image
                style={myCourseStyle.courseImage}
                source={{uri: course?.imageUrl}}
              />
              <View style={myCourseStyle.playButtonContainer}>
                <View style={myCourseStyle.playButton}>
                  <Text style={myCourseStyle.playButtonText}>▶</Text>
                </View>
              </View>
            </View>

            {/* Language tag */}
            <View style={myCourseStyle.languageTag}>
              <Text style={myCourseStyle.languageText}>
                {course?.course_id?.language?.name}
              </Text>
            </View>

            {/* Description */}
            <Text style={myCourseStyle.description}>
              {getShortDescription(course?.course_id?.description, 25)}
            </Text>

            <View style={myCourseStyle.buttonContainer}>
              <TouchableOpacity
                style={myCourseStyle.continueButton}
                onPress={() =>
                  navigation.navigate('liveScreen')
                }>
                <Text style={myCourseStyle.continueButtonText}>
                  Visit Live Class
                </Text>
              </TouchableOpacity>

              {/* Continue Learning Button */}
              <TouchableOpacity
                style={course?.course_id?.modules?.length === 0 ? myCourseStyle.continueButtonDisable : myCourseStyle.continueButton}
                disabled={course?.course_id?.modules?.length === 0}
                onPress={() =>
                  navigation.navigate('watchCourse', {courseId: course?._id})
                }>
                {course?.course_id?.modules?.length === 0 ? (
                  <Text style={myCourseStyle.continueButtonText}>
                   No Recorded Yet
                  </Text>
                ) : (
                  <Text style={myCourseStyle.continueButtonText}>
                    Recorded Lectures
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default MyCourses;
