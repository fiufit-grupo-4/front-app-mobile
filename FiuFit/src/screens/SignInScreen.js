import React, {useState} from 'react';
import {
  View,
  ToastAndroid,
  StyleSheet,
  Linking,
  TextInput
} from 'react-native';
import Logo from '../components/icons/Logo';
import CustomInput from '../components/inputs/CustomInput';
import CustomPassword from '../components/inputs/CustomPassword';
import CustomButton from '../components/buttons/CustomButton';
import SocialSignInButtons from '../components/buttons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { PasswordVisibility } from '../utils/PasswordVisibility';
import {useForm} from 'react-hook-form';

const URL = "https://api-gateway-fiufit.herokuapp.com/login/"
const validator = require('validator');

const SignInScreen = () => {
  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
    PasswordVisibility();


  const { control, handleSubmit, formState: { errors },watch } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSignInPressed = (data) => {
    
    var url = 'https://user-service-fiufit.herokuapp.com/login';
    let json = {
      "username": data.email,
      "password": data.password
    }
  
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(json), 
      mode : "no-cors",
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response)); 

    navigation.navigate('Home');
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

        <CustomInput
          name= "email"
          placeholder="Email"
          control={control}
          icon={"mail-outline" }
          rules = {{
            required:"Email is required",
            validate: value => validateEmail(value) || "Not a valid email"}}
        />

        <CustomPassword
          name="password"
          placeholder="Password"
          control={control}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
          rules = {{required:"Password is required"}}
        />
     

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />

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
      </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex:1,
    alignItems: 'center',
    backgroundColor:"skyblue",
    justifyContent: "center"
  }
});

export default SignInScreen;
