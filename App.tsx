import React from 'react';
import LoginScreen from './component/Login/login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SliderComponent from './component/Login/CarouselSlider';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
