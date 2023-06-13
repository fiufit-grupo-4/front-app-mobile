import React, { useEffect } from 'react';
import {View, Text,StyleSheet} from 'react-native';
import Logo from '../../components/utils/Logo';

export const HomeTab = () => {
    useEffect(() => {
      
      getDeviceToken();
    }, []); 

    const getDeviceToken = () => {
      await requestUserPermission();
      const token = await messaging().getToken();
      fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.access_token,
        },
        body: JSON.stringify({
            "devicetoken" : token
        })
      }).then((response) => {})
      .catch((error) => {console.log(error)})
    }

    return (
        <View style ={styles.root}>

            <Text style ={{fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                margin: 10,
                marginBottom:20}}>Bienvenido a FiuFit</Text>
            <Logo></Logo>
              
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
      flex:1,
      alignItems: 'center',
      padding: 30,
      backgroundColor:"#f6f6f6",
      
    },
    container: {
      width: '85%',
      padding: 5,
      alignItems: 'center',
      borderRadius: 15,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      margin: 10,
      marginBottom:20
    },

  });

