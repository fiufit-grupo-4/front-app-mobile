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

const {height} = Dimensions.get("window")
const validator = require('validator');

const SignUpScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
        PasswordVisibility();
    const [isAthlete, setIsAthlete] = useState(true); // Estado inicial del botón

    const toggleSwitch = () => {
        setIsAthlete(previousState => !previousState); // Cambia el estado del botón
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
    const [errorMsg, setErrorMsg] = useState(null);


    const navigation = useNavigation();

    function getRole(){
        console.log(isAthlete)
        return isAthlete ? ATHLETE : TRAINER
    }

    const onRegisterPressed = async (data) => {
        var url = API_GATEWAY + 'signup/';
        let res = await getLocation()
        setLocation(res)
        setLoading(true)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                "mail": data.mail,
                "password": data.password,
                "phone_number": data.phone_number,
                "role":getRole(),
                "name": data.name,
                "lastname": data.lastname,
                "age":data.age,
                "location":location
            })
            })
            .then(response => {
                setLoading(false)
                if (!response.ok) {
                    setError(true)
                    setErrorMessage("Failed to connect with server")
                } else {
                    
                    navigation.navigate('ConfirmEmail',{phone : data.phone_number});
                }
            })
            .catch(error => {
                setError(true)
                setErrorMessage(error)
            })
        
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');

    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            mail: 'dante@fi.uba.ar',
            password: '1234',
            repeatPassword:'1234',
            phone_number: "+5491161637747",
            name: "Dante",
            lastname: "420",
            age: "24"
        }
    });

    const pwd = watch("password")

    const validateEmail = (email) => {
        return validator.isEmail(email)
    };

    const validatePhoneNumber = (phoneNumber) => {
        return validator.isMobilePhone(phoneNumber)
    };

    return (

        <View style={styles.root}>
            <Image
                source={FiuFitLogo}
                style={ {width: "80%", height: height * 0.2,marginTop:10}}
                resizeMode="contain"
            />

            {loading
                ? <LoadingIndicator/>
                : <>
                <Text style={styles.title}>Create an Account</Text>
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
                        rules = {{required:"This field is Required"}}
                        otherError={error}
                        width={"100%"}
                    />

                    <CustomInput
                        name= "phone_number"
                        placeholder="Phone number"
                        control={control}
                        icon={"call-outline"}
                        width={"100%"}
                        rules = {{
                            required:"This field is Required",
                            validate: value => validatePhoneNumber(value) || "Not an valid phone number"}}
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
                    </View>
                    </ScrollView>
                    <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
                    {error && (
                        <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
                    )}

                {/* 
                    <View style={[styles.container]} >
                        <Text style={styles.text}>
                            By registering, you confirm that you accept our{' '}
                            <Text style={styles.link} onPress={onTermsOfUsePressed}>
                                Terms of Use
                            </Text>{' '}
                            and{' '}
                            <Text style={styles.link} onPress={onPrivacyPressed}>
                                Privacy Policy
                            </Text>
                            .
                        </Text>
                    </View>*/}

                    <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPress}
                        type="TERTIARY"
                    />
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

{/*
import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Permiso para acceder a la ubicación',
        'message': 'Se necesita acceso a la ubicación para poder mostrar tu posición actual'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permiso concedido");
    } else {*/

}