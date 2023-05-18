import React from 'react';
import CustomIconButton from './CustomIconButton';
import { firebase } from '../../config/firebase';


const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = async () => {
    
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const { user: firebaseUser } = await firebase.auth().signInWithPopup(provider);
    
        // El inicio de sesión es exitoso, puedes redirigir o hacer otras acciones
        console.log('Inicio de sesión exitoso:', firebaseUser);
      } catch (error) {
        // Manejo de errores
        console.log('Error de inicio de sesión:', error);
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
