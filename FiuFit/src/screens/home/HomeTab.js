import React from 'react';
import {View, Text,StyleSheet} from 'react-native';

export const HomeTab = () => {
    return (
        <View styles ={styles.root}>
            <Text styles ={{fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                margin: 10,
                marginBottom:20}}>Bienvenido a FiuFit</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
      flex:1,
      alignItems: 'center',
      padding: 20,
      backgroundColor:"blue",
      justifyContent: "center"
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

