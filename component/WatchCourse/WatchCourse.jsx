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
  
  const modules = [
    {
      title: 'Module 1',
      videos: [
        { title: 'Video Name 1', url: 'https://youtube.com/shorts/dKbtm0ZAUiY?si=Rqz7M-DhYr9P3vBu', description: 'Description for Video Name 1' },
        { title: 'Video Name 2', url: 'https://youtube.com/shorts/VYlne0-cteU?si=quR6-xMx22z42vSX', description: 'Description for Video Name 2' },
        { title: 'Video Name 3', url: 'https://youtube.com/shorts/gOHJ1McBzSk?si=T9Rc39dUrQjGSw7j', description: 'Description for Video Name 3' },
      ],
    },
    {
      title: 'Module 2',
      videos: [
        { title: 'Video Name A', url: 'https://youtube.com/shorts/dKbtm0ZAUiY?si=Rqz7M-DhYr9P3vBu', description: 'Description for Video Name A' },
        { title: 'Video Name B', url: 'https://youtube.com/shorts/VYlne0-cteU?si=quR6-xMx22z42vSX', description: 'Description for Video Name B' },
        { title: 'Video Name C', url: 'https://youtube.com/shorts/gOHJ1McBzSk?si=T9Rc39dUrQjGSw7j', description: 'Description for Video Name C' },
      ],
    },
    {
      title: 'Module 3',
      videos: [
        { title: 'Video Name A', url: 'https://youtube.com/shorts/dKbtm0ZAUiY?si=Rqz7M-DhYr9P3vBu', description: 'Description for Video Name A' },
        { title: 'Video Name B', url: 'https://youtube.com/shorts/VYlne0-cteU?si=quR6-xMx22z42vSX', description: 'Description for Video Name B' },
        { title: 'Video Name C', url: 'https://youtube.com/shorts/gOHJ1McBzSk?si=T9Rc39dUrQjGSw7j', description: 'Description for Video Name C' },
      ],
    },
  ];

  const [activeVideo, setActiveVideo] = useState(modules[0].videos[0].url);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(0);
  const [moduleVideoIndexes, setModuleVideoIndexes] = useState(
    Array(modules.length).fill(0) 
  );

  const handleModuleSelect = (index) => {
    if (expandedModuleIndex === index) {
      setExpandedModuleIndex(null); 
    } else {
      setExpandedModuleIndex(index); 
      const lastSelectedVideoIndex = moduleVideoIndexes[index];
      setActiveVideo(modules[index].videos[lastSelectedVideoIndex].url); 
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
            modules[activeModuleIndex]?.videos[activeVideoIndex]?.description || ""
          }
        </Text>

        {
        /* Module Section */
        }
        {modules.map((module, moduleIndex) => (
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
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: '#054bb4',
                  }}
                ></View>{' '}
                {module.title}
              </Text>
            </TouchableOpacity>
            {expandedModuleIndex === moduleIndex && (
              <View style={courseStyle.videoList}>
                {module.videos.map((video, videoIndex) => (
                  <TouchableOpacity
                    key={videoIndex}
                    onPress={() =>
                      handleVideoSelect(video.url, videoIndex, moduleIndex)
                    }
                  >
                    <Text
                      style={[
                        courseStyle.videoItem,
                        moduleVideoIndexes[moduleIndex] === videoIndex &&
                          courseStyle.activeVideoItem, 
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
