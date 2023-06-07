import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {API_GATEWAY, USER} from "../../utils/constants";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";


const EditChallenge = ({ route }) => {
    const {post: challengePost} = route.params;
    const [title, setTitle] = useState(challengePost.title);
    const [description, setDescription] = useState(challengePost.description);
    const [challengeType, setChallengeType] = useState(challengePost.type);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const navigation = useNavigation();

    console.log("ESTE ES UNDEFINED !!!! ", challengePost)

    const handleSaveChanges = async () => {
        let url = API_GATEWAY + "trainers/me/trainings/" + challengePost.id
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
                "type": challengeType,
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
            navigation.navigate("Profile",{reload:!reload})
        }
    }


    function handleDelete() {
        let url = API_GATEWAY + "trainers/me/trainings/" + challengePost.id
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
                        navigation.navigate("Profile",{reload:!reload})
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

                <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                    <View style={{padding:1, marginTop:10, paddingTop:10 }}>
                        <Text style={styles.text}>Challenge Type</Text>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="fitness-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                            <Picker
                                selectedValue={challengeType}
                                style={{ height: 50, width: '99%', marginLeft: -17, marginTop: -12, color: "rgba(53,63,79,0.74)", fontSize: 18, }}
                                onValueChange={(itemValue) =>
                                {setChallengeType(itemValue)}}
                            >
                                <Picker.Item label="Caminata" value="Caminata" />
                                <Picker.Item label="Running" value="Running" />
                            </Picker>
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
                            <Text style={styles.deleteButtonText}>Delete Challenge</Text>
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
    typeIcon: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
    }
})


export default EditChallenge;
