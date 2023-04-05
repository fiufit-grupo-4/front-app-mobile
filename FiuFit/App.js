import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import Svg, {Path,Defs,LinearGradient,Stop} from 'react-native-svg';
import {Ionicons} from 'react-native-vector-icons';
import ButtonGradient from "./components/ButtonGradient"

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
      />

      <Text style = {styles.forgotPassword}> ¿Olvido su Contraseña? </Text>
      <ButtonGradient/>
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
    marginTop : 10
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
    marginTop : 20
  }
});
