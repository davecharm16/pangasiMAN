import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import SignUp from '../screens/signup';
// import MyDrawer from '../../ReviewsApp/routes/drawer';
import MyDrawer from './drawerStack';
import { _getSignedIn, _setLogOut } from '../storage_async/async_function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicProfile from '../screens/public _profile';
import EditProfile from '../screens/editprofile';
import ViewJob from '../screens/viewjob';
import EditJob from '../screens/edit_job';
import ForgotPass from '../screens/forgotpass';
import AboutApp from '../screens/aboutapp';

const Stack = createNativeStackNavigator();

function Navigation() {

  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(
    () => {
    getSign();
   }
  ,[])

  const getSign = async () =>{
    const signed = await _getSignedIn();
    if( signed !== null){
      console.log( signed )
      setSignedIn( signed );
    }
    else{
      setSignedIn(false);
    }
    // AsyncStorage.clear();
  }

  // const _getSignedIn = async ()=> {
  //   try {
  //     const value = await AsyncStorage.getItem('loggedIn')
  //     if(value !== null) {
  //       // value previously stored
  //       setSignedIn(JSON.parse(value));
  //     }else{
  //       console.log("null loggeed in");
  //       setSignedIn(false);
  //     }
  //   } catch(e) {
  //     // error reading value
  //     console.log(e);
  //   }
  // }


  // function getData(){
  //   _getSignedIn();
  // }

  function LoginScreen(props){

    const onLogIn = (value) =>{
      // console.log("hey");
      setSignedIn(value);
    }

    return (
      <Login onLog = { onLogIn } navigation = {props.navigation}/>
    );
  }

  function SignUpScreen(props){
    return (
      <SignUp {...props}/>
    );
  }

  function DrawerScreenMain(){
    const onLogOut = (value) =>{
      _setLogOut();
      // console.log("call back" + value);
      setSignedIn(value);
    }

    return (<MyDrawer onLog = {onLogOut}/>);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        {
          isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={DrawerScreenMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="PublicProfile" component={PublicProfile} options={
                { headerShown: true,
                  headerTitle: "Public Profile", 
                  headerTintColor : '#fff',
                  headerStyle: {
                  backgroundColor: '#05445E',
                  }
                }
              } />
            <Stack.Screen name="EditProfile" component={EditProfile} options={
                { headerShown: true,
                  headerTitle: "Edit Profile", 
                  headerTintColor : '#fff',
                  headerStyle: {
                  backgroundColor: '#05445E',
                  }
                }
              } />
            <Stack.Screen name="ViewJob" component={ViewJob} 
            options={
              { headerShown: true,
                headerTintColor : '#fff', 
                headerTitle: "",
                headerStyle: {
                backgroundColor: '#05445E',
                }
              } 
            } />
            <Stack.Screen name="EditJob" component={EditJob} 
            options={
              { headerShown: true,
                headerTintColor : '#fff', 
                headerTitle: "",
                headerStyle: {
                backgroundColor: '#05445E',
                }
              } 
            } />
            <Stack.Screen name="About" component={AboutApp} 
            options={
              { headerShown: true,
                headerTintColor : '#fff', 
                headerTitle: "About",
                headerStyle: {
                backgroundColor: '#05445E',
                }
              } 
            } />
          </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
              <Stack.Screen name="Signup" component={SignUpScreen} options={{headerShown: false}} />
              <Stack.Screen name="ForgotPass" component={ForgotPass} options={
              { headerShown: true,
                headerTintColor : '#fff', 
                headerTitle: "Forgot Password",
                headerStyle: {
                backgroundColor: '#05445E',
                }
              } 
            } />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;