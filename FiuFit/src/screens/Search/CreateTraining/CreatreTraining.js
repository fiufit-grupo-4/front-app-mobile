import React, { useState } from 'react';
import {View, Button, Image, Text, StyleSheet, error} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import TitleInput from "../../../components/inputs/TitleInput";
import {useForm} from "react-hook-form";
import DescriptionInput from "../../../components/inputs/DescriptionInput";
import {Ionicons} from "react-native-vector-icons";
import { DifficultyList } from "../../../components/inputs/DifficultySelect"

const CreateTraining = () => {
    const [imageUri, setImageUri] = useState('');
    const [t_title, setTitle] = useState('');
    const [t_description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [place, setPlace] = useState('');

    const { control} = useForm({
        defaultValues: {
            email: 'sofia@fi.uba.ar',
            password: '123456e'
        }
    });

    const pickImage = () => {
        ImagePicker.launchImageLibrary( response => {
            if (response.uri) {
                setImageUri(response.uri);
            }
        });
    };
        const createPost = async () => {
        const formData = new FormData();
        formData.append('image', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
        formData.append('description', t_description);

        try {
            const response = await axios.post('https://yourapi.com/posts', formData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
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


                <Button title="Pick the content" onPress={pickImage} />
                <Button title="Create post" onPress={createPost} />


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:0,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxContainer: {
        backgroundColor: 'lightsteelblue',
        marginHorizontal:10,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    }
});


export default CreateTraining;