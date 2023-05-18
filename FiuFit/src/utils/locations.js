import { useState } from 'react';
import * as Location from 'expo-location';

async function requestLocationPermission() {
    try {
        const status = await Location.requestForegroundPermissionsAsync()
        console.log(status)
        if (status !== 'granted') {
            console.log("Permiso concedido");
            return true
        } else {
            console.log("Permiso denegado");
            return false
        }
    } catch(err) {
        console.warn(err)
        return false
    }
}

export function getLocation(setLocation) {
    const result = requestLocationPermission();
    result.then(async res => {
        if (res) {
            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            setLocation(location);
            return true
        }
    }).catch(error => {
        console.warn(error);
        return false
    })
}

    
    

