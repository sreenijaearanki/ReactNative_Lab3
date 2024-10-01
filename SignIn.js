import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const loadUserEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          setLoginData({ ...loginData, email: storedEmail });
        }
      } catch (e) {
        console.error('Failed to load email from local storage', e);
      }
    };

    loadUserEmail();
  }, []);

  const handleChange = (name, value) => {
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert("Sign In Failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={loginData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(value) => handleChange('password', value)}
      />
      <Button title="Sign In" onPress={handleSubmit} />
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

export default SignIn;
