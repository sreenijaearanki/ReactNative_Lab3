import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Import the sign-up method
import { auth } from './firebase';  // Import the initialized auth object

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        navigation.navigate('Home');  // Navigate to Home screen on successful sign-up
      })
      .catch(error => {
        Alert.alert("Sign Up Failed", error.message);  // Display error message if sign-up fails
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
