import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'

import Main from './pages/Main'
import Exchange from './pages/Exchange'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'

const Stack = createMaterialBottomTabNavigator();

function Routes () {
  return (
    <Stack.Navigator   
      initialRouteName="Main"
      activeColor="#FFF952"
      inactiveColor="#FFF"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: '#193C58' }}>

    <Stack.Screen 
      name="Início" 
      component={ Main }
      options={{
        tabBarLabel: 'Início',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="home" size={25} color={color} />
        ),
      }}
    />

    <Stack.Screen 
      name="Explorar" 
      component={ Explore }
      options={{
        tabBarLabel: 'Explorar',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="search" size={25} color={color} />
        ),
      }} 
    />

    <Stack.Screen 
      name="Trocar" 
      component={ Exchange } 
      options={{
        tabBarLabel: 'Trocar',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="compare-arrows" size={25} color={color} />
        ),
      }} 
    />

    <Stack.Screen 
      name="Notificações" 
      component={ Notifications } 
      options={{
        tabBarLabel: 'Notificações',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="notifications" size={25} color={color} />
        ),
      }}
    />

    <Stack.Screen 
      name="Perfil" 
      component={ Profile }
      options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={25} />
        ),
      }}
    />

    </Stack.Navigator>
  )
}

export default Routes