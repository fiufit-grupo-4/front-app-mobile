import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import {LinearGradient} from "expo-linear-gradient"

export default function ButtonGradient(){
    return (
        <TouchableOpacity style= {styles.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.button}>
                <Text style={styles.text}>Iniciar Sesión</Text> 
            </LinearGradient>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container : {
        alignItems: "center",
        width: 200,
        marginTop:30
    },
    button : {
        width: "80%",
        height: 50,
        borderRadius:25,
        padding:10,
        alignItems: "center",
        justifyContent:"center",
    },
    text: {
        fontSize:14, 
        color: "#fff",
        fontWeight: "bold"
    }
});