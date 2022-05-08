import * as React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Homescreen from './components/Homescreen';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import ClassIcon from './components/Class';
import Contacts from './components/Contacts';
import Chat from './components/Chat';
// import ClassDashboard from './components/ClassDashboard';

// const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const Stack = createNativeStackNavigator();

// function Navbar() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//         <Tab.Screen name="Home" component={Homescreen} />
//         <Tab.Screen name="Login" component={Login} />
//         <Tab.Screen name="UserDashboard" component={UserDashboard} />
//     </Tab.Navigator>
//   )
// }

function App() {
  return (
    <NavigationContainer
      theme={navTheme}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ClassIcon" component={ClassIcon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
