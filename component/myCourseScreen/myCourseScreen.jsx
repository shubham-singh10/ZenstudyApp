import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import myCourseStyle from './myCourseStyle';
import { PurchaseCourseData } from './store';
import { UserData } from '../userData/UserData';
import Loader from '../Loader';
import { NotFound } from '../Icons/MyIcon';
import CourseCard from './components/CourseCard';
import LiveCourseCard from './components/LiveCourseCard';

const MyCourses = ({ navigation }) => {
  const dispatch = useDispatch();
  const { usersData } = UserData();
  const { recordedCourses, liveCourses, loading, error } = useSelector(state => state.PurchaseCourseDetails);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (usersData?._id) {
        await dispatch(PurchaseCourseData(usersData._id));
        setDataFetched(true);
      }
    };
    fetchData();
  }, [dispatch, usersData]);

  const noCourses =
    dataFetched &&
    (!recordedCourses || recordedCourses.length === 0) &&
    (!liveCourses || liveCourses.length === 0);

  if (loading && !recordedCourses && !liveCourses) {
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

  if (noCourses) {
    return (
      <View style={myCourseStyle.noCourseContainer}>
        <MaterialIcons name="shopping-cart" size={50} color="#5f63b8" />
        <Text style={myCourseStyle.noCourseText}>No Purchased Courses</Text>
        <Text style={myCourseStyle.noCourseSubText}>Explore and purchase courses to get started!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={myCourseStyle.scrollContainer}>
      {recordedCourses?.length > 0 && (
        <>
          <Text style={myCourseStyle.title}>Recorded Courses</Text>
          {recordedCourses.map(course => (
            <CourseCard key={course._id} course={course} navigation={navigation} />
          ))}
        </>
      )}

      {liveCourses?.length > 0 && (
        <>
          <Text style={myCourseStyle.title}>Live Courses</Text>
          {liveCourses.map(course => (
            <LiveCourseCard key={course._id} course={course} navigation={navigation} />
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default MyCourses;
