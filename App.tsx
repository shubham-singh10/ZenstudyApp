import React from 'react';
import LoginScreen from './component/Login/login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpVerificationScreen from './component/OTP Screen/OtpVerificationScreen';
import SignupScreen from './component/SignUp/SignupScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="loginScreen" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="otpScreen" component={OtpVerificationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="signupScreen" component={SignupScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
