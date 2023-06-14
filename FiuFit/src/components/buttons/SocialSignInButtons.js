import React from 'react';
import CustomIconButton from './CustomIconButton';
import {GoogleSignin,} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {API_GATEWAY,USER} from "../../utils/constants"
import AsyncStorage from '@react-native-async-storage/async-storage';


const SocialSignInButtons = ({setLoading,setError,setErrorMessage}) => {
  const navigation = useNavigation();

  const onSignInGoogle = async () => {
    
    try {
      console.log('onSignInGoogle');
      await GoogleSignin.signOut();
      
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user_signin = await auth().signInWithCredential(googleCredential);
      console.log('Inicio de sesión con Google exitoso:', user_signin);
      let user = {
        "picture" : user_signin.additionalUserInfo.profile.picture,
        "name":user_signin.additionalUserInfo.profile.given_name ,
        "lastname": user_signin.additionalUserInfo.profile.family_name,
        "mail": user_signin.additionalUserInfo.profile.email, 
      }
      setLoading(true)
      let url = API_GATEWAY + "login/google"
      let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },body: JSON.stringify({       
          "mail": user.mail,    
        })
      })

      if (!response.ok){
          setLoading(false)
          setError(true)
          console.log(response.status)
          if(response.status == 401) setErrorMessage("Invalid username or password")
          else setErrorMessage("Failed to connect with server")
      } else {
        if (response.status == 206) {
          setLoading(false)
          navigation.navigate('GoogleSignUp',{user : user})
        } else {
          let json = await response.json()
          const user_info = JSON.stringify(json)
          await AsyncStorage.setItem(USER,user_info)
          setLoading(false)
          navigation.navigate("Inicio")
        }
      }
    

    } catch (error) {
        setError(true)
        setErrorMessage(error.toString())
        console.log('Error desconocido:', error);
    }
  };

  return (
    <>
      <CustomIconButton
        text="Sign In with Google "
        onPress={onSignInGoogle}
        bgColor="crimson"
        fgColor="white"
        icon= "logo-google"
        iconColor="white"
      />
    </>
  );
};

export default SocialSignInButtons;
