import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './LandingPage';  // Import LandingPage
import SignUp from './SignUp';  // Import SignUp
import SignIn from './SignIn';  // Import SignIn
import Home from './Home';  // Import Home

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} />  {/* Landing page */}
        <Stack.Screen name="SignUp" component={SignUp} />  {/* SignUp page */}
        <Stack.Screen name="SignIn" component={SignIn} />  {/* SignIn page */}
        <Stack.Screen name="Home" component={Home} />  {/* Home page */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
