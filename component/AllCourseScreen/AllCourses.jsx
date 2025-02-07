import React, { useEffect, useState } from 'react';
import homestyle from '../HomeScreen/homeStyle';
import { useDispatch, useSelector } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';
import { UserData } from '../userData/UserData';
import { RecentCourseData } from '../HomeScreen/store';
import { HomeScreenSakelton } from '../HomeScreen/HomeScreenSakelton';
import CourseCard from '../Common/CourseCard';

const AllCourses = ({ navigation }) => {
  const { usersData } = UserData();
  const { courseData, loading } = useSelector(state => state.RecentCourseData);
  const dispatch = useDispatch();


  useEffect(() => {
    if (usersData?._id) {
      dispatch(RecentCourseData(usersData._id));
    }
  }, [usersData, dispatch]);


  return (
    <View style={homestyle.container}>
      <ScrollView contentContainerStyle={homestyle.scrollViewContent}>
        {loading && (<HomeScreenSakelton />)}
        {!loading && (
          <>
            <View style={homestyle.coursesContainer}>
              <Text style={homestyle.coursesTitle}>Available Courses</Text>
              {courseData && courseData.length > 0 && (
                <ScrollView contentContainerStyle={homestyle.scrollViewContent}>
                  {courseData.map(course => (
                    <CourseCard key={course._id} course={course} navigation={navigation}/>
                    
                  ))}
                </ScrollView>
              )}
            </View>
          </>
        )}
       
      </ScrollView>
    </View>
  );
};

export default AllCourses;
