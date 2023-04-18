import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import Logo from "../../components/utils/Logo"
import {useNavigation} from '@react-navigation/native';
import {useForm,Controller} from 'react-hook-form';
import styles from '../../styles/styles';

const validator = require('validator');

const ForgotPasswordScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
    }
  });

  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate('ConfirmCode');
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

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
  );
};


export default ForgotPasswordScreen;
