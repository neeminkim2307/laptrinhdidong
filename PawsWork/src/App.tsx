import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các màn hình
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import PetsScreen from './screens/PetsScreen';
import CalendarScreen from './screens/CalendarScreen';
import BookingFormScreen from './screens/BookingFormScreen';
import WalletScreen from './screens/WalletScreen';
import DiaryScreen from './screens/DiaryScreen';
import MoreScreen from './screens/MoreScreen';
import AddPetScreen from './screens/AddpetScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import SecurityScreen from './screens/SecurityScreen';
import PetDetailScreen from './screens/PetDetailScreen ';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Pets" component={PetsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="BookingForm" component={BookingFormScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Diary" component={DiaryScreen} />
        <Stack.Screen name="More" component={MoreScreen} />
        <Stack.Screen name="AddPet" component={AddPetScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="PetDetail" component={PetDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}