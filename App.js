import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './LandingPage';  // Import the LandingPage component
import SignUp from './SignUp';  // Import the SignUp component
import SignIn from './SignIn';  // Import the SignIn component
import Home from './Home';  // Import the Home component

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        {/* Make sure only valid components are passed as 'component' props */}
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
