import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView,ActivityIndicator} from 'react-native';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import Logo from "../../components/utils/Logo"
import {useNavigation} from '@react-navigation/native';
import {useForm,Controller} from 'react-hook-form';
import styles from '../../styles/styles';
import { API_GATEWAY } from '../../utils/constants';
import ApiClient from "../../client/Client"

const validator = require('validator');

const ForgotPasswordScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
    }
  });

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSendPressed = async (data) => {
    var url = API_GATEWAY + 'login/forgot_password';
    setLoading(true)
    setError(false)
    let response = await ApiClient.sendEmailToResetPassword(data)
    setLoading(false)
    if (!response.ok) {
        setError(true)
        if(response.status == 404){
          setErrorMessage("User does not exist")
        } else {
          setErrorMessage("Failed to connect with server")
        }
    } else {
      navigation.navigate('ConfirmCode',{mail : data.email});
    }

    /*
    fetch(url   , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
          "mail": data.email
        })
    }).then(response => {
      console.log(JSON.stringify(response))
        setLoading(false)
        if (!response.ok) {
            setError(true)
            if(response.status == 404){
              setErrorMessage("User does not exist")
            } else {
              setErrorMessage("Failed to connect with server")
            }
        } else {
          navigation.navigate('ConfirmCode',{mail : data.email});
        }
    })
    .catch(error => {
        setError(true)
        setErrorMessage(error)
    })*/
    
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const validateEmail = (email) => {
    return validator.isEmail(email)
  };

  return (
      <View style={styles.root}>
        <Logo/>
        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput
          name= "email"
          placeholder="Email"
          control={control}
          icon={"mail-outline" }
          rules = {{
            required:"This field is Required", 
              validate : value => validateEmail(value) || "Not a valid email",
            }}
        />

        {loading 
          ? <View style={{marginTop:10}}>
                <ActivityIndicator size="large" color = "black"/>
            </View>
          :<CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />
        }

        {error && (
            <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
        )}

        

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
  );
};


export default ForgotPasswordScreen;
