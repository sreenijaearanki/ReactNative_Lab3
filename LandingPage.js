import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
});

export default LandingPage;
