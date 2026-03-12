import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthProvider, AuthContext } from "./AuthContext";

import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import AccountScreen from "./AccountScreen";

const Tab = createBottomTabNavigator();

function MainApp(){

  const { user } = useContext(AuthContext);

  if(!user){
    return <LoginScreen/>
  }

  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Explorer" component={HomeScreen}/>
        <Tab.Screen name="Account" component={AccountScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App(){
  return(
    <AuthProvider>
      <MainApp/>
    </AuthProvider>
  )
}