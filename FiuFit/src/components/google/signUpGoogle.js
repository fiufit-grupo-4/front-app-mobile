import * as React from 'react';
import CustomIconButton from '../buttons/CustomIconButton';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const googleClientId = '880473744329-ba1v2m1h1f07s3vlh27266pr6ca7svfo.apps.googleusercontent.com';

const redirectUri = makeRedirectUri({ useProxy: true });

const scopes = ['openid', 'profile', 'email'];

function GoogleSignUpButton() {
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: googleClientId,
        redirectUri,
        scopes,
        // Agrega la opción "usePKCE" para habilitar el flujo de autorización seguro.
        // Esto es recomendado para aplicaciones móviles.
        usePKCE: true,
      },
      discovery
    );
  
    React.useEffect(() => {
      if (response?.type === 'success') {
        const { authentication } = response;
        console.log(JSON.stringify(response))
        // Aquí puedes manejar la respuesta de autenticación exitosa
        // y realizar el proceso de registro de usuario en tu backend.
      }
    }, [response]);
  
    return (
        <CustomIconButton
            text="Sign Un with Google "
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