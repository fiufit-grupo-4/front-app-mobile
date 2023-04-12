import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../components/inputs/CustomInput';
import CustomButton from '../components/buttons/CustomButton';
import Logo from "../components/utils/Logo"
import {useNavigation} from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate('ConfirmCode');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
      <View style={styles.root}>
        <Logo/>
        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />

        <CustomButton text="Send" onPress={onSendPressed} />

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
    marginBottom:20
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
});

export default ForgotPasswordScreen;
