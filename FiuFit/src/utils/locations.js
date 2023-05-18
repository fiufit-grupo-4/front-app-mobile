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


export function calcularDistancia(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371;
  
    const latitud1 = degToRad(lat1);
    const longitud1 = degToRad(lon1);
    const latitud2 = degToRad(lat2);
    const longitud2 = degToRad(lon2);
  
    const diferenciaLatitud = latitud2 - latitud1;
    const diferenciaLongitud = longitud2 - longitud1;
  

    const a = Math.sin(diferenciaLatitud / 2) * Math.sin(diferenciaLatitud / 2) +
              Math.cos(latitud1) * Math.cos(latitud2) *
              Math.sin(diferenciaLongitud / 2) * Math.sin(diferenciaLongitud / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distancia = radioTierra * c;
  
    return distancia;
  }
  
  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }
    
    

