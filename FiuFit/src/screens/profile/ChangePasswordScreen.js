import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import {StackActions, useNavigation} from "@react-navigation/native";
import { API_GATEWAY,USER } from '../../utils/constants';

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

    const handlePasswordChange = () => {
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
            let url = API_GATEWAY + "users/" + user.id
            setLoading(true);
            setError(false)
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
                        navigation.navigate("Profile",{reload:!reload})
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    });
                }}).catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                })
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
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            {passwordChangeSuccess && (
                <Text style={styles.successMessage}>Password changed successfully!</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                secureTextEntry={false}
                onChangeText={(text) =>{
                    setPasswordNullError(false)
                    setPasswordMatchError(false)
                    setNewPassword(text)
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={confirmPassword}
                secureTextEntry={false}
                onChangeText={(text) =>{
                 setPasswordNullError(false)
                 setPasswordMatchError(false)
                 setConfirmPassword(text)
                 }
                }
            />
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
              : <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
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
        marginBottom: 20,
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
        color: 'rgba(23,29,52,0.93)',
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: '#DEE9F8FF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 60,
        marginTop:30,
        marginHorizontal: 40
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
    }})

export default ChangePasswordScreen;