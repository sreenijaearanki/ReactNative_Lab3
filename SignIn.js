import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import the sign-in method
import { auth } from './firebase';  // Import the initialized auth object

const SignIn = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(() => {
        navigation.navigate('Home');  // Navigate to Home screen on successful sign-in
      })
      .catch(error => {
        Alert.alert("Sign In Failed", error.message);  // Display error message if sign-in fails
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
