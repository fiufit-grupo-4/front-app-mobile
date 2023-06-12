import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';
import { firebase } from './src/config/firebase';
// import { google } from './src/utils/google';
import GoogleFit, { Scopes, ActivityType, BucketUnit } from 'react-native-google-fit'
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import 'expo-dev-client';
import { PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Pedometer } from 'expo-sensors';


GoogleSignin.configure({
  webClientId: "880473744329-ba1v2m1h1f07s3vlh27266pr6ca7svfo.apps.googleusercontent.com",
});
console.log("GoogleSignin.configured()")


//////////// SOLICITAR PERMISOS FIT //////////////

const requestActivityPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      {
        title: 'Activity Recognition Permission',
        message: 'This app would like to view your activity recognition data.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the activity recognition");
    } else {
      console.log("Activity recognition permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

//////////// PEDOMETER //////////////

Pedometer.watchStepCount(result => {
  console.log('[Pedometer].watchStepCount >>> ', result);
});


Pedometer.isAvailableAsync().then(
  result => {
    console.log('[Pedometer].isAvailableAsync >>> ', result);
  },

  error => {
    console.log('[Pedometer].isAvailableAsync >>> ', error);
  }
);
const start = new Date();
start.setHours(0, 0, 0, 0);
start.setDate(start.getDate() - 1); // DIA ANTERIOR
const end = new Date();
Pedometer.getStepCountAsync(start, end).then(
  result => {
    console.log('[Pedometer].getStepCountAsync >>> ', result);
  },
  error => {
    console.log('[Pedometer].getStepCountAsync >>> ', error);
  }
).catch(error => {
  console.log('[Pedometer].getStepCountAsync >>> ', error);
});




class App extends React.Component {
  render() {
      return (
        <SafeAreaView style={styles.root}>
          <StatusBar style="auto" />
                <Navigation/>
        </SafeAreaView>
      )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
});

export default App;
