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
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          // do log out

            const popAction = StackActions.pop(1);
            props.navigation.dispatch(popAction);
        }}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions ={{
        headerTintColor : '#fff',
        headerStyle: {
          backgroundColor: '#05445E',
        }
      }}
    >
      <Drawer.Screen name="Profile" component={Profile} options = {{
        headerTintColor : '#fff',
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
      
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}

export default MyDrawer;
