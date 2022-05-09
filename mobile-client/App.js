/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Homescreen from './components/Homescreen';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import Contacts from './components/Contacts';
import Chat from './components/Chat';
// import ClassDashboard from './components/ClassDashboard';

const envelope = require('./assets/envelope.png');
const head = require('./assets/profile.png');
const dashboard = require('./assets/home.png');

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const Stack = createNativeStackNavigator();

function Navbar() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="UserDashboard">
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: () => (
            <Image
              source={envelope}
              style={{ width: 20, height: 20, margin: 3 }}
            />
          ) }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              source={head}
              style={{ width: 20, height: 20, margin: 3 }}
            />
          ) }}
      />
      <Tab.Screen
        name="UserDashboard"
        component={UserDashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => (
            <Image
              source={dashboard}
              style={{ width: 20, height: 20, margin: 3 }}
            />
          ) }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer
      theme={navTheme}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Navbar" component={Navbar} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
