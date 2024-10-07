import React, {Fragment, useEffect, useState} from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './component/Login/login';
import OtpVerificationScreen from './component/OTP Screen/OtpVerificationScreen';
import SignupScreen from './component/SignUp/SignupScreen';
import HomeScreen from './component/HomeScreen/HomeScreen';
import MainHeader from './component/MainHeader';
import Footer from './component/Footer';
import ProfileScreen from './component/Profile/ProfileScreen';
import LiveScreen from './component/LiveClass/LiveScreen';
import MyCourses from './component/myCourseScreen/myCourseScreen';
import SplashScreen from './component/SplashScreen/SplashScreen';
import EditScreen from './component/EditScreen/EditScreen';
import SupportScreen from './component/SupportScreen/SupportScreen';
import ForgotScreen from './component/ForgotPassword/ForgotScreen';
import CourseDetail from './component/CourseDetail/CourseDetailScreen';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {handleLogout} from './component/Login/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WatchCourse from './component/WatchCourse/WatchCourse';

const Stack = createNativeStackNavigator();

const AppStack = ({onLogout}: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen name="profileScreen" options={{headerShown: false}}>
        {props => <ProfileScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>

      <Stack.Screen
        name="liveScreen"
        component={LiveScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="myCourseScreen"
        component={MyCourses}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="editScreen"
        component={EditScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="courseDetail"
        component={CourseDetail}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="watchCourse"
        component={WatchCourse}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="supportScreen"
        component={SupportScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AuthStack = ({setIsLoggedIn}: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="loginScreen" options={{headerShown: false}}>
        {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
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
        name="forgotPassword"
        component={ForgotScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [navigationState, setNavigationState] = useState<
    NavigationState | undefined
  >(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkUserLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setIsLoggedIn(true);
      }
    };

    checkUserLogin();
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
      {text: 'Cancel', style: 'cancel'},
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
            <AuthStack setIsLoggedIn={setIsLoggedIn} />
          )}

          {isNavigationReady && shouldShowBottomNavigation() && <Footer />}
        </Fragment>
      )}
    </NavigationContainer>
  );
}

export default App;
