import React, { Fragment, useContext, useEffect, useState } from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet } from 'react-native';

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
import ForgotScreen from './component/ForgotPassword/ForgotScreen';
import AllCourses from './component/AllCourseScreen/AllCourses';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import SignupScreen from './component/SignUp/SignupScreen';
import LiveCourseDetailsScreen from './component/CourseDetail/LiveCourseDetailsScreen';
import { OTPScreen } from './component/SignUpNew/OtpScreen';
import LandingScreen from './component/HomeScreen/LandingPage';
import AudioLecturesScreen from './component/HomeScreen/AudioLecturesScreen';
import CurrentAffairsScreen from './component/HomeScreen/CurrentAffairsScreen';
import TestSeriesScreen from './component/HomeScreen/TestSeriesScreen';
import VideoCoursesScreen from './component/HomeScreen/VideoCoursesScreen';
import StudyMaterialScreen from './component/HomeScreen/StudyMaterialScreen';
import DoubtSolvingScreen from './component/HomeScreen/DoubtSolvingScreen';

const Stack = createNativeStackNavigator();

const toastConfig = {
  // Custom success toast
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[ToastStyles.base, ToastStyles.success]}
      contentContainerStyle={ToastStyles.contentContainer}
      text1Style={ToastStyles.successText1}
      text2Style={ToastStyles.successText2}
    />
  ),

  // Custom error toast
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[ToastStyles.base, ToastStyles.error]}
      contentContainerStyle={ToastStyles.contentContainer}
      text1Style={ToastStyles.errorText1}
      text2Style={ToastStyles.errorText2}
    />
  ),

  // Custom info toast
  info: (props: any) => (
    <InfoToast
      {...props}
      style={[ToastStyles.base, ToastStyles.info]}
      contentContainerStyle={ToastStyles.contentContainer}
      text1Style={ToastStyles.infoText1}
      text2Style={ToastStyles.infoText2}
    />
  ),
};


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
      name="allCoursesScreen"
      component={AllCourses}
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
      name="livecourseDetail"
      component={LiveCourseDetailsScreen}
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
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="loginScreen"
      component={LandingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="loginScreenNew"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="audioLecturesScreen"
      component={AudioLecturesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="currentAffairsScreen"
      component={CurrentAffairsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="testSeriesScreen"
      component={TestSeriesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="videoCoursesScreen"
      component={VideoCoursesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="studyMaterialScreen"
      component={StudyMaterialScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="doubtSolvingScreen"
      component={DoubtSolvingScreen}
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
      name="OTP"
      component={OTPScreen}
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
      'audioLecturesScreen',
      'currentAffairsScreen',
      'testSeriesScreen',
      'videoCoursesScreen',
      'studyMaterialScreen',
      'doubtSolvingScreen',
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
          {isLoggedIn ? <AppStack onLogout={handleLog} /> : <AuthStack />}

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
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}


export const ToastStyles = StyleSheet.create({
  base: {
    borderRadius: 10,
    width: '90%',
    height: 80,
    marginHorizontal: 10,
    elevation: 5,
  },
  success: {
    borderLeftColor: '#28a745',
    backgroundColor: '#eafaf1',
  },
  successText1: {
    color: '#155724',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText2: {
    color: '#155724',
    fontSize: 15,
  },
  error: {
    borderLeftColor: '#dc3545',
    backgroundColor: '#fdecea',
  },
  errorText1: {
    color: '#721c24',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText2: {
    color: '#721c24',
    fontSize: 15,
  },
  info: {
    borderLeftColor: '#17a2b8',
    backgroundColor: '#e3f7fc',
  },
  infoText1: {
    color: '#0c5460',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText2: {
    color: '#0c5460',
    fontSize: 15,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
});
