import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from './firebase'; // Import Firebase authentication

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate('LoginScreen'); // Redirect to LoginScreen after logout
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
