import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView,ActivityIndicator} from 'react-native';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import Logo from '../../components/utils/Logo';
import {useNavigation} from '@react-navigation/native';
import {set, useForm} from 'react-hook-form';
import styles from '../../styles/styles';
import { API_GATEWAY } from '../../utils/constants';

const ConfirmEmailScreen = ({route}) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
    }
  });

  const {phone} = route.params

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const onConfirmPressed = (data) => {
    var url = API_GATEWAY + 'signup/validate_code?';
    var query = new URLSearchParams({
      phone_number: phone,
      verification_code: data.code,
    })
    setLoading(true)
    setError(false)
    fetch(url + query  , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    }).then(response => {
      console.log(JSON.stringify(response))
        setLoading(false)
        if (!response.ok) {
            setError(true)
            if(response.status == 503){
              setErrorMessage("The verification code is invalid")
            } else {
              setErrorMessage("Failed to connect with server")
            }
        } else {
            navigation.navigate('SignIn');
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


  return (
      <View style={styles.root}>
        <Logo/>
        <Text style={styles.title}>Confirm your Account</Text>
        
        <CustomInput
          name= "code"
          placeholder="Enter your confirmation code"
          control={control}
          rules = {{required:"Confirmation Code is required"}}
        />

        {loading
          ? <View style={{marginTop:10}}>
                <ActivityIndicator size="large" color = "black"/>
            </View>
          : <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />
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

export default ConfirmEmailScreen;
