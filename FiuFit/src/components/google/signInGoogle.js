import * as React from 'react';
import CustomIconButton from '../buttons/CustomIconButton';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const googleClientId = '880473744329-ba1v2m1h1f07s3vlh27266pr6ca7svfo.apps.googleusercontent.com';

const redirectUri = makeRedirectUri({ useProxy: true });

const scopes = ['openid', 'profile', 'email'];


function GoogleSignInButton() {
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: googleClientId,
        redirectUri,
        scopes,
      },
      discovery
    );
  
    React.useEffect(() => {
      if (response?.type === 'success') {
        const { authentication } = response;
        // Aquí puedes manejar la respuesta de autenticación exitosa
      }
    }, [response]);
  
    return (

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
    );
  }

export default GoogleSignInButton