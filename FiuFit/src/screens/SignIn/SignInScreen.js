import React from "react";
import { View,Text, Image,StyleSheet } from "react-native";
import Logo from "../../../assets/images/fiufit.png"
import CustomInput from "../../components/CustomInput";

const SignInScreen = () =>{
    return (
        <View style= {styles.root}>
            <Image source={Logo} style= {styles.logo}  resizeMode="contain" />
            <CustomInput/>
            <Text> Sign In Screen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    root:{
      alignItems:"center",
      padding:20  
    },
    logo: {
        width:"70%",
        maxWidth:300,
        height:400,
        
    }
})
export default SignInScreen