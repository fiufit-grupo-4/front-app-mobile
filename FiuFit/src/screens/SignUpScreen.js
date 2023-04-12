import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomInput from '../components/inputs/CustomInput';
import CustomPassword from '../components/inputs/CustomPassword';
import CustomButton from '../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Logo from '../components/utils/Logo';
import { PasswordVisibility } from '../components/utils/PasswordVisibility';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
    PasswordVisibility();

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');

  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
      <View style={styles.root}>
        <Logo/>

        <Text style={styles.title}>Create an Account</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          icon={"person-outline"}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail}  icon={"mail-outline"}/>
        
        <CustomPassword
          placeholder="Password"
          value={password}
          setValue={setPassword}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}

        />

        <CustomPassword
          placeholder="Repeat your Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}

        />

        <CustomButton text="Register" onPress={onRegisterPressed} />
        <View style={styles.container} > 
          <Text style={styles.text}>
            By registering, you confirm that you accept our{' '}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>
              Terms of Use
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={onPrivacyPressed}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
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
  },
  container: {
    width: '85%',
    padding: 5,
    alignItems: 'center',
    borderRadius: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  text: {
    color: 'black',
    marginVertical: 10,
  },
  link: {
    color: 'forestgreen',
  },
});

export default SignUpScreen;
