import { StatusBar } from 'expo-status-bar';
import React,  { useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Login from './screens/login';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
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
      <View style={styles.container}>
        <Login/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
