import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const EditTraining = ({ onPress , route }) => {
    const {post} = route.params;
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [trainingType, setTrainingType] = useState(post.trainingType);
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
        onPress = onPress();
    };


    return (
        <View style={{padding: 10, backgroundColor: 'white', flex:1}}>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>Title</Text>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="md-barbell-outline" size={16} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={{fontSize: 16, color: '#333'}}
                        placeholder="Enter the title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>Description</Text>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="md-pencil-outline" size={16} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={{fontSize: 16, color: '#333'}}
                        placeholder="Enter the description"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>Training Type</Text>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name="fitness-outline" size={16} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={{fontSize: 16, color: '#333'}}
                        placeholder="Enter the training type"
                        value={trainingType}
                        onChangeText={setTrainingType}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>Difficulty</Text>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name={'fitness-outline'} size={16} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        maxLength={1}
                        style={{fontSize: 16, color: '#333'}}
                        placeholder="Enter difficulty (1-5)"
                        value={difficulty}
                        onChangeText={(value) => setDifficulty(value.replace(/[^1-5]/g, ''))}
                        keyboardType="numeric"
                    />
                </View>
            </View>


            <View style={styles.inputContainer}>
                <Text style={styles.text}>Place</Text>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name={'md-pin-outline'} size={16} color="#A6A6A6" style={styles.icon}/>
                    <TextInput
                        style={{fontSize: 16, color: '#333'}}
                        placeholder="Enter the training place"
                        value={place}
                        onChangeText={setPlace}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

        </View>
    )

}


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
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10
    }
})


export default EditTraining;
