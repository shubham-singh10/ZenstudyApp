import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Language } from '../Icons/MyIcon';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsCourseData } from './store';
import WebView from 'react-native-webview';
import Loader from '../Loader';

const CourseDetail = ({ navigation, route }) => {
  const { courseId } = route.params;
  const dispatch = useDispatch();

  const { courseData, loading, error } = useSelector(
    state => state.CourseDetailData,
  );
  const firstModule = courseData?.modules?.[0];

  // Fetch course data on mount
  useEffect(() => {
    dispatch(DetailsCourseData(courseId));
  }, [dispatch, courseId]);

  // Display loading indicator while fetching data
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Text style={courseStyle.errorText}>
        Failed to load course details. Please try again.
      </Text>
    );
  }

  return (
    <ScrollView contentContainerStyle={courseStyle.scrollContainer}>
      <View style={courseStyle.container}>
        <Text style={courseStyle.title}>{courseData?.title}</Text>
        <Text style={courseStyle.text}>{courseData?.description}</Text>

        <View style={courseStyle.aboutCourse}>
          <View style={courseStyle.language}>
            <Language fill="#054bb4" />
            <Text style={courseStyle.languageText}>{courseData?.language}</Text>
          </View>
        </View>
      </View>

      <View style={courseStyle.card}>
        {firstModule && firstModule.videos?.length > 0 ? (
          <WebView
            style={courseStyle.courseImage}
            source={{
              uri: 'https://player.vimeo.com/video/995693386?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            mediaPlaybackRequiresUserAction={false}
          />
        ) : (
          <Text style={courseStyle.noVideoText}>No videos available</Text>
        )}

        <View style={courseStyle.datePriceRow}>
          <Text style={courseStyle.courseDate}>
            {courseData?.createdAt.slice(0, 10)}
          </Text>
          <Text style={courseStyle.coursePrice}>₹{courseData?.price}</Text>
        </View>

        <TouchableOpacity
          style={courseStyle.buyButton}
          onPress={() => navigation.navigate('watchCourse')}>
          <Text style={courseStyle.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      <View style={courseStyle.aboutCourseSection}>
        <Text style={courseStyle.aboutCourseTitle}>About Course</Text>

        {courseData?.other1 && (
          <View style={courseStyle.bulletPoint}>
            <View style={courseStyle.customBullet} />
            <Text style={courseStyle.bulletText}>{courseData.other1}</Text>
          </View>
        )}

        {courseData?.other2 && (
          <View style={courseStyle.bulletPoint}>
            <View style={courseStyle.customBullet} />
            <Text style={courseStyle.bulletText}>{courseData.other2}</Text>
          </View>
        )}

        <View style={courseStyle.moduleList}>
          {courseData?.modules?.map((module, index) => (
            <Module
              key={index}
              title={module.moduleTitle || `Module ${index + 1}`}
              index={index + 1}
              videoTitle={
                module.videos.length > 0 ? (
                  module.videos.map(({ num, videoTitle }) => (
                    <Text key={num} style={courseStyle.videoTitleText}>
                      {videoTitle || 'No video title available'}
                    </Text>
                  ))
                ) : (
                  <Text>No videos available</Text>
                )
              }
            />
          ))}
        </View>

      </View>
    </ScrollView>
  );
};

const Module = ({ title, index, videoTitle }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <View style={courseStyle.moduleContainer}>
      <TouchableOpacity
        style={courseStyle.moduleHeader}
        onPress={() => setIsExpanded(!isExpanded)}>
        <View style={courseStyle.moduleTitleRow}>
          <View style={courseStyle.customBullet} />
          <Text style={courseStyle.moduleTitle}>{title}</Text>
        </View>
        <Text style={courseStyle.toggleIcon}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={courseStyle.moduleContent} key={index}>
          {videoTitle}
        </View>
      )}
    </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    alignItems: 'flex-start',
    marginTop: 15,
  },
  bulletText: {
    fontSize: 16,
    color: '#494949',
    paddingHorizontal: 10,
    textAlign: 'justify',
    marginTop: -8,
  },
  customBullet: {
    width: 8,
    height: 8,
    backgroundColor: '#054bb4',
    borderRadius: 2,
    marginRight: 10,
  },

  moduleContainer: {
    backgroundColor: '#e6f0fe',
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    paddingHorizontal: 15,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleTitle: {
    fontSize: 16,
    color: '#054bb4',
    fontWeight: '500',
  },
  toggleIcon: {
    fontSize: 16,
    color: '#054bb4',
  },
  moduleContent: {
    marginTop: 10,
    paddingLeft: 15,
  },
  moduleText: {
    fontSize: 14,
    color: '#494949',
  },
  moduleList: {
    marginTop: 20,
  },
});

export default CourseDetail;
