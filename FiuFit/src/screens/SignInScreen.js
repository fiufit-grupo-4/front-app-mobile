import React, {useState} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Logo from '../components/utils/Logo';
import CustomInput from '../components/inputs/CustomInput';
import CustomPassword from '../components/inputs/CustomPassword';
import CustomButton from '../components/buttons/CustomButton';
import SocialSignInButtons from '../components/buttons/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import { PasswordVisibility } from '../components/utils/PasswordVisibility';

const validator = require('validator');

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
    PasswordVisibility();

  const onSignInPressed = () => {
    //console.log(validator.isEmail(username))
    console.log(passwordVisibility)
    console.log(rightIcon)
    navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
      <View style={styles.root}>
        <Logo/>

        <CustomInput
          placeholder="Email"
          value={username}
          setValue={setUsername}
          icon={"mail-outline"}
        />

        <CustomPassword
          placeholder="Password"
          value={password}
          setValue={setPassword}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}

        />

        <CustomButton text="Sign In" onPress={onSignInPressed} />

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
