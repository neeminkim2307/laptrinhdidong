import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import các màn hình của bạn
import Onboarding from './Screens/Onboarding';
import HomeScreen from './Screens/Home';
import DetailScreen from './Screens/DetailScreen'; // <--- 1. IMPORT MỚI

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <--- 2. THÊM MÀN HÌNH MỚI VÀO STACK ---> */}
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}