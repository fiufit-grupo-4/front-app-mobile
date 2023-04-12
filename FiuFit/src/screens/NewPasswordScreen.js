import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import CustomPassword from '../components/inputs/CustomPassword';
import Logo from '../components/utils/Logo';
import {useNavigation} from '@react-navigation/native';
import { PasswordVisibility } from '../components/utils/PasswordVisibility';

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
    PasswordVisibility();

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
          placeholder="Enter your new password"
          value={newPassword}
          setValue={setNewPassword}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
        />

        <CustomPassword
          placeholder="Confirm your new password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
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
