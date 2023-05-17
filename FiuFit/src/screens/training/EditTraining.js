import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Image,
    TouchableWithoutFeedback, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {API_GATEWAY, USER} from "../../utils/constants";
import TrainingType from "./TrainingType";
import {EditTrainingType} from "./EditTrainingType";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";

const EditTraining = ({ onPress , route }) => {
    const {post, reload} = route.params;
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [trainingType, setTrainingType] = useState(post.trainingType);
    const [difficulty, setDifficulty] = useState(post.difficulty);
    const [place, setPlace] = useState(post.place);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    const handleDifficulty = (value) => {
        setDifficulty(value);
    };

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


    const handleSaveChanges = () => {
        let url = API_GATEWAY + "trainers/me/trainings/" + post.id
        setLoading(true);
        setError(false)
        //let image = profilePicture ? profilePicture : user.image
        AsyncStorage.getItem(USER).then((item) => {
            let userInfo = JSON.parse(item)
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.access_token,
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "type": trainingType,
                "difficulty" : difficulty,
                "place": place
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
            }})}).catch((error) => {
            setError(true);
            setErrorMessage(error);
        })}



    function handleDelete() {
        //TODO handle this
        onPress = onPress();
    }

    return (
        <View style={{padding: 10, backgroundColor: 'white', flex:1}}>

            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Title</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="md-barbell-outline" size={16} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16, color: '#333', width: '99%'}}
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
                            style={{fontSize: 16, color: '#333', width: '99%',}}
                            placeholder="Enter the description"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                </View>

    {/*
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
    */}



                <View style={styles.inputContainer}>
                    <Text style={styles.text}> Difficulty </Text>
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Ionicons name="ios-stats-chart-outline" size={16} color="#A6A6A6" style={styles.icon}/>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <TouchableWithoutFeedback key={value} onPress={() => handleDifficulty(value)}>
                                    <Icon name={value <= difficulty ? 'star' : 'star-outline'} size={20} color="#FDB813" />
                                </TouchableWithoutFeedback>
                            ))}
                            <Text style={{ marginLeft: 10 }}>{difficulty > 0 ? ' ' + ' ' : ' '}</Text>
                        </View>
                    </View>
                </View>


{/*                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Difficulty</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name={'ios-stats-chart-outline'} size={16} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            maxLength={1}
                            style={{fontSize: 16, color: '#333'}}
                            placeholder="Difficulty (1-5)"
                            value={difficulty}
                            onChangeText={(value) => setDifficulty(value.replace(/[^1-5]/g, ''))}
                            keyboardType="numeric"
                        />
                    </View>
                </View>*/}


                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Place</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name={'md-pin-outline'}  style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16, color: '#333',width: '99%'}}
                            placeholder="Enter the training place"
                            value={place}
                            onChangeText={setPlace}
                        />
                    </View>
                </View>


                <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                    <View style={styles.container}>
                        <Text style={styles.text}>Training Type</Text>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="fitness-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                            <Picker
                                selectedValue={trainingType}
                                style={{ height: 50, width: '99%', marginLeft: -10, color: "rgba(53,63,79,0.74)", fontSize: 18, }}
                                itemStyle={styles.pickerItem}
                                onValueChange={(itemValue) =>
                                {setTrainingType(itemValue)}}
                            >
                                <Picker.Item label="Caminata" value="Caminata" />
                                <Picker.Item label="Running" value="Running" />
                            </Picker>
                        </View>
                    </View>
                </View>


            </ScrollView>


            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete Post</Text>
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
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
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
    trainingType: {
        height:5,
        maxHeight:10,
        backgroundColor: 'red'
    },
    typeIcon: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
    }
})


export default EditTraining;
