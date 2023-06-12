import React from 'react';
import CustomIconButton from './CustomIconButton';
import { firebase } from '../../config/firebase';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = async () => {
    
    try {
      console.log('onSignInGoogle');
      await GoogleSignin.hasPlayServices();
      // await GoogleSignin.signOut();
      const { idToken } = await GoogleSignin.signIn();
  
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        const user_signin = await auth().signInWithCredential(googleCredential);
        console.log('Inicio de sesión exitoso:', user_signin);
        console.log("User email: ", user_signin.user.email);
    } catch (error) {
        console.log('Error desconocido:', error);
    }
  };

  return (
    <>
      {/* 
      <CustomIconButton
        text="Sign In with Facebook "
        onPress={onSignInFacebook}
        bgColor="#3b5998"
        fgColor="white"
        icon= "logo-facebook"
        iconColor="white"
      />
      */}
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
