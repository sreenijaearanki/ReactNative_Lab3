import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from './firebase';  // Firebase auth import

const Home = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if a user is signed in
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);  // Set the user's email
    }
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('SignIn');  // Navigate to SignIn after logout
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <Text style={styles.email}>Your email: {userEmail}</Text>
      <Button title="Logout" onPress={handleLogout} />
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
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Home;
