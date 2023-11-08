import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from '../screens/LoginScreen'

const Tab = createBottomTabNavigator();

const AuthNav = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Login" component={LoginPage} options={{ tabBarStyle: { display: 'none' }}}/>
    </Tab.Navigator>
  )
}

export default AuthNav
