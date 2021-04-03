import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'

import Main from './pages/Main'
import Exchange from './pages/Exchange'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Book from './pages/Book'

const Stack = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

function Routes () {
  return (
    <Stack.Navigator   
      initialRouteName="Main"
      activeColor="#FFF952"
      inactiveColor="#FFF"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: '#193C58' }}
      >

    <Stack.Screen 
      name="Início"
      component={ HomeStackScreen }
      options={{
        name: 'Início',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="home" size={25} color={color} />
        )
      }}
    />

    <Stack.Screen 
      name="Explorar" 
      component={ ExploreStackScreen }
      options={{
        tabBarLabel: 'Explorar',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="search" size={25} color={color} />
        ),
      }} 
    />

    <Stack.Screen 
      name="Trocar" 
      component={ ExchangeStackScreen } 
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

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#193C58'
          },
          headerTintColor: '#fff',
      }}>
      <HomeStack.Screen 
        name="Home" 
        component={Main} 
        options={{
          title:'Início',
          headerTitleStyle: {
          textAlign: 'center',
        },
      }} />
      <HomeStack.Screen 
        name="Explorar" 
        component={Explore} 
        options={{
          title:'Pesquisar',
          headerTitleStyle: {
          textAlign: 'center',
        },
      }} />
      <HomeStack.Screen 
        name="Book" 
        component={Book} 
        options={{
          title:'Visualizar livro',
          headerTitleStyle: {
            textAlign: 'center',
        },
      }} />
  </HomeStack.Navigator>
);

const ExploreStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#193C58'
          },
          headerTintColor: '#fff',
      }}>
      <HomeStack.Screen 
        name="Explorar" 
        component={Explore} 
        options={{
          title:'Pesquisar',
          headerTitleStyle: {
          textAlign: 'center',
        },
      }} />
  </HomeStack.Navigator>
);

const ExchangeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#193C58'
          },
          headerTintColor: '#fff',
      }}>
      <HomeStack.Screen 
        name="Exhange" 
        component={Exchange}
        options={{
          title:'Trocar',
          headerTitleStyle: {
          textAlign: 'center'
        },
      }} />
      <HomeStack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          title:'Perfil',
          headerTitleStyle: {
          textAlign: 'center'
        },
      }} />
  </HomeStack.Navigator>
);