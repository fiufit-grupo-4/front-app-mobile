import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import Logo from '../../components/utils/Logo';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import styles from '../../styles/styles';

const ConfirmCodeScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
    }
  });

  const navigation = useNavigation();

  const onSubmitPressed = () => {
    navigation.navigate('NewPassword');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };



  return (
      <View style={styles.root}>
        <Logo/>

        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput
          name= "code"
          placeholder="Validation Code"
          control={control}
          rules = {{required:"Validation Code is required"}}
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


export default ConfirmCodeScreen;