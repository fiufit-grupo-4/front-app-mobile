import { useState } from 'react';
import * as Location from 'expo-location';

export async function getLocation() {
    let res = await requestLocationPermission()
    if (res) {
        let loc = await Location.getCurrentPositionAsync({})
        return {"latitude": loc.coords.latitude,"longitude":loc.coords.longitude};
    }
    return null
}

async function requestLocationPermission() {
    let status = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        console.log("Permiso concedido");
        return true
    } else {
        console.log("Permiso denegado");
        return false
    }   

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
  
    return Math.round(distancia);
  }
  
  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

export function distance (myDistance,userDistance){
    let myLat = myDistance ? myDistance.latitude : 0
    let myLon = myDistance ? myDistance.longitude: 0
    let otherLat = userDistance?  userDistance.latitude : 0
    let otherLon = userDistance ?  userDistance.longitude : 0
    return calcularDistancia(
        myLat,
        myLon,
        otherLat,
        otherLon
    )    
}

    

