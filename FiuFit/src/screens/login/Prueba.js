import React, { useEffect } from 'react';
import { View, Button,Image,Dimensions,Platform,Text } from 'react-native';
import CustomIconButton from '../../components/buttons/CustomIconButton';;
import styles from '../../styles/styles';
import FiuFitLogo from '../../../assets/images/fiticon.png';
import { firebase } from '../../config/firebase';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WEB_CLIENT,ANDROID_ID,EXPO_CLIENT_ID} from '../../utils/constants';

const {height} = Dimensions.get("window")
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
//WebBrowser.maybeCompleteAuthSession()




WebBrowser.maybeCompleteAuthSession();

  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

  const config = {
    clientId: '294589327367-ijhbpgp76o4ejk9ciluefgc9actb55nl.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      scheme: 'fiufit',
    }),
    scopes: ['openid', 'profile', 'email'],
  };


export default function App() { 
  if (__DEV__ && Platform.OS === 'web') {
    const useProxy = true;
    Google.useAuthRequest({ useProxy });
  }
  const [user, setUser] = React.useState(null);
  const [request,response,promptAsync] = Google.useAuthRequest({
      androidClientId: ANDROID_ID,
      webClientId:WEB_CLIENT,
      expoClientId: EXPO_CLIENT_ID,
      prompt: 'select_account',
    },{
      projectNameForProxy: "@dantereinaudo420/FiuFit"
    },
    discovery)


  const getUserInfo = async (token) =>{
    if(!token) return
    const url = "https://www.googleapis.com/userinfo/v2/me"
    try {
      const res = await fetch(url,{
        headers: {'Authorization': 'Bearer ' + token}
      })
      const user = await res.json()
      console.log(user)
      setUser(user)
    } catch(e){
      console.log(e)
    }
  }
  

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
  };

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
  };

  return (
    <View style={styles.root}>
      
      {user ? (
        <View>

          <Image
              
              source={{uri:user.picture}}
              referrerPolicy="no-referrer"
          />

          <Text style= {{fontWeight: "bold", fontSize:20, marginBottom:20}}>{user.name }</Text>
          <Text style= {{fontWeight: "bold", fontSize:16, marginBottom:20}}>{user.email }</Text>
          
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
                onPress={() => {handleSignIn() }}
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
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleSignIn = async () => {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    console.log(redirectUri)
    const result = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${authConfig.webClientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=token&scope=openid%20profile%20email`,
    });

    if (result.type === 'success') {
      const { id_token, access_token } = result.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token, access_token);

      await firebase.auth().signInWithCredential(credential);
    }
  };

  const handleSignUp = async () => {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    const result = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${authConfig.webClientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=token&scope=openid%20profile%20email`,
    });

    if (result.type === 'success') {
      const { id_token, access_token } = result.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token, access_token);

      await firebase.auth().createUserWithCredential(credential);
    }
  };
  
  
  
  
  
  
  
  
  
  
  

// Configura los proveedores de autenticación

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId: config.clientId,
      androidClientId: ANDROID_ID,
      webClientId:WEB_CLIENT,
      expoClientId: EXPO_CLIENT_ID,
      
      prompt: 'select_account',
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      const credential = firebase.auth.GoogleAuthProvider.credential(
        authentication.accessToken
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .then((userCredential) => {
          // Inicio de sesión exitoso
          const user = userCredential.user;
          console.log('Usuario:', user);
        })
        .catch((error) => {
          // Error en el inicio de sesión
          console.error('Error en el inicio de sesión con Google:', error);
        });
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  return (
    <View style={styles.root}>
        <CustomIconButton
          text="Sign In with Google "
          onPress={() => {handleGoogleSignIn()} }
          bgColor="crimson"
          fgColor="white"
          icon= "logo-google"
          iconColor="white"
        />
    </View>
    )
  
  
  
  
  
  */