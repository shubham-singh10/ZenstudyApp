import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import { DownArrow, UpArrow } from '../Icons/MyIcon';
import { PurchaseWatchCourseData } from './store';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';

const WatchCourse = ({ route }) => {
  const { courseId } = route.params;
  const dispatch = useDispatch();

  const { courseData, loading, error } = useSelector(
    state => state.PurchaseWatchCourseData,
  );

  const [activeVideo, setActiveVideo] = useState(courseData[0].videos[0].videoUrl);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(0);
  const [moduleVideoIndexes, setModuleVideoIndexes] = useState(
    Array(courseData.length).fill(0)
  );

  const handleModuleSelect = (index) => {
    if (expandedModuleIndex === index) {
      setExpandedModuleIndex(null);
    } else {
      setExpandedModuleIndex(index);
      const lastSelectedVideoIndex = moduleVideoIndexes[index];
      setActiveVideo(courseData[index].videos[lastSelectedVideoIndex].url);
      setActiveVideoIndex(lastSelectedVideoIndex);
    }
  };

  const handleVideoSelect = (url, videoIndex, moduleIndex) => {
    setActiveVideo(url);
    setActiveVideoIndex(videoIndex);
    setActiveModuleIndex(moduleIndex);

    const newModuleVideoIndexes = [...moduleVideoIndexes];
    newModuleVideoIndexes[moduleIndex] = videoIndex;
    setModuleVideoIndexes(newModuleVideoIndexes);
  };

  useEffect(() => {
    dispatch(PurchaseWatchCourseData(courseId));
  }, [dispatch, courseId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Text style={courseStyle.errorText}>
        Failed to load watch details. Please try again.
      </Text>
    );
  }
  return (
    <ScrollView contentContainerStyle={courseStyle.scrollContainer}>
      <View style={courseStyle.container}>
        {/* Video Section */}
        <Text style={courseStyle.title}>Introduction</Text>
        <View style={courseStyle.videoContainer}>
          <WebView
            style={courseStyle.iframe}
            source={{ uri: activeVideo }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            mediaPlaybackRequiresUserAction={false}
          />
        </View>

        {/* About Video Section */}
        <Text style={courseStyle.subtitle}>About Video</Text>
        <Text style={courseStyle.description}>
          {
            courseData[activeModuleIndex]?.videos[activeVideoIndex]?.videoDescription || ''
          }
        </Text>

        {
          /* Module Section */
        }
        {(courseData && courseData.length > 0) && (courseData.map((module, moduleIndex) => (
          <View key={moduleIndex} style={courseStyle.moduleContainer}>
            <TouchableOpacity
              onPress={() => handleModuleSelect(moduleIndex)}
              style={[
                courseStyle.moduleHeader,
                expandedModuleIndex === moduleIndex && courseStyle.activeModuleHeader,
              ]}
            >
              <Text
                style={[
                  courseStyle.moduleTitle,
                  expandedModuleIndex === moduleIndex && courseStyle.activeModuleTitle,
                ]}
              >
                <View
                  style={courseStyle.bulletPoint}
                />{' '}
                {module.moduleTitle}
              </Text>
              {expandedModuleIndex === moduleIndex ? (
                <UpArrow fill="#054bb4" />
              ) : (
                <DownArrow fill="#054BB4" />
              )}
            </TouchableOpacity>
            {expandedModuleIndex === moduleIndex && (
              <View style={courseStyle.videoList}>
                {module.videos.map((video, videoIndex) => (
                  <TouchableOpacity
                    key={videoIndex}
                    onPress={() =>
                      handleVideoSelect(video.videoUrl, videoIndex, moduleIndex)
                    }
                  >
                    <Text
                      style={[
                        courseStyle.videoItem,
                        moduleVideoIndexes[moduleIndex] === videoIndex &&
                        courseStyle.activeVideoItem,
                      ]}
                    >
                      {video.videoTitle}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )))}
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
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  iframe: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d6efd',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
  },
  moduleContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#e6f0fe',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeModuleHeader: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  bulletPoint: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#054bb4',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  activeModuleTitle: {
    color: '#0d6efd',
  },
  videoList: {
    paddingLeft: 10,
    marginTop: 10,
  },
  videoItem: {
    fontSize: 14,
    color: '#333',
    lineHeight: 25,
  },
  activeVideoItem: {
    color: '#0d6efd',
    fontWeight: 'bold',
  },
});

export default WatchCourse;
