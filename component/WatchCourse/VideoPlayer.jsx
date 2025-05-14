// components/DashVideoPlayer.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const DashVideoPlayer = ({ videoUrl, thumbnailUrl }) => {
  if (!videoUrl) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Video
      source={{ uri: videoUrl }}
      controls
      poster={thumbnailUrl}
      posterResizeMode="cover"
      resizeMode="contain"
      style={styles.video}
      automaticallyWaitsToMinimizeStalling
      onError={(e) => console.log('Video error:', e)}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#000',
  },
  loader: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashVideoPlayer;
