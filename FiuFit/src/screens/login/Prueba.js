import React, { useEffect } from 'react';
import { View, Button,Image,Dimensions } from 'react-native';
import CustomIconButton from '../../components/buttons/CustomIconButton';;
import styles from '../../styles/styles';
import FiuFitLogo from '../../../assets/images/fiticon.png';
import { firebase } from '../../config/firebase';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WEB_CLIENT,ANDROID_ID,EXPO_CLIENT_ID} from '../../utils/constants';
import { set } from 'react-native-reanimated';
const {height} = Dimensions.get("window")



WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const [user, setUser] = React.useState(null);
  const [request,response,promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_ID,
    webClientId:WEB_CLIENT,
    expoClientId: EXPO_CLIENT_ID
  })

  useEffect(() => {
    handleSignIn()
  }, []);


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
    try {
      if (response?.type === 'success') {
        console.log(response)
        getUserInfo(response.authentication.accessToken)
  
      }else {
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
      <Image
          source={FiuFitLogo}
          style={ {width: "80%", height: height * 0.2,marginTop:10}}
          resizeMode="contain"
      />
      {user ? (
        <Button title="Sign Out" onPress={handleSignOut} />
      ) : (
        <>
            <CustomIconButton
                text="Sign In with Google "
                onPress={() => {promptAsync()} }
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
  };*/