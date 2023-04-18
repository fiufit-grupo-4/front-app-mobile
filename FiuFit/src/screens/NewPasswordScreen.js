import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import CustomPassword from '../components/inputs/CustomPassword';
import Logo from '../components/utils/Logo';
import {useNavigation} from '@react-navigation/native';
import { PasswordVisibility } from '../utils/PasswordVisibility';
import {useForm} from 'react-hook-form';
import styles from '../styles/styles';

const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
    PasswordVisibility();

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
      defaultValues: {
        password: '',
        repeatPassword:'',
      }
  });
  
  const pwd = watch("password")

  const onSubmitPressed = () => {
    navigation.navigate('Home');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
      <View style={styles.root}>
        <Logo/>

        <Text style={styles.title}>Reset your Password</Text>

        <CustomPassword
          name="password"
          placeholder="Enter your new password"
          control={control}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
          rules = {{required:"This field is Required"}}
        />

        <CustomPassword
          name="repeatPassword"
          placeholder="Confirm your new password"
          control={control}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
          rules = {{
            required:"This field is Required",
            validate: value => value === pwd || "Passwords do not match"
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
  );
};

export default NewPasswordScreen;
