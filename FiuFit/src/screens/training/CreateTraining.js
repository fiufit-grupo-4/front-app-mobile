import React, { useState } from 'react';
import {View, Button, Image, Text, StyleSheet, error, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useForm} from "react-hook-form";
import {Ionicons} from "@expo/vector-icons";


export const CreateTraining = ({ onPress }) => {
    const [imageUri, setImageUri] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
            <Text style={{padding: 10, color: 'grey', fontSize: 20, paddingRight:280}}>New Post</Text>

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

                <View style={styles.inputContainer}>
                    <Ionicons name="ios-stats-chart-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={styles.input}
                        maxLength={1}
                        placeholder="Difficulty (1-5)"
                        value={difficulty}
                        onChangeText={(value) => setDifficulty(value.replace(/[^1-5]/g, ''))}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="md-pin-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Place"
                        value={place}
                        onChangeText={setPlace}
                    />
                </View>

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
    },
    boxContainer: {
        backgroundColor: 'lightsteelblue',
        marginHorizontal:10,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#91AED4',
        borderRadius: 10,
        marginVertical: 13,
    },
    input: {
        fontSize: 15,
        width: '100%',
        backgroundColor: '#91AED4',
        paddingHorizontal: 5,
        height: 30,
        borderRadius: 6,
        flex:1,
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
        color: "rgba(34,40,49,0.74)",
        alignItems:"center",
        fontSize: 15,
        marginVertical:8
    },
});

export default CreateTraining;