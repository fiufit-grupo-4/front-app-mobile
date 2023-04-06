import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions,TouchableOpacity } from 'react-native';
import { Input,Icon } from 'react-native-elements';
import Svg, {Path,Defs,Stop} from 'react-native-svg';
import {Ionicons} from 'react-native-vector-icons';
import {LinearGradient} from "expo-linear-gradient"
import ButtonGradient from "./components/ButtonGradient"
import { color } from 'react-native-elements/dist/helpers';

const {width,height} = Dimensions.get("window")


export default function App() {

 /*function SvgTop(){
    return (

    )
  }*/

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle :{
    fontSize:60,
    color : "white",
    fontWeight: "bold"
  },
  title :{
    fontSize:60,
    color : "#000",
    fontWeight: "bold",
    marginTop : 20
  },
  subTitle: {
    fontSize:20,
    color : "white",
    fontWeight: "bold",
    marginTop : 10,
  },
  input:{
    borderWidth : 1,
    borderColor : "black",
    padding : 10,
    paddingStart: 15,
    width : "80%",
    marginTop : 30,
    borderRadius:20,
    backgroundColor:"powderblue",
  },
  forgotPassword:{
    fontSize:20,
    color : "black",
    fontWeight: "bold",
    marginTop : 20,
    marginBottom: 10,
  }
});

const styles_gradient = StyleSheet.create({
  container : {
      alignItems: "center",
      width: "70%",
      marginTop:10,
      borderColor:"black",
      color:"black"
  },
  button : {
      width: "90%",
      borderColor:"black",
      height: 50,
      borderRadius:30,
      padding:5,
      alignItems: "center",
      justifyContent:"center",
  },
  text: {
      fontSize:14, 
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center"
  }
});