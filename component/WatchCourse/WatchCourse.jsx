import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { VdoPlayerView } from 'vdocipher-rn-bridge';
import { DownArrow, UpArrow } from '../Icons/MyIcon';
import { PurchaseWatchCourseData } from './store';
import Loader from '../Loader';

const WatchCourse = ({ route }) => {
  const { courseId } = route.params;
  const dispatch = useDispatch();
  const { courseData, loading, error } = useSelector(
    state => state.PurchaseWatchCourseData,
  );

  const [playbackInfo, setPlayBackInfo] = useState('');
  const [videoCode, setVideoCode] = useState('');
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(0);
  const [moduleVideoIndexes, setModuleVideoIndexes] = useState([]);

  const embedInfo = { otp: `${videoCode}`, playbackInfo: `${playbackInfo}` };

  useEffect(() => {
    // Dispatch the action to fetch course data
    dispatch(PurchaseWatchCourseData(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    if (courseData?.length > 0) {
      // Default to the first module and first video
      setPlayBackInfo(courseData[0]?.videos?.[0]?.playBackInfo || '');
      setVideoCode(courseData[0]?.videos?.[0]?.videoCode || '');
      setActiveModuleIndex(0);
      setActiveVideoIndex(0);
      setExpandedModuleIndex(0);
      setModuleVideoIndexes(Array(courseData.length).fill(0));
    }
  }, [courseData]);

  const handleModuleSelect = (index) => {
    setExpandedModuleIndex(expandedModuleIndex === index ? null : index);
  };

  const handleVideoSelect = (videoIndex, moduleIndex, playBackInfo, videoCodeid) => {
    setPlayBackInfo(playBackInfo);
    setVideoCode(videoCodeid);
    setActiveVideoIndex(videoIndex);
    setActiveModuleIndex(moduleIndex);
    setExpandedModuleIndex(moduleIndex);

    const newModuleVideoIndexes = [...moduleVideoIndexes];
    newModuleVideoIndexes[moduleIndex] = videoIndex;
    setModuleVideoIndexes(newModuleVideoIndexes);
  };

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

  if (!courseData || courseData.length === 0) {
    return (
      <Text style={courseStyle.errorText}>
        No course data available.
      </Text>
    );
  }

  return (
    <ScrollView contentContainerStyle={courseStyle.scrollContainer}>
      <View style={courseStyle.container}>
        {/* Video Section */}
        <Text style={courseStyle.title}>Introduction</Text>
        <View style={courseStyle.videoContainer}>
          {embedInfo.otp && (
            <VdoPlayerView
              style={courseStyle.iframe}
              embedInfo={embedInfo}
            />
          )}
        </View>

        {/* About Video Section */}
        <Text style={courseStyle.subtitle}>About Video</Text>
        <Text style={courseStyle.description}>
          {
            courseData?.[activeModuleIndex]?.videos?.[activeVideoIndex]?.videoDescription || ''
          }
        </Text>

        {/* Module Section */}
        {courseData.map((module, moduleIndex) => (
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
                      handleVideoSelect(videoIndex, moduleIndex, video.playBackInfo, video.videoCode)
                    }
                  >
                    <Text
                      style={[
                        courseStyle.videoItem,
                        moduleVideoIndexes[moduleIndex] === videoIndex &&
                        activeModuleIndex === moduleIndex &&
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
        ))}
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
    color: '#000',
    lineHeight: 25,
  },
  activeVideoItem: {
    color: '#0d6efd',
    fontWeight: 'bold',
  },
});

export default WatchCourse;
