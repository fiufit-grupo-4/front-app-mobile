import React, { useEffect,useState } from 'react';
import { View, Button,Image,Dimensions,Platform,Text } from 'react-native';
import CustomIconButton from '../../components/buttons/CustomIconButton';;
import styles from '../../styles/styles';
import FiuFitLogo from '../../../assets/images/fiticon.png';
import { firebase } from '../../config/firebase';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import { WEB_CLIENT,ANDROID_ID,EXPO_CLIENT_ID} from '../../utils/constants';

const {height} = Dimensions.get("window")
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Linking } from 'react-native';


/*

WebBrowser.maybeCompleteAuthSession();

  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };
const config = {
  expoClientId: 'TU_CLIENT_ID_DE_EXPO',
  iosClientId: 'TU_CLIENT_ID_DE_IOS',
  androidClientId: 'TU_CLIENT_ID_DE_ANDROID',
  scopes: ['https://www.googleapis.com/auth/fitness.activity.read'],
};
  const config = {
    clientId: '294589327367-ijhbpgp76o4ejk9ciluefgc9actb55nl.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      scheme: 'fiufit',
    }),
    scopes: ['openid', 'profile', 'email'],
  };*/


  
WebBrowser.maybeCompleteAuthSession();

export default function App() { 

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [fitness,setFitness] = useState(null)

  /*
  if (__DEV__ && Platform.OS === 'web') {
    const useProxy = true;
    Google.useAuthRequest({ useProxy });
  }
  const [request,response,promptAsync] = Google.useAuthRequest({
      androidClientId: ANDROID_ID,
      webClientId:WEB_CLIENT,
      expoClientId: EXPO_CLIENT_ID,
      prompt: 'select_account',
    },{
      projectNameForProxy: "@dantereinaudo420/FiuFit"
    },
    discovery)
  */


  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_ID,
    webClientId:WEB_CLIENT,
    expoClientId: EXPO_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/fitness.activity.read',
             'openid', 'profile', 'email']
    },{
      projectNameForProxy: "@dantereinaudo420/FiuFit"
  });
  
  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      console.log('Token:',response.authentication.accessToken)
      getUserInfo(response.authentication.accessToken);
      getFitnessData(response.authentication.accessToken)
    }
  }, [response]);
  
  const getUserInfo = async (token) => {
    try {
      const url = "https://www.googleapis.com/userinfo/v2/me"
      const userResponse = await fetch(url,
        { headers: { Authorization: `Bearer ${token}` }}
      );

      const user = await userResponse.json();
      console.log('Datos de User:', user);
      console.log('Picture:', user.picture);
      setUser(user);

    } catch (error) {
      console.error('Error:', error);
    }
  };


  const subscribeToSteps = async () => {
    try {
        console.log("Token: ",token)
        const response = await fetch(
          'https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.step_count.delta:com.google.android.gms:estimated_steps/subscribe',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      console.log(JSON.stringify(response))
      if (response.ok) {
        console.log('Usuario suscrito a los datos de pasos.');
      } else {
        console.error('Error al suscribir al usuario a los datos de pasos:', response.status);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getFitnessData = async (token) => {
    try {
      let url = 'https://www.googleapis.com/fitness/v1/users/me/dataSources'
      const response = await fetch( url,
        { headers: { Authorization: `Bearer ${token}`}}
      );
      const data = await response.json();
      console.log('Datos de Fitness:', data);
      setFitness(data)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
/*
  // Función para iniciar sesión con Google
  const handleSignIn = async () => {
    await promptAsync()
    try {
      if (response?.type === 'success') {
        console.log(response)
        getUserInfo(response.authentication.accessToken)
  
      } else {
        console.log(JSON.stringify(response))
        console.log("u.u")
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };*/

  // Función para registrarse con Google
  const handleSignUp = async () => {
    try {
      const { type, user } = await Google.logInAsync();

    } catch (error) {
      console.error('Error al registrarse con Google:', error);
    }
  }
  
  const handleSignOut = async () => {
    setUser(null)
    setFitness(null)
  };

 /*
  const handleSignIn = () => {
    //const redirectUrl = "https://auth.expo.io/@dantereinaudo420/FiuFit"; // Reemplaza con tu URL de redirección
    //const clientId = '294589327367-ijhbpgp76o4ejk9ciluefgc9actb55nl.apps.googleusercontent.com'; // Reemplaza con tu ID de cliente de OAuth
    const clientId = "294589327367-aeon2tuhnm69qttud2o34588qbuure7n.apps.googleusercontent.com"
    const redirectUrl = "exp://192.168.0.191:19000"
    // exp://192.168.0.191:19000
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}&response_type=code&scope=openid%20profile%20email`;
  
    Linking.openURL(url);
  };*/

  return (
    <View style={styles.root}>


      {user ? (
        <View>

          <Image
              source={{uri: user.picture}}
              style= {{width:150,height:150,borderRadius:100,marginBottom:30}}
          />

          <Text style= {{fontWeight: "bold", fontSize:20, marginBottom:20}}>{user.name }</Text>
          <Text style= {{fontWeight: "bold", fontSize:16, marginBottom:20}}>{user.email }</Text>
          
          <CustomIconButton
                text="Subscribe to steps "
                onPress={subscribeToSteps}
                bgColor="skyblue"
                fgColor="white"
                icon= "logo-google"
                iconColor="white"
            />


          <Button title="Sign Out" onPress={handleSignOut} />
        </View>
      ) : (
        <>

        <Image
                  source={FiuFitLogo}
                  style={ {width: "80%", height: height * 0.2,marginTop:10}}
                  resizeMode="contain"
              />
            <CustomIconButton
                text="Sign In with Google "
                onPress={() => {
                  promptAsync();
                }}
                bgColor="crimson"
                fgColor="white"
                icon= "logo-google"
                iconColor="white"
            />

            <CustomIconButton
                text="Sign Up with Google "
                onPress={handleSignUp}
                bgColor="crimson"
                fgColor="white"
                icon= "logo-google"
                iconColor="white"
            />
        </>
      )}
    </View>
  );




}


/*
Object {
  "email": "lecolosportif@gmail.com",
  "family_name": "Reinaudo",
  "given_name": "Dante",
  "id": "109780655109789667467",
  "locale": "es",
  "name": "Dante Reinaudo",
  "picture": "https://lh3.googleusercontent.com/a/AAcHTtdk23iI2Hnn_7-T9xgCXj4PLoyZJ5j5ayi1_LBD2Q=s96-c",
  "verified_email": true,
}
*/

/*  
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",

  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <View style={styles.container}>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <Text style={styles.text}>{userInfo.name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});*/