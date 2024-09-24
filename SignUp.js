import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';  // Firestore functions
import AsyncStorage from '@react-native-async-storage/async-storage';  // For local storage

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const storeUserDataLocally = async (userData) => {
    try {
      await AsyncStorage.setItem('userEmail', userData.email);
      await AsyncStorage.setItem('userName', userData.name);
    } catch (e) {
      console.error("Failed to save user data to local storage", e);
    }
  };

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email
      });

      // Store user details locally using AsyncStorage
      storeUserDataLocally({ email: formData.email, name: formData.name });

      // Navigate to Home screen
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(value) => handleChange('password', value)}
      />
      <Button title="Sign Up" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SignUp;
