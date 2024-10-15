import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import { Text, View } from 'react-native';
import ImagePickerScreen from './ImagePickerScreen';
import LocationScreen from './LocationScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUp';
import LandingPage from './LandingPage';
import { auth } from './firebase'; // Import Firebase authentication

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Image Picker" component={ImagePickerScreen} />
      <Drawer.Screen name="Location" component={LocationScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);  // User is signed in
      } else {
        setIsLoggedIn(false); // User is signed out
      }
      setLoading(false); // Stop loading once auth state is determined
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; // Loading spinner or placeholder while loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "HomeDrawer" : "LandingPage"}>
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeDrawer"
          component={HomeDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
