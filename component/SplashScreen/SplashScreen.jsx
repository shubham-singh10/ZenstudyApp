import React from 'react';
import { Image, View } from 'react-native';
import componentscss from './style';

const SplashScreen = () => {
  return (
    <View style={componentscss.splash}>
      <Image source={require('../../assets/logo.png')} style={componentscss.logo} />
    </View>
  );
};

export default SplashScreen;
