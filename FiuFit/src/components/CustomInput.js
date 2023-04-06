import React from "react";
import { View,Text, Image,StyleSheet,TextInput } from "react-native";


const CustomInput = () =>{
    return (
        <View style= {styles.container}>
            <TextInput placeholder="email" style ={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:"white",
      width:"90%",
      borderWidth:1,
      borderRadius:15,
      borderColor:"black",
      marginVertical:10,
      height:30,
      alignItems: 'center',
    },
    input: {
        borderWidth : 1,
        borderColor : "black",
        padding : 10,
        paddingStart: 15,
        width : "80%",
        marginTop : 30,
        borderRadius:20,
        backgroundColor:"royalblue",
    }
})

export default CustomInput