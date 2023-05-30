import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Switch,
} from 'react-native';
import Logo from '../../components/utils/Logo';
import CustomInput from '../../components/inputs/CustomInput';
import CustomPassword from '../../components/inputs/CustomPassword';
import CustomButton from '../../components/buttons/CustomButton';
import SocialSignInButtons from '../../components/buttons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { PasswordVisibility } from '../../utils/PasswordVisibility';
import {useForm} from 'react-hook-form';
import LoadingIndicator from '../../components/utils/LoadingIndicator';
import styles from '../../styles/styles';
import {Ionicons} from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ATHLETE,TRAINER,API_GATEWAY,USER } from '../../utils/constants';
const validator = require('validator');


const SignInScreen = () => {
    //{route}
    //const{ role, bgColor, access} = route.params
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();
    const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
        PasswordVisibility();

    const [isAthlete, setIsAthlete] = useState(true); // Estado inicial del botón

    const toggleSwitch = () => {
        setIsAthlete(previousState => !previousState); // Cambia el estado del botón
    };

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: 'dante@mail.com',
            password: '1234'
        }
    });


    function getRole(){
        return isAthlete ? ATHLETE : TRAINER
    }

    const onSignInPressed = (data) => {
        var url = API_GATEWAY + 'login/';
        console.log(data)
        setLoading(true)
        setError(false)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "mail": data.email,
                "password": data.password,
                "role": getRole()
            })
        })
            .then(response => {
                setLoading(false)
                if (!response.ok) {
                    setError(true)
                    if(response.status == 401){
                        setErrorMessage("Invalid username or password")
                    } else {
                        setErrorMessage("Failed to connect with server")
                    }
                } else {
                    response.json().then(json => {
                        const user_info = JSON.stringify(json)
                        AsyncStorage.setItem(USER,user_info).then(

                            navigation.navigate("Inicio")
                        ).catch(error => {
                            setError(true)
                            setErrorMessage(error)
                        })
                        {/*
          AsyncStorage.multiSet([[TOKEN, accesToken],[ROLE, role]]).then(
            navigation.navigate("Inicio")
          ).catch(() => {
            navigation.navigate("Inicio")
          })*/}
                    }).catch(error => {
                        setError(true)
                        setErrorMessage(error)
                    })

                }
            })
            .catch(error => {
                setError(true)
                setErrorMessage(error)
            })

    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    const validateEmail = (email) => {
        return validator.isEmail(email)
    };

    return (
        <View style={styles.root}>
            <Logo/>
            <Text style={styles.title} >Welcome to FiuFit</Text>
            {loading
                ? <LoadingIndicator/>
                : <>
                    <CustomInput
                        name= "email"
                        placeholder="Email"
                        control={control}
                        icon={"mail-outline" }
                        rules = {{
                            required:"Email is Required",
                            validate: value => validateEmail(value) || "Not a valid email address",
                        }}
                        otherError={error}
                    />
                    <CustomPassword
                        name="password"
                        placeholder="Password"
                        control={control}
                        passwordVisibility={passwordVisibility}
                        handlePasswordVisibility={handlePasswordVisibility}
                        rightIcon={rightIcon}
                        rules = {{required:"Password is Required"}}
                        otherError={error}
                    />
                    <View style={[signUpStyles.container ]}>
                        <Ionicons name={isAthlete ? 'basketball' : 'bicycle'} style= {signUpStyles.icon} size ={25}/>
                        < Text style={[signUpStyles.text]}  >
                            Sign in as:
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

                    <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />

                    {error && (
                        <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
                    )}

                    <CustomButton
                        text="Forgot password?"
                        onPress={onForgotPasswordPressed}
                        type="TERTIARY"
                    />
                    <SocialSignInButtons />

                    <CustomButton
                        text="Don't have an account? Create one"
                        onPress={onSignUpPress}
                        type="TERTIARY"
                    />
                </>
            }
        </View>
    );
};

export default SignInScreen;


const signUpStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
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
        paddingHorizontal:5,
        marginLeft:32
    },
});