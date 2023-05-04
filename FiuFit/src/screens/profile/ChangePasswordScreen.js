import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import {StackActions, useNavigation} from "@react-navigation/native";

const ChangePasswordScreen = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const [passwordChangeError, setPasswordChangeError] = useState(false);

    const navigation = useNavigation();

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            setPasswordMatchError(true);
        } else {
            // Here, you would add code to verify the old password before changing to the new one
            // For example, you could call a backend API to verify the old password before allowing the new one to be set

            // If the old password is verified, set the new password and show a success message
            setPasswordChangeSuccess(true);
            setPasswordChangeError(false);
            setPasswordMatchError(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            navigation.dispatch(
                StackActions.pop(1)
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            {passwordChangeSuccess && (
                <Text style={styles.successMessage}>Password changed successfully!</Text>
            )}
            {passwordChangeError && (
                <Text style={styles.errorMessage}>There was an error changing your password.</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={oldPassword}
                secureTextEntry={true}
                onChangeText={(text) => setOldPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                secureTextEntry={true}
                onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            {passwordMatchError && (
                <Text style={styles.errorMessage}>Passwords do not match.</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
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