import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homescreen from './components/Homescreen';
import Login from './components/Login';
import NewUser from './components/NewUser';
import UserDashboard from './components/UserDashboard';


const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
