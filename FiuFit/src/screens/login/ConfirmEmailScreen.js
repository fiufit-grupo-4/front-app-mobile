import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import Logo from '../../components/utils/Logo';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import styles from '../../styles/styles';

const ConfirmEmailScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
    }
  });

  const navigation = useNavigation();

  const onConfirmPressed = () => {
    navigation.navigate('Home');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };


  return (
      <View style={styles.root}>
        <Logo/>
        <Text style={styles.title}>Confirm your Email</Text>

        <CustomInput
          name= "code"
          placeholder="Enter your confirmation code"
          control={control}
          rules = {{required:"Confirmation Code is required"}}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
  );
};

export default ConfirmEmailScreen;
