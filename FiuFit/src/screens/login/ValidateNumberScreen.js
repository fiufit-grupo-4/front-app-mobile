import React, { useState } from 'react';
import {View, TextInput, Button, Alert, Text, StyleSheet} from 'react-native';
import {API_GATEWAY} from "../../utils/constants";
import CustomInput from "../../components/inputs/CustomInput";
import {useForm} from "react-hook-form";
import CustomButton from "../../components/buttons/CustomButton";
import {Ionicons} from "@expo/vector-icons";

const CodeValidationScreen = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);

    const { control, handlePress, formState: { errors }, watch } = useForm({
        defaultValues: {}
    });


    const validateCode = async () => {
        // Make a network request to validate the code
        try {
            const response = await fetch(API_GATEWAY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            // Check the response and handle accordingly
            if (response.ok) {
                // Code is valid, perform appropriate action
                // For example, navigate to the next screen
            } else {
                // Code is invalid, show an error message
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

   // <Button title="Validate" onPress={validateCode} />

    return (
        <View style={styles.root}>
            <Text style={{fontSize:20, marginTop:10, color: "rgba(32,38,70,0.76)" }}>Validate Code</Text>

            <CustomInput
                name= "code"
                placeholder="Code"
                control={control}
                icon={"phone-portrait-outline"}
                rules = {{required:"This field is Required"}}
                keyboardType="numeric"
                otherError={error}
            />

            <CustomButton text="Validate" onPress={validateCode} />
        </View>

    );
};

export default CodeValidationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
        marginTop:20
    },
    icon: {
        marginRight: 10,
        marginTop: 5
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    buttonText: {
        fontSize: 18,
        color: 'rgba(23,29,52,0.93)',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#DEE9F8FF',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop:30,
        marginHorizontal: 40
    },
    deleteButtonText: {
        fontSize: 18,
        color: 'rgb(255,255,255)',
        textAlign: 'center'
    },
    deleteButton: {
        backgroundColor: 'black',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop:30,
        marginHorizontal: 40
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10
    },
    root: {
        flex:1,
        alignItems: 'center',
        padding: 20,
        backgroundColor:"#91AED4",
        justifyContent: "center"
    },
})