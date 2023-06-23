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
import AsyncStorage from '@react-native-async-storage/async-storage';


GoogleSignin.configure({
  webClientId: "880473744329-ba1v2m1h1f07s3vlh27266pr6ca7svfo.apps.googleusercontent.com",
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
