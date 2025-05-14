import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

const VideoPlayer = ({ videopath, thumbnailUrl }) => {
  const [cookiesSet, setCookiesSet] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    const getSignedCookies = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/zenstudy/api/app/get-signed-url?videoPath=${encodeURIComponent(videopath)}`,
          { credentials: 'include' } // Ensure cookies are handled
        );
        if (!response.ok) {
          throw new Error('Failed to get signed cookies');
        }
        setCookiesSet(true);
      } catch (error) {
        console.error('Error fetching signed cookies:', error);
      }
    };

    getSignedCookies();

    // Unlock orientation on unmount
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, [videopath]);

  const manifestUrl = `https://${process.env.REACT_APP_CLOUDFRONT_DOMAIN}/${videopath}/index.m3u8`;

  const handleFullscreenChange = (isFullscreen) => {
    if (isFullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  if (!cookiesSet) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        ref={playerRef}
        source={{ uri: manifestUrl }}
        controls
        poster={thumbnailUrl}
        posterResizeMode="cover"
        resizeMode="contain"
        fullscreenAutorotate
        fullscreenOrientation="landscape"
        onFullscreenPlayerWillPresent={() => handleFullscreenChange(true)}
        onFullscreenPlayerWillDismiss={() => handleFullscreenChange(false)}
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default VideoPlayer;
