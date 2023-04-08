import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Logo from '../components/Logo';
import {useNavigation} from '@react-navigation/native';

const NewPasswordScreen = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigation = useNavigation();

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

        <CustomInput
          placeholder="Enter your new password"
          value={newPassword}
          setValue={setNewPassword}
        />

        <CustomInput
          placeholder="Confirm your new password"
          value={newPassword}
          setValue={setNewPassword}
        />

        <CustomButton text="Submit" onPress={onSubmitPressed} />

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

export default NewPasswordScreen;
