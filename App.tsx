import React, { Fragment, useContext, useEffect, useState } from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Third party
import { useDispatch } from 'react-redux';

//Context
import { AuthProvider, AuthContext } from './Context/AuthContext'; // Import the AuthContext

//Components
import Footer from './component/Footer';
import SplashScreen from './component/SplashScreen/SplashScreen';
import MainHeader from './component/MainHeader';
import LoginScreen from './component/Login/login';
import HomeScreen from './component/HomeScreen/HomeScreen';
import { handleLogout } from './component/Login/store';
import LiveScreen from './component/LiveClass/LiveScreen';
import ProfileScreen from './component/Profile/ProfileScreen';
import MyCourses from './component/myCourseScreen/myCourseScreen';
import EditScreen from './component/EditScreen/EditScreen';
import CourseDetail from './component/CourseDetail/CourseDetailScreen';
import WatchCourse from './component/WatchCourse/WatchCourse';
import SupportScreen from './component/SupportScreen/SupportScreen';
import OtpVerificationScreen from './component/OTP Screen/OtpVerificationScreen';
import SignupScreen from './component/SignUp/SignupScreen';
import ForgotScreen from './component/ForgotPassword/ForgotScreen';

const Stack = createNativeStackNavigator();

const AppStack = ({ onLogout }: any) => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="profileScreen" options={{ headerShown: false }}>
      {props => <ProfileScreen {...props} onLogout={onLogout} />}
    </Stack.Screen>

    <Stack.Screen
      name="liveScreen"
      component={LiveScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="myCourseScreen"
      component={MyCourses}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="editScreen"
      component={EditScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="courseDetail"
      component={CourseDetail}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="watchCourse"
      component={WatchCourse}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="supportScreen"
      component={SupportScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator >
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="loginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="otpScreen"
      component={OtpVerificationScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="signupScreen"
      component={SignupScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="forgotPassword"
      component={ForgotScreen}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [navigationState, setNavigationState] = useState<
    NavigationState | undefined
  >(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('userData');
      if (user) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, [setIsLoggedIn]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowBottomNavigation = () => {
    const currentRoute = navigationState?.routes[navigationState.index]?.name;
    return ![
      'otpScreen',
      'loginScreen',
      'signupScreen',
      'forgotPassword',
    ].includes(currentRoute ?? '');
  };

  const handleLog = () => {
    Alert.alert('Logout Confirmation', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(handleLogout());
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  return (
    <NavigationContainer
      onReady={() => setIsNavigationReady(true)}
      onStateChange={setNavigationState}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Fragment>
          {isNavigationReady && shouldShowBottomNavigation() && <MainHeader />}
          {isLoggedIn ? (
            <AppStack onLogout={handleLog} />
          ) : (
            <AuthStack />
          )}

          {isNavigationReady && shouldShowBottomNavigation() && <Footer />}
        </Fragment>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
