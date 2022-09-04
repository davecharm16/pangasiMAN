import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import SignUp from '../screens/signup';
// import MyDrawer from '../../ReviewsApp/routes/drawer';
import MyDrawer from './drawerStack';

const Stack = createNativeStackNavigator();

function Navigation() {

  const [isSignedIn, setSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen
          name="Home"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;