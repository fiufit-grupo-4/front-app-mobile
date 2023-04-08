import React from 'react';
import CustomIconButton from '../components/CustomIconButton';

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  return (
    <>
      <CustomIconButton
        text="Sign In with Facebook "
        onPress={onSignInFacebook}
        bgColor="#3b5998"
        fgColor="white"
        icon= "logo-facebook"
        iconColor="white"
      />
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
