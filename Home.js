import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from './firebase';  // Firebase auth import
import AsyncStorage from '@react-native-async-storage/async-storage';  // For local storage

const Home = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedName = await AsyncStorage.getItem('userName');
        if (storedEmail && storedName) {
          setUserEmail(storedEmail);
          setUserName(storedName);
        }
      } catch (e) {
        console.error("Failed to load user data from local storage", e);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('SignIn');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userName}!</Text>
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
