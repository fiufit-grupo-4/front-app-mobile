import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';


const LocationScreen = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  const handleFindLocation = async () => {
    console.log(address)
    try {
        const result = await Location.geocodeAsync(address);
        setLocation(result[0]);
    } catch (error) {
        Alert.alert('Error', 'No se pudo obtener la ubicación.');
    }
  };

  return (
    <View style = {{flex:1,padding:20,margin:20,alignContent:"center",justifyContent:"center"}}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleAddressChange}
        value={address}
      />
      <Button
        title="Buscar ubicación"
        onPress={handleFindLocation}
      />
      <View style={styles.container}>
        <MapView initialRegion={{
                    latitude: -34.5853315,
                    longitude: -58.4965212,
                }}
                style={styles.map} />
      </View>
    {location && (
        <View>
        <Text>Latitud: {location.latitude}</Text>
        <Text>Longitud: {location.longitude}</Text>
        </View>
    )}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      
      justifyContent:"center",
      alignContent:"center",
      alignItems:"center",
      width:"100%",
      height:300
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

export default LocationScreen;

/*

"coords": Object {
    "accuracy": 13.508999824523926,
    "altitude": 43.400001525878906,
    "altitudeAccuracy": 1,
    "heading": 0,
    "latitude": -34.5853315,
    "longitude": -58.4965212,
    "speed": 0,
  },


*/