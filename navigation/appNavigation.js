import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {

  const [fontsLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
      'Montserrat-ThinItalic': require('../assets/fonts/Montserrat-ThinItalic.ttf'),
      'Montserrat-ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
      'Montserrat-ExtraLightItalic': require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
      'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-LightItalic': require('../assets/fonts/Montserrat-LightItalic.ttf'),
      'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
      'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
      'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-SemiBoldItalic': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
      'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
      'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
      'Montserrat-ExtraBoldItalic': require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
      'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
      'Montserrat-BlackItalic': require('../assets/fonts/Montserrat-BlackItalic.ttf'),
    })
    .then(() => {
      setFontLoaded(true)
    });
  }, []);

  if(!fontsLoaded){
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name='Movie' options={{headerShown: false}} component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;

const styles = StyleSheet.create({});