import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../components/inputs/CustomInput';
import CustomButton from '../components/buttons/CustomButton';
import Logo from '../components/utils/Logo';
import {useNavigation} from '@react-navigation/native';

const ConfirmCodeScreen = () => {
  const [code, setCode] = useState('');

  const navigation = useNavigation();

  const onSubmitPressed = () => {
    navigation.navigate('NewPassword');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = () => {
    console.warn('onResendPress');
  };


  return (
      <View style={styles.root}>
        <Logo/>

        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput placeholder="Code" value={code} setValue={setCode} />


        <CustomButton text="Submit" onPress={onSubmitPressed} />

        <CustomButton
          text="Resend Code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />

      </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex:1,
    padding: 20,
    backgroundColor:"skyblue",
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
});

export default ConfirmCodeScreen;