import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const EditTraining = ({ onPress , route }) => {
    const { post } = route.params;
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [trainingType, setTrainingType] = useState(post. trainingType);
    const [difficulty, setDifficulty] = useState(post.difficulty.toString());
    const [place, setPlace] = useState(post.place);


    const handleSubmit = () => {
        if (!title || !description || !difficulty || !place) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (title.trim() === '' || description.trim() === '' || difficulty.trim() === '' || place.trim() === '') {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        const updatedPost = {
            ...post,
            title: title.trim(),
            description: description.trim(),
            difficulty: parseInt(difficulty),
            place: place.trim(),
        };
        onPress=onPress();
    };

    return (
            <View style={styles.container}>
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
                    <Ionicons name="fitness-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Training Type"
                        value={trainingType}
                        onChangeText={setTrainingType}
                        multiline={true}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="ios-stats-chart-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        maxLength={1}
                        style={styles.input}
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

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A6A6A6',
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#F0A500',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    }
})

export default EditTraining;
