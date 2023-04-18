import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomInput from '../components/inputs/CustomInput';
import CustomPassword from '../components/inputs/CustomPassword';
import CustomButton from '../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Logo from '../components/utils/Logo';
import { PasswordVisibility } from '../utils/PasswordVisibility';
import {useForm} from 'react-hook-form';
import LoadingIndicator from '../components/utils/LoadingIndicator';

const validator = require('validator');

const SignUpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
    PasswordVisibility();

  const navigation = useNavigation();

  const onRegisterPressed = (data) => {
    var url = 'https://api-gateway-fiufit.herokuapp.com/signup/';
    console.log(data)
    setLoading(true)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "mail": data.email,
        "password": data.password
      })
    })
    .then(response => {
      setLoading(false)
      if (!response.ok) {
        setError(true)
        setErrorMessage("Failed to connect with server")    
      } else {
        navigation.navigate('ConfirmEmail');
      }
    })
    .catch(error => {
      setError(true)
      setErrorMessage(error)
    })
   
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

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      username:'',
      repeatPassword:'',
      phoneNumber: '',
    }
  });

  const pwd = watch("password")

  const validateEmail = (email) => {
    return validator.isEmail(email)
  };

  const validatePhoneNumber = (phoneNumber) => {
    return validator.isMobilePhone(phoneNumber)
  };

  return (
      <View style={styles.root}>
        <Logo/>

        {loading 
          ? <LoadingIndicator/>
          : <>
              <Text style={styles.title}>Create an Account</Text>
                {/* 
              <CustomInput
                name= "username" 
                placeholder="Username"
                icon={"person-outline"}
                control={control}
                rules = {{required:"This field is Required"}}
              />
              */}
            
              <CustomInput
                name= "email"
                placeholder="Email"
                control={control}
                icon={"mail-outline" }
                rules = {{
                  required:"This field is Required", 
                  validate : value => validateEmail(value) || "Not a valid email address",
                  }}
              />

              {/* 
              <CustomInput
                name= "phoneNumber"
                placeholder="Phone number"
                control={control}
                icon={"call-outline"}
                rules = {{
                  required:"This field is required",
                  validate: value => validatePhoneNumber(value) || "Not an valid phone number"}}
              />
              */}
            
              <CustomPassword
                name="password"
                placeholder="Password"
                control={control}
                passwordVisibility={passwordVisibility}
                handlePasswordVisibility={handlePasswordVisibility}
                rightIcon={rightIcon}
                rules = {{required:"This field is Required"}}
              />


              <CustomPassword
                name="repeatPassword"
                placeholder="Repeat your password"
                control={control}
                passwordVisibility={passwordVisibility}
                handlePasswordVisibility={handlePasswordVisibility}
                rightIcon={rightIcon}
                rules = {{
                  required:"This field is Required",
                  validate: value => value === pwd || "Passwords do not match"
                }}
              />

              <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
              
              {error && (
                <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
              )}

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
            </>
        }       
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
