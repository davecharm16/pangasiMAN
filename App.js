import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,  { useEffect, useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './routes/authStack';

export default function App() {
  const [fontsLoaded] = useFonts({
	'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
	'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
	'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
	'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
	'Mont-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
	'Mont-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
	async function prepare() {
	  await SplashScreen.preventAutoHideAsync();
	}
	
	prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
	if (fontsLoaded) {
	  await SplashScreen.hideAsync();
	}
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
	return null;
  }
  
  return (
	<SafeAreaView style ={{flex: 1}} onLayout={onLayoutRootView}>
	{/* <View style={styles.container}> */}
		<Navigation/>
		{/* <DrawerStack/> */}
	{/* </View> */}
	{/* <StatusBar style = "auto"/> */}
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
});
