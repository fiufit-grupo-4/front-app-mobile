import React from 'react';
import CustomIconButton from './CustomIconButton';
import {GoogleSignin,} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';


const SocialSignInButtons = () => {
  const navigation = useNavigation();

  const onSignInGoogle = async () => {
    
    try {
      console.log('onSignInGoogle');
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user_signin = await auth().signInWithCredential(googleCredential);
      console.log('Inicio de sesión exitoso:', user_signin);
      console.log("User: ", user_signin.additionalUserInfo);

      let user = {
        "picture" : user_signin.additionalUserInfo.profile.picture,
        "name":user_signin.additionalUserInfo.profile.given_name ,
        "lastname": user_signin.additionalUserInfo.profile.family_name,
        "mail": user_signin.additionalUserInfo.profile.email, 
      }
      navigation.navigate('GoogleSignUp',{user : user})

    } catch (error) {
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
