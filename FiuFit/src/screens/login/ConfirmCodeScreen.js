import React,{useState} from 'react';
import {View, Text, ToastAndroid,ActivityIndicator} from 'react-native';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import CustomPassword from '../../components/inputs/CustomPassword';
import Logo from '../../components/utils/Logo';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import styles from '../../styles/styles';
import { PasswordVisibility } from '../../utils/PasswordVisibility';
import { API_GATEWAY } from '../../utils/constants';

const ConfirmCodeScreen = ({route}) => {
  const {mail} = route.params
  const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
    PasswordVisibility();
  const { control, handleSubmit, formState: { errors },watch } = useForm({
    defaultValues: {
      code: '',
      password: '',
      repeatPassword:'',
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  const pwd = watch("password")

  const onSubmitPressed = (data) => {
    var url = API_GATEWAY + 'login/reset_password/' + data.code;
    setLoading(true)
    setError(false)
    fetch(url   , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
          "mail": mail,
          "new_password":data.repeatPassword,
        })
    }).then(response => {
      console.log(JSON.stringify(response))
        setLoading(false)
        if (!response.ok) {
            setError(true)
            if(response.status == 503){
              setErrorMessage("The code is not valid")
            } else {
              setErrorMessage("Failed to connect with server")
            }
        } else {
          ToastAndroid.show('New password generated successfully', ToastAndroid.SHORT)
          navigation.navigate('SignIn');
        }
    }).catch(error => {
        setError(true)
        setErrorMessage(error)
    })  
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
          icon={"key-outline" }
          rules = {{required:"Validation Code is required"}}
        />

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
        {loading 
          ? <View style={{marginTop:10}}>
                <ActivityIndicator size="large" color = "black"/>
            </View>
          : <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
        }

        {error && (
            <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
        )}     

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />

      </View>
  );
};


export default ConfirmCodeScreen;