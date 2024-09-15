import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(loginData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Username" onChangeText={(value) => handleChange('username', value)} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(value) => handleChange('password', value)} />
      <Button title="Sign In" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default SignIn;
