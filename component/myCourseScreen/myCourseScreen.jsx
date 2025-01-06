import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import myCourseStyle from './myCourseStyle';
import { useDispatch, useSelector } from 'react-redux';
import { PurchaseCourseData } from './store';
import { UserData } from '../userData/UserData';
import Loader from '../Loader';
import { NotFound } from '../Icons/MyIcon';

const MyCourses = ({ navigation }) => {
  const dispatch = useDispatch();
  const { usersData } = UserData();
  const { courseData, loading, error } = useSelector(
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

  if (dataFetched && (!courseData || courseData.length === 0)) {
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
      {courseData &&
        courseData.map(course => (
          <View style={myCourseStyle.card} key={course._id}>
            {/* Title */}
            <Text style={myCourseStyle.title}>{course?.course_id?.title}</Text>

            {/* Image with play button */}
            <View style={myCourseStyle.imageContainer}>
              <Image
                style={myCourseStyle.courseImage}
                source={{ uri: course?.imageurl }}
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
                navigation.navigate('watchCourse', { courseId: course?._id })
              }>
              <Text style={myCourseStyle.continueButtonText}>
                Continue Learning
              </Text>
            </TouchableOpacity>
          </View>
        ))}
    </ScrollView>
  );
};

export default MyCourses;
