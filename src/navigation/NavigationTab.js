import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CobranzasScreen from '../screens/CobranzasScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const NavigationTab = () =>{
  return (
    <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                size = 24
                if (route.name === 'Cobranzas') {
                    iconName = focused
                    ? 'briefcase'
                    : 'briefcase-outline';
                } else if (route.name === 'Configuracion') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }
                // You can return any component that you like here!
                return <Ionicons  name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#09f',
                tabBarInactiveTintColor: 'gray',
                headerShown:false,
                toBarShowLabel:false,
                tabBarStyle: { 
                  borderTopWidth: 1, // Agrega un borde en la parte superior del tab bar
                  borderTopColor: 'gray', // Color del borde superior
                  marginBottom: 5
                },
            })}
    >
        <Tab.Screen name="Cobranzas" component={CobranzasScreen} />
        <Tab.Screen 
          options={{
            headerShown:true
          }}
          name="Configuracion" component={SettingsScreen} 
        />
    </Tab.Navigator>
  )
}

export default NavigationTab