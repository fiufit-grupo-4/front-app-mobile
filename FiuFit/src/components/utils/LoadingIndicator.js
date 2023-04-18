import React from 'react';
import {ActivityIndicator, StyleSheet, View,Text} from 'react-native';


const LoadingIndicator = () => {
    return (   
        <View style={styles.container}>
            <Text style={styles.text} > Loading </Text>
            <ActivityIndicator size="large" color = "black"/>
            
        </View>
    );

};

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    margin: 25,
  }
});

export default LoadingIndicator;