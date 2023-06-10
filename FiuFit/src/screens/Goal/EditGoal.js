import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";


const EditGoal = ({ route }) => {
    const {post: goalPost, navigation} = route.params;
    const [title, setTitle] = useState(goalPost.title);
    const [description, setDescription] = useState(goalPost.description);
    const [metric, setMetric] = useState(goalPost.metric);
    const [difficulty, setDifficulty] = useState(goalPost.difficulty);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedValue, setSelectedValue] = useState(" ");

    const handleDifficulty = (value) => {
        setDifficulty(value);
    };

    const metricItems = [
        { label: " ", value: " " },
        { label: "Distancia recorrida", value: "Distancia recorrida" },
        { label: "Tiempo utilizado", value: "Tiempo utilizado" },
        { label: "Calorias utilizadas", value: "Calorias utilizadas" },
        { label: "Cantidad de hitos realizados", value: "Cantidad de hitos realizados" },
        { label: "Tipo de actividad realizada", value: "Tipo de actividad realizada" },
    ];

    const handleSaveChanges = async () => {
        let url = API_GATEWAY + "trainers/me/trainings/" + goalPost.id
        setLoading(true);
        setError(false)

        let item =  await AsyncStorage.getItem(USER)
        let userInfo = JSON.parse(item)

        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.access_token,
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "metric": metric,
                "difficulty" : difficulty,
            })
        })
        if (!response.ok) {
            setError(true);
            setLoading(false);
            if (response.status === 401) {
                setErrorMessage('Unauthorized, not a valid access token');
            } else {
                setErrorMessage('Failed to connect with the server');
            }
        } else {
            let data = await response.json()
            console.log(JSON.stringify(data))
            setLoading(false);
            navigation.navigate("View Challenges",{reload:!reload})
        }
    }

    function handleDelete() {
        let url = API_GATEWAY + "trainers/me/goal/" + goalPost.id
        setLoading(true);
        setError(false)
        AsyncStorage.getItem(USER).then((item) => {
            let userInfo = JSON.parse(item)
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
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
                        navigation.navigate("View Challenges",{reload:!reload})
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    });
                }})}).catch((error) => {
            setError(true);
            setErrorMessage(error);
        })
    }

    return (
        <View style={{padding: 20, backgroundColor: 'white', flex:1}}>

            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Title</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="md-barbell-outline" size={16} color={"rgba(52,60,80,0.85)"} style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16, color: "rgba(53,63,79,0.74)", width: '99%'}}
                            placeholder="Enter the title"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Description</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="md-pencil-outline" size={16} color={"rgba(52,60,80,0.85)"} style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16,  color: "rgba(53,63,79,0.74)", width: '99%',}}
                            placeholder="Enter the description"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                </View>

                <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                    <View style={{padding:1, marginTop:10, paddingTop:10 }}>
                        <Text style={styles.text}>Training Type</Text>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="fitness-outline" size={24} color={"rgba(53,63,79,0.74)"} style={styles.icon}/>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: '99%', marginLeft: -10, color: "rgba(53,63,79,0.74)", fontSize: 18, }}
                                itemStyle={styles.pickerItem}
                                onValueChange={(itemValue) =>
                                {   setMetric(itemValue)
                                    setSelectedValue(itemValue)
                                }}
                            >
                                {metricItems.map((item, index) => (
                                    <Picker.Item key={index} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

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

            </ScrollView>


            { loading
                ? <View style={{marginBottom:100, marginHorizontal: 40}}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
                : <>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.deleteButtonText}>Delete Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                    </View>


                </>
            }

            {error && (
                <View style = {{alignItems:"center",marginTop:15}}>
                    <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                </View>
            )}




        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:50
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
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: 'black',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',

    },
    deleteButtonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    deleteButton: {
        backgroundColor: 'crimson',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',

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


export default EditGoal;
