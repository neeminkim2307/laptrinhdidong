import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import tất cả các màn hình
import Splash from './Screens/Splash';
import Onboard from './Screens/Onboard';
import SignIn from './Screens/SignIn';
import NumberScreen from './Screens/Number';
import VerificationScreen from './Screens/Verification';
import SelectLocation from './Screens/SelectLocation';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import ProductDetail from './Screens/ProductDetail';
import Explore from './Screens/Explore';
import Beverages from './Screens/Beverages';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{ 
          headerShown: false, // Ẩn header mặc định để dùng header tự thiết kế
          cardStyle: { backgroundColor: '#FFFFFF' } 
        }}
      >
        {/* Luồng khởi đầu và xác thực */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Number" component={NumberScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* Luồng chính của ứng dụng */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Beverages" component={Beverages} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}