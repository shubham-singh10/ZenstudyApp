import React, {useState} from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './component/Login/login';
import OtpVerificationScreen from './component/OTP Screen/OtpVerificationScreen';
import SignupScreen from './component/SignUp/SignupScreen';
import HomeScreen from './component/HomeScreen/HomeScreen';
import MainHeader from './component/MainHeader';
import Footer from './component/Footer';
import ProfileScreen from './component/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [navigationState, setNavigationState] = useState<
    NavigationState | undefined
  >(undefined);

  const shouldShowBottomNavigation = () => {
    const currentRoute = navigationState?.routes[navigationState.index]?.name;
    return !['loginScreen', 'otpScreen', 'signupScreen'].includes(
      currentRoute ?? '',
    );
  };

  return (
    <NavigationContainer
      onReady={() => setIsNavigationReady(true)}
      onStateChange={setNavigationState}>
      <MainHeader />
      <Stack.Navigator initialRouteName="homeScreen">
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="otpScreen"
          component={OtpVerificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signupScreen"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="profileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      {isNavigationReady && shouldShowBottomNavigation() && <Footer />}
    </NavigationContainer>
  );
}

export default App;
