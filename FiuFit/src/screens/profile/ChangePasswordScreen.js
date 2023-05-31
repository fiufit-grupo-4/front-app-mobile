import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    TouchableWithoutFeedback,
    ToastAndroid
} from 'react-native';
import {StackActions, useNavigation} from "@react-navigation/native";
import { PasswordVisibility } from '../../utils/PasswordVisibility';
import {Ionicons} from 'react-native-vector-icons'
import Client from '../../client/Client';
import { getErrorMessage } from '../../utils/getters';
import FiuFitLogo from '../../../assets/images/fiticon.png';


const ChangePasswordScreen = ({route}) => {
    const {user,reload} = route.params
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const [passwordNullError, setPasswordNullError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();
    const { passwordVisibility, rightIcon, handlePasswordVisibility, } =
        PasswordVisibility();

    const handlePasswordChange = async () => {
        if (newPassword == '' ){
            setPasswordNullError(true)
            return
        } 
        if (newPassword !== confirmPassword) {
            setPasswordMatchError(true);
            return
        } else {
            setPasswordMatchError(false);
            setPasswordNullError(false)
            setError(false)
            setLoading(true);
            let response = await Client.editUserPassword(user,newPassword)
            setLoading(false);
            if (!response.ok) {
                setError(true);
                setErrorMessage(getErrorMessage(response.status))
            } else {
                let data = await response.json()
                console.log(JSON.stringify(data))     
                ToastAndroid.show('Password changed successfully!', ToastAndroid.SHORT)           
                navigation.navigate("Profile",{reload:!reload})
            }
        }


            /*
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.access_token,
                },
                body: JSON.stringify({
                    "password": newPassword,
                })
            }).then((response) => {
                setLoading(false);
                console.log(JSON.stringify(response))
                if (!response.ok) {
                    setError(true);
                    if (response.status === 401) {
                        setErrorMessage('Unauthorized, not a valid access token');
                    } else {
                        setErrorMessage('Failed to connect with the server');
                    }
                } else {
                    response.json().then((data) => {
                        console.log(JSON.stringify(data))     
                        ToastAndroid.show('Password changed successfully!', ToastAndroid.SHORT)           
                        navigation.navigate("Profile",{reload:!reload})
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    });
                }}).catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                })*/
            /*
            setPasswordChangeSuccess(true);
            setPasswordChangeError(false);
            setPasswordMatchError(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            navigation.dispatch(
                StackActions.pop(1)
            );*/
    }

    return (
        <View style={styles.container}>


            <Image
                source={FiuFitLogo}
                style={{marginTop:20,height:200,width:200,marginBottom:50}}
                resizeMode="contain"
            />
            <Text style={styles.title}>Change Password</Text>
            {passwordChangeSuccess && (
                <Text style={styles.successMessage}>Password changed successfully!</Text>
            )}

            <View style={[ styles.containerPassword ]}>
              <TouchableWithoutFeedback onPress={handlePasswordVisibility}>
                  <Ionicons name={rightIcon} style= {[styles.iconPassword]} size ={25}/>
              </TouchableWithoutFeedback>
              <TextInput
                style={styles.inputPassword}
                placeholder="New Password"
                value={newPassword}
                onChangeText={(text) =>{
                    setPasswordNullError(false)
                    setPasswordMatchError(false)
                    setNewPassword(text)
                }}
                secureTextEntry={passwordVisibility}
              />
            </View>

            <View style={[ styles.containerPassword ]}>
              <TouchableWithoutFeedback onPress={handlePasswordVisibility}>
                  <Ionicons name={rightIcon} style= {[styles.iconPassword]} size ={25}/>
              </TouchableWithoutFeedback>
              <TextInput
                style={styles.inputPassword}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={(text) =>{
                    setPasswordNullError(false)
                    setPasswordMatchError(false)
                    setConfirmPassword(text)
                }}
                secureTextEntry={passwordVisibility}
              />
            </View>

            {passwordMatchError && (
                <Text style={styles.errorMessage}>Passwords do not match.</Text>
            )}
            {passwordNullError && (
                <Text style={styles.errorMessage}>You must introduce a new password.</Text>
            )}

            { loading 
              ? <View style={{marginTop:50, marginHorizontal: 40}}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
              :<View style={{ alignItems: 'center', padding: 20,width:"100%" }}>
                    <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            }

            {error && (
                <View style = {{alignItems:"center",marginTop:15}}>
                    <Text style = {styles.errorMessage}> {errorMessage} </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    input: {
        width: '80%',
        height: 50,
        padding: 10,
        //borderWidth: 1,
        borderBottomWidth:1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 60,
        marginTop:30,
        marginHorizontal: 40,
        width:"80%"
    },
    successMessage: {
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 3
    },containerPassword: {
        width:"70%",
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        height:45,
        padding:5,
        marginBottom:15,
        marginTop:15,
        borderBottomWidth:1,
        borderColor: '#ccc',
      },
      inputPassword: {
        fontSize: 15,
        width: '100%',
        borderRadius: 15,
        paddingHorizontal: 5,
        height: 20,
        flex:1,
      },
    
      iconPassword: {
        paddingHorizontal: 5,
        alignItems:"center",
        color: "gray",
      },







})

export default ChangePasswordScreen;