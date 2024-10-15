import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>test12</Text>  {/* Add your logic to show the real user name */}
        <Text style={styles.userEmail}>test12@gmail.com</Text>  {/* Add your logic to show the real user email */}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 16,
    color: 'white',
  },
});
