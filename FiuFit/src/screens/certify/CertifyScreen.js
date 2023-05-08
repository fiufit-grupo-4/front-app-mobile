import React, { useState } from 'react';
import {View, Button, Image, Text, StyleSheet, error, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useForm} from "react-hook-form";
import {Ionicons} from "@expo/vector-icons";
import UploadImage from '../../components/utils/UploadImage';

export const CertifyScreen = ({ onPress }) => {
    const [imageUri, setImageUri] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [trainingType, setTrainingType] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [place, setPlace] = useState('');


    const { control} = useForm({
        defaultValues: {
            email: 'sofia@fi.uba.ar',
            password: '123456e'
        }
    });


    const createPost = () => {
        if (!title || !description || !difficulty || !place) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (title.trim() === '' || description.trim() === '' || difficulty.trim() === '' || place.trim() === '') {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        onPress=onPress();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.botton}>GET VERIFY</Text>

            <View style={styles.boxContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name="md-barbell-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="md-pencil-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                    />
                </View>

            

            </View>

            <UploadImage></UploadImage>

            <TouchableOpacity style={styles.button} onPress={createPost}>
                <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>

            

        </View>
    );
};

const styles = StyleSheet.create({
    botton: {
        padding: 10,
        color: 'rgba(32,38,70,0.63)',
        fontSize: 20,
        marginTop:20,
        alignContent: 'center',
        textAlign: 'center'
    },
    container: {
        marginTop:0,
        flex:1,
        backgroundColor: 'white',
    },
    boxContainer: {
        marginVertical:20,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    },
    inputContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        minHeight:40,
        backgroundColor: 'rgba(163,205,255,0.42)',
        paddingHorizontal: 5,
        borderRadius: 18,

    },
    input: {
        fontSize: 18,
        minHeight:25,
    },
    icon: {
        paddingHorizontal: 5,
        color: "rgba(53,63,79,0.74)",
        alignItems:"center",
        fontSize: 15,
        marginVertical:8
    },
    nextButton: {
        backgroundColor: '#DEE9F8FF',
        alignItems: 'center',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 5,
        marginBottom:1,
        marginTop:20,
        width: 90
    },
    buttonText: {
        fontSize: 18,
        color: 'rgba(23,29,52,0.93)',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#F0A500',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop:30,
        marginHorizontal: 40
    }
});

export default CertifyScreen;