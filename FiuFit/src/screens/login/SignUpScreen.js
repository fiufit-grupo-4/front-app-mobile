import React, {useState,useEffect} from 'react';
import {View, Text, Switch,StyleSheet,Dimensions,Image,ScrollView,TouchableOpacity,PermissionsAndroid} from 'react-native';
import CustomInput from '../../components/inputs/CustomInput';
import CustomPassword from '../../components/inputs/CustomPassword';
import CustomButton from '../../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { PasswordVisibility } from '../../utils/PasswordVisibility';
import {useForm} from 'react-hook-form';
import LoadingIndicator from '../../components/utils/LoadingIndicator';
import styles from '../../styles/styles';
import {Ionicons} from 'react-native-vector-icons'
import FiuFitLogo from '../../../assets/images/fiticon.png';
import * as Location from 'expo-location';
import {ATHLETE,TRAINER, API_GATEWAY } from '../../utils/constants';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import { firebase } from '../../config/firebase';
import ApiClient from "../../client/Client"

const {height} = Dimensions.get("window")
const validator = require('validator');

const SignUpScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
        PasswordVisibility();
    const [isAthlete, setIsAthlete] = useState(true); 

    const toggleSwitch = () => {
        setIsAthlete(previousState => !previousState); 
    };


    async function getLocation() {
        let res = await requestLocationPermission()
        if (res) {
            let loc = await Location.getCurrentPositionAsync({})
            return {"latitude": loc.coords.latitude,"longitude":loc.coords.longitude};
        }
        return null
    }

    async function requestLocationPermission() {
        let status = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.log("Permiso concedido");
            return true
        } else {
            console.log("Permiso denegado");
            return false
        }   

    }

    const [location, setLocation] = useState(null);

    const navigation = useNavigation();

    function getRole(){
        return isAthlete ? ATHLETE : TRAINER
    }

    const onRegisterPressed = async (data) => {
        let res = await getLocation()
        console.log(location)
        setLoading(true)
        setError(false)
        let response = await ApiClient.signUp(data,getRole(),res)
        setLoading(false)
        if (!response.ok) {
            console.log(response.status)
            setError(true)
            if (response.status ==  409) {
                setErrorMessage("User email already in use")
            }else {
                setErrorMessage("Failed to connect with server")
            }  
        } else {
            navigation.navigate('ConfirmPhone',{phone : data.phone_number});
        }        
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');

    };

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            mail: 'dante@fi.uba.ar',
            password: '1234',
            repeatPassword:'1234',
            phone_number: "+5491161637747",
            name: "Joven",
            lastname: "Entrenador",
            age: "27"
        }
    });

    const pwd = watch("password")

    const validateEmail = (email) => {
        return validator.isEmail(email)
    };

    const validateNumber = (number) => {
        return validator.isInt(number,{min:0})
    };


    const validatePhoneNumber = (phoneNumber) => {
        return validator.isMobilePhone(phoneNumber)
    };


    const onSignUpGoogle = async () => {
            try {
              const provider = new firebase.auth.GoogleAuthProvider();
          
              const { user: firebaseUser } = await firebase.auth().signInWithPopup(provider);
          
              // Crea el usuario en tu base de datos con los datos de Firebase
              const userData = {
                googleUserId: firebaseUser.uid,
                email: firebaseUser.email,
                // Otros datos que desees almacenar
              };
          
              // Envía los datos al backend para el registro
              await fetch('TU_URL_DEL_ENDPOINT_DE_REGISTRO', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });
          
              // El registro es exitoso, puedes redirigir o hacer otras acciones
              console.log('Registro exitoso:', firebaseUser);
            } catch (error) {
              // Manejo de errores
              console.log('Error de registro:', error);
            }
          
      };
    

    return (

        <View style={styles.root}>
            

            {loading
                ? <>
                    <Image
                        source={FiuFitLogo}
                        style={ {width: "80%", height: height * 0.2,marginTop:10}}
                        resizeMode="contain"
                    />
                    <LoadingIndicator/>
                  </>
                : <>
                    <Image
                        source={FiuFitLogo}
                        style={ {width: "60%", height: height * 0.1,marginTop:10}}
                        resizeMode="contain"
                    />
                <Text style={[styles.title]}>Create an Account</Text>
                <ScrollView >
                    <View style={{alignItems:"center",width:"100%"}}>
                    <CustomInput
                        name= "mail"
                        placeholder="Email"
                        control={control}
                        icon={"mail-outline" }
                        rules = {{
                            required:"This field is Required",
                            validate : value => validateEmail(value) || "Not a valid email address",
                        }}
                        otherError={error}
                        width={"100%"}
                    />

                    <CustomInput
                        name= "name"
                        placeholder="Name"
                        control={control}
                        icon={"person-outline"}
                        rules = {{required:"This field is Required"}}
                        otherError={error}
                        width={"100%"}
                    />

                    <CustomInput
                        name= "lastname"
                        placeholder="Last Name"
                        control={control}
                        icon={"person-outline"}
                        rules = {{required:"This field is Required"}}
                        otherError={error}
                        width={"100%"}
                    />

                    <CustomInput
                        name= "age"
                        placeholder="Age"
                        control={control}
                        icon={"fitness"}
                        rules = {{
                            required:"This field is Required",
                            validate: value => validateNumber(value) || "Not a valid number"
                        }}
                        otherError={error}
                        width={"100%"}
                        keyboardType='numeric'
                    />

                    <CustomInput
                        name= "phone_number"
                        placeholder="Phone number"
                        control={control}
                        icon={"call-outline"}
                        width={"100%"}
                        rules = {{
                            required:"This field is Required",
                            validate: value => validatePhoneNumber(value) || "Not a valid phone number"}}
                            otherError={error}
                    />


                    <CustomPassword
                        name="password"
                        placeholder="Password"
                        control={control}
                        passwordVisibility={passwordVisibility}
                        handlePasswordVisibility={handlePasswordVisibility}
                        rightIcon={rightIcon}
                        rules = {{required:"This field is Required"}}
                        otherError={error}
                        width={"100%"}
                    />


                    <CustomPassword
                        name="repeatPassword"
                        placeholder="Repeat your password"
                        control={control}
                        passwordVisibility={passwordVisibility}
                        handlePasswordVisibility={handlePasswordVisibility}
                        rightIcon={rightIcon}
                        rules = {{
                            required:"This field is Required",
                            validate: value => value === pwd || "Passwords do not match"
                        }}
                        otherError={error}
                        width={"100%"}
                    />

                    
                    <View style={[signUpStyles.container, isAthlete ? {} : {backgroundColor:"orange"} ]}>
                        <Ionicons name={isAthlete ? 'basketball' : 'bicycle'} style= {signUpStyles.icon} size ={25}/>
                        < Text style={[signUpStyles.text,isAthlete ? {color: "#708090"} : {color:"black"}]}  >
                            Choose your role:
                        </Text>
                        < Text style={signUpStyles.label}  >
                            {isAthlete ? 'Athlete' : 'Trainer'}
                        </Text>
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isAthlete}
                            thumbColor={isAthlete ? '#ffffff' : '#000000'}
                            trackColor={{ true: '#000000', false: '#ffffff' }}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                        />
                    </View>
                    
                    <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)}  containerWidth="100%" />
                    {error && (
                        <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
                    )}

                    <CustomIconButton
                            text="Sign Up with Google "
                            onPress={onSignUpGoogle}
                            bgColor="crimson"
                            fgColor="white"
                            icon= "logo-google"
                            iconColor="white"
                            containerWidth="100%"
                    />

                    <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPress}
                        type="TERTIARY"
                       
                    />
                    </View>
                </ScrollView>
                   
                </>
            }
        </View>

    );
};

export default SignUpScreen;


const signUpStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:"#AFC5E3",
        width: '100%',
        borderRadius: 15,
        padding:5,
        margin:5,
        height:45
    },
    label: {
        fontSize: 15,
        fontWeight:"bold",
    },
    text: {
        fontSize: 15,
        marginRight:10,
        marginLeft:5
    },
    icon: {
        color: "#222831",
        alignItems:"center",
        paddingHorizontal:5
    },
});
