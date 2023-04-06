import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Dimensions,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import {Ionicons} from 'react-native-vector-icons';
import {LinearGradient} from "expo-linear-gradient"
import {styles,styles_gradient} from "../styles/main"
const {width,height} = Dimensions.get("window")


const Main = () =>{
    return(
    <View style={styles.container}>
      <Text style = {styles.appTitle}> <Ionicons name="bicycle-outline" size={75} color="white" /> FiuFit   </Text>
      <Text style = {styles.title}> Bienvenido</Text>
      <Text style = {styles.subTitle}> Inicia sesión con tu cuenta </Text>
      <TextInput
        placeholder='Email'
        style={styles.input}
      />
      
      <TextInput
        placeholder='Contraseña'
        style={styles.input}
        secureTextEntry = { true }
        rightIcon = {
          <Icon
            type = "material-community"
            name = "eye-outline"
          />
        }
      />

      <Text style = {styles.forgotPassword}> ¿Olvido su Contraseña? </Text>
      
      <TouchableOpacity style= {styles_gradient.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['black', 'black']}
                style={styles_gradient.button}>
                <Text style={styles_gradient.text}> Iniciar sesión </Text> 
            </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style= {styles_gradient.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#3b5998', '#3b5998']}
                style={styles_gradient.button}>
                <Text style={styles_gradient.text}> Iniciar sesión con Facebook <Ionicons name="logo-facebook" size={15} color="white" /> </Text> 
            </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style= {styles_gradient.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['crimson', 'crimson']}
                style={styles_gradient.button}>
                <Text style={styles_gradient.text}> Iniciar sesión con Google <Ionicons name="logo-google" size={15} color="white" /> </Text> 
            </LinearGradient>
      </TouchableOpacity>
      
      <StatusBar style="auto" />

      <Text style = {styles.forgotPassword}> Crear una cuenta </Text>
    </View>

    )

}




export default Main
