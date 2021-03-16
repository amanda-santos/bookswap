import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Routes from './src/routes'

function App() {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#193C58'/>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
}

export default App