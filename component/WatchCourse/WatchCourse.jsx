import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';

const WatchCourse = () => {
  // Modules structure with descriptions for the About Video section
  const modules = [
    {
      title: 'Module 1',
      videos: [
        { title: 'Video Name 1', url: 'https://www.youtube.com/embed/VIDEO_ID1', description: 'Description for Video Name 1' },
        { title: 'Video Name 2', url: 'https://www.youtube.com/embed/VIDEO_ID2', description: 'Description for Video Name 2' },
        { title: 'Video Name 3', url: 'https://www.youtube.com/embed/VIDEO_ID3', description: 'Description for Video Name 3' },
      ],
    },
    {
      title: 'Module 2',
      videos: [
        { title: 'Video Name A', url: 'https://www.youtube.com/embed/VIDEO_ID_A', description: 'Description for Video Name A' },
        { title: 'Video Name B', url: 'https://www.youtube.com/embed/VIDEO_ID_B', description: 'Description for Video Name B' },
        { title: 'Video Name C', url: 'https://www.youtube.com/embed/VIDEO_ID_C', description: 'Description for Video Name C' },
      ],
    },
  ];

  // Set the default video to the first video of the first module
  const [activeVideo, setActiveVideo] = useState(modules[0].videos[0].url);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0); // Track which video is active
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(0); // Track which module is expanded

  const handleModuleSelect = (index) => {
    // Reset to the first video of the newly opened module if it's expanded
    if (expandedModuleIndex === index) {
      setExpandedModuleIndex(null); // Close the module if it's already open
    } else {
      setExpandedModuleIndex(index); // Open the new module
      setActiveVideo(modules[index].videos[0].url); // Set the first video of the newly opened module
      setActiveVideoIndex(0); // Reset active video index to the first video
    }
  };

  const handleVideoSelect = (url, index) => {
    setActiveVideo(url);
    setActiveVideoIndex(index); // Set the active video index
  };

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
            mediaPlaybackRequiresUserAction={true}
          />
        </View>

        {/* About Video Section */}
        <Text style={courseStyle.subtitle}>About Video</Text>
        <Text style={courseStyle.description}>
          {modules[expandedModuleIndex]?.videos[activeVideoIndex]?.description || ''}
        </Text>

        {/* Module Section */}
        {modules.map((module, index) => (
          <View key={index} style={courseStyle.moduleContainer}>
            <TouchableOpacity
              onPress={() => handleModuleSelect(index)}
              style={[
                courseStyle.moduleHeader,
                expandedModuleIndex === index && courseStyle.activeModuleHeader,
              ]}
            >
              <Text
                style={[
                  courseStyle.moduleTitle,
                  expandedModuleIndex === index && courseStyle.activeModuleTitle,
                ]}
              >
                {module.title}
              </Text>               
            </TouchableOpacity>
            {expandedModuleIndex === index && (
              <View style={courseStyle.videoList}>
                {module.videos.map((video, videoIndex) => (
                  <TouchableOpacity
                    key={videoIndex}
                    onPress={() => handleVideoSelect(video.url, videoIndex)} // Change active video based on title click
                  >
                    <Text
                      style={[
                        courseStyle.videoItem,
                        activeVideoIndex === videoIndex && courseStyle.activeVideoItem, // Highlight active video title
                      ]}
                    >
                      {video.title}
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
    backgroundColor: '#f7f7f7',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeModuleHeader: {
    paddingHorizontal: 10,
    backgroundColor: '#e7f3ff', // Change background color of the active module
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Default color
  },
  activeModuleTitle: {
    color: '#0d6efd', // Active title color
  },
  videoList: {
    paddingLeft: 10,
    marginTop: 10,
  },
  videoItem: {
    fontSize: 14,
    color: '#333',
  },
  activeVideoItem: {
    color: '#0d6efd', // Change color for active video title
    fontWeight: 'bold', // Make active video title bold
  },
});

export default WatchCourse;
