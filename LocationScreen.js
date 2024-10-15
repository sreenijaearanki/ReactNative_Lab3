//import React, { useState, useEffect } from 'react';
//import { View, Text, StyleSheet } from 'react-native';
//import * as Location from 'expo-location';
//import MapView, { Marker } from 'react-native-maps';
//
//export default function LocationScreen() {
//  const [location, setLocation] = useState(null);
//  const [errorMsg, setErrorMsg] = useState(null);
//  const [mapRegion, setMapRegion] = useState(null);
//
//  useEffect(() => {
//    (async () => {
//      let { status } = await Location.requestForegroundPermissionsAsync();
//      if (status !== 'granted') {
//        setErrorMsg('Permission to access location was denied');
//        return;
//      }
//
//      let location = await Location.getCurrentPositionAsync({});
//      setLocation(location);
//      setMapRegion({
//        latitude: location.coords.latitude,
//        longitude: location.coords.longitude,
//        latitudeDelta: 0.01,
//        longitudeDelta: 0.01,
//      });
//    })();
//  }, []);
//
//  return (
//    <View style={styles.container}>
//      {location ? (
//        <MapView style={styles.map} region={mapRegion} showsUserLocation={true}>
//          <Marker
//            coordinate={{
//              latitude: location.coords.latitude,
//              longitude: location.coords.longitude,
//            }}
//            title="You are here"
//          />
//        </MapView>
//      ) : (
//        <Text>Fetching location...</Text>
//      )}
//    </View>
//  );
//}
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  map: {
//    width: '100%',
//    height: '80%',
//  },
//});
//


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [address, setAddress] = useState(''); // State to store the reverse geocoded address

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get the current location (latitude and longitude)
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Set the map region to the fetched location
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Reverse geocode the location to get a human-readable address
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Extract address components from reverse geocode result
      if (reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        const formattedAddress = `${place.city}, ${place.region}, ${place.country}`;
        setAddress(formattedAddress); // Set the address in state
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            style={styles.map}
            region={mapRegion}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          </MapView>
          {/* Display the reverse geocoded address */}
          <Text style={styles.addressText}>{address}</Text>
        </>
      ) : (
        <Text>{errorMsg ? errorMsg : 'Fetching location...'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  addressText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
});
