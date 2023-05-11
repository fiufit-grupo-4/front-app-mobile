import React from 'react';
import {View, Text,StyleSheet,ActivityIndicator} from 'react-native';
import Logo from '../../components/utils/Logo';

export const HomeTab = () => {
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

