import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { StackActions } from '@react-navigation/native';
import JobFeed from '../screens/jobfeed';
import Profile from '../screens/profile';
import { _setUser } from '../storage_async/async_function';
import CreateJob from '../screens/createjob';
import AppliedJobs from '../screens/view_applied';
import { View } from 'react-native';

// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//     </View>
//   );
// }

// function Article() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Article Screen</Text>
//     </View>
//   );
// }

function CustomDrawerContent(props) {
  return (
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props}
      contentContainerStyle = {{flex: 1, justifyContent : 'space-between'}}
    >
      <View style = {{backgroundColor : '#fff'}}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => {
            // do log out
            //unsetting the user
            _setUser('{}');
            props.onLog(false);
          }}
        />
      </View>
      <View>
        <DrawerItem
          label = "About the App"
          onPress = {
            ()=>{
              console.log("I'm Pressed About");
              props.navigation.navigate('About');
            }
          }
        />
      </View>
    </DrawerContentScrollView>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  const func = (value)=>{
    props.onLog(value);
  }
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} onLog={func}/>}
      screenOptions ={{
        headerTintColor : '#fff',
        headerStyle: {
          backgroundColor: '#05445E',
        }
      }}
      initialRouteName ="Jobs"
    >
      <Drawer.Screen name="Profile" component={Profile} options = {{
        headerTintColor : '#fff',
        headerTitle: "Your Profile",
        headerStyle: {
          backgroundColor: '#05445E',
        }
      }}
      />
      <Drawer.Screen name="Jobs" component={JobFeed} options = {{
        headerTintColor : '#fff',
        headerStyle: {
          backgroundColor: '#05445E',
        }
      }}
      />
      <Drawer.Screen name="Create Job Offer" component={CreateJob} options = {{
          headerTintColor : '#fff',
          headerStyle: {
            backgroundColor: '#05445E',
          },
          headerTitle: "Create Job",
        }}
      />
      <Drawer.Screen name="Applied Jobs" component={AppliedJobs} options = {{
          headerTintColor : '#fff',
          headerStyle: {
            backgroundColor: '#05445E',
          },
          headerTitle: "Applied Jobs",
        }}
      />
      {/* Create create job offer Screen */}
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}

export default MyDrawer;
