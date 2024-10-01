import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Animated, PanResponder, StyleSheet } from 'react-native';
import { auth } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';  // For local storage

const Home = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;

  // Track the position of the box
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      // Set current offset before drag starts
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      // After the user releases the gesture, store the new offset permanently
      pan.flattenOffset();  // This ensures the box stays at the new position
    }
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedName = await AsyncStorage.getItem('userName');
        if (storedEmail && storedName) {
          setUserEmail(storedEmail);
          setUserName(storedName);
        }

        // Start the text animation
        Animated.timing(opacity, {
          toValue: 1,  // Fully visible
          duration: 2000,
          useNativeDriver: true,
        }).start();
      } catch (e) {
        console.error('Failed to load user data from local storage', e);
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
      <Animated.Text style={[styles.title, { opacity }]}>
        Welcome, {userName}!
      </Animated.Text>
      <Text style={styles.email}>Your email: {userEmail}</Text>

      <Button title="Logout" onPress={handleLogout} />

      {/* Draggable Box */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      >
        <Text style={styles.boxText}>Drag Me!</Text>
      </Animated.View>
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
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
