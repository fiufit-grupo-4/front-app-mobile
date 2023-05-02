import React, { useState } from 'react';
import {View, Button, Image, Text, StyleSheet, error, TextInput, TouchableOpacity, Alert} from 'react-native';
import axios, {options} from 'axios';
import TitleInput from "../../components/inputs/TitleInput";
import {useForm} from "react-hook-form";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import { DifficultyList } from "../../components/inputs/DifficultyList";
import {useNavigation} from "@react-navigation/native";
import difficulty from "validator/es";


export const CreateTraining = ({onPress}) => {
    const [imageUri, setImageUri] = useState('');
    const [t_title, setTitle] = useState('');
    const [t_description, setDescription] = useState('');
    const [place, setPlace] = useState('');


    const { control} = useForm({
        defaultValues: {
            email: 'sofia@fi.uba.ar',
            password: '123456e'
        }
    });

    const navigation = useNavigation();


    const createPost = async () => {
        /*const formData = new FormData();
        formData.append('image', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
        formData.append('description', t_description);

        try {
            const response = await axios.post('https://yourapi.com/posts', formData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        */

        // TODO:  faltan ENDPOINTS
        if (!t_title.trim() || !t_description.trim() || !difficulty.trim() || !place.trim()) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        onPress=onPress();

    };


    return (
        <View style={styles.container}>
            <Text style={{padding: 10, color: 'grey', fontSize: 20, paddingRight:280}}>New Post</Text>

            <View style={styles.boxContainer}>

                <TitleInput
                    name= "title"
                    placeholder="Title"
                    control={control}
                    icon={"md-barbell-outline"}
                    rules = {{
                        required:"Title is Required",
                    }}
                    value={t_title}
                    onChangeText={setTitle}
                />

                <DescriptionInput
                    name= "description"
                    placeholder="Description"
                    control={control}
                    icon={"md-pencil-outline"}
                    rules = {{
                        required:"Description is Required",
                    }}
                    value={t_description}
                    onChangeText={setDescription}
                />

                <DifficultyList />

                <DescriptionInput
                    name= "place"
                    placeholder="Place"
                    control={control}
                    icon={"md-pin-outline"}
                    rules = {{
                        required:"Place",
                    }}
                    value={place}
                    onChangeText={setPlace}
                />

                <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#F0A500' }]}
                                  onPress={createPost} >
                    <Text style={styles.buttonText}>Post!</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:0,
        backgroundColor: '#DEE9F8FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxContainer: {
        backgroundColor: 'lightsteelblue',
        marginHorizontal:10,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    },
    imageContainer: {
        backgroundColor: '#DEE9F8FF',
        marginTop:1,
        width: '97%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        height:45,
        padding:5,
        margin:5,
        zIndex:0,
        elevation:0
    },
    input: {
        fontSize: 15,
        width: '100%',
        backgroundColor: '#DEE9F8FF',
        paddingHorizontal: 5,
        height: 20,
        borderRadius: 15,
        flex:1,
        zIndex:0,
        elevation:0
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
    icon: {
        paddingHorizontal: 5,
        color: "#222831",
        alignItems:"center",
        fontSize: 13
    },
});

export default CreateTraining;