// components/VideoPlayer.js

import React from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const VideoPlayer = ({ sourceUri }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      )}
      <Video
        source={{ uri: sourceUri }}
        style={styles.video}
        controls
        resizeMode="contain"
        onLoadStart={() => setLoading(true)}
        onReadyForDisplay={() => setLoading(false)}
        onError={(e) => console.log('Video error:', e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: (width * 9) / 16, // 16:9 aspect ratio
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default VideoPlayer;
