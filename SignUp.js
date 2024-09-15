import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birthdate: new Date(),
    country: '',
    gender: '',
    biography: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || formData.birthdate;
    setShowDatePicker(Platform.OS === 'ios');
    setFormData({ ...formData, birthdate: currentDate });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => handleChange('email', value)} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(value) => handleChange('password', value)} />
      <TextInput style={styles.input} placeholder="Name" onChangeText={(value) => handleChange('name', value)} />

      {/* DatePicker */}
      <View>
        <Button title="Select Birthdate" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={formData.birthdate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        {/* Display the selected date below the date picker */}
        <Text style={styles.dateText}>
          {`Selected Date of Birth: ${formData.birthdate.toLocaleDateString()}`}
        </Text>
      </View>

      <TextInput style={styles.input} placeholder="Country" onChangeText={(value) => handleChange('country', value)} />
      <TextInput style={styles.input} placeholder="Gender" onChangeText={(value) => handleChange('gender', value)} />
      <TextInput style={styles.input} placeholder="Biography" multiline numberOfLines={4} onChangeText={(value) => handleChange('biography', value)} />

      <Button title="Sign Up" onPress={handleSubmit} />
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
  dateText: {
    marginTop: 12,
    fontSize: 16,
    color: 'gray',
  },
});

export default SignUp;
