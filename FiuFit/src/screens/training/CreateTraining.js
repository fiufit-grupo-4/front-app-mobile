import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {useForm} from "react-hook-form";
import {Ionicons} from "@expo/vector-icons";
import UploadImage from '../../components/utils/UploadImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TrainingType from "./TrainingType";
import { API_GATEWAY,USER } from '../../utils/constants';
import {firebase} from '../../config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const CreateTraining = ({ navigation }) => {
    const [imageUri, setImageUri] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [difficulty, setDifficulty] = useState(0);
    const [place, setPlace] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    
    const handleDifficulty = (value) => {
        setDifficulty(value);
    };


    const { control} = useForm({
        defaultValues: {
            email: 'sofia@fi.uba.ar',
            password: '123456e'
        }
    });
/*
    const uploadImage = async () => {
        if (imageUri){
            setLoading(true)
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const ref = firebase.storage().ref().child(`trainings/${user.id}/${new Date().getTime()}`).put(blob);    
            try {
                await ref
            } catch(e){
                console.log(e)
            }
            setLoading(false)
            Alert.alert("Photo uploaded correctly!")  
        } else {
            setError(true)
        }
        
    }
*/



    const createPost = () => {
        console.log(type)
        if (!title || !description  || !place || !type || !difficulty) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (title.trim() === '' || description.trim() === '' || place.trim() === '' || type.trim() === '' || !difficulty) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        AsyncStorage.getItem(USER).then((item) => {
        let user = JSON.parse(item)
        let url = API_GATEWAY + "trainers/me/trainings"
        setLoading(true)
        setError(false)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.access_token,
            },
            body: JSON.stringify({       
                "title": title,
                "description": description,
                "type": type,
                "difficulty": difficulty,
                "media": [
                    {
                        "media_type": "image",
                        "url": imageUri
                    }
                ],
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
                        navigation.goBack();
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    });
                }}).catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                }) 
        
            }).catch((error) => {
                setError(true);
                setErrorMessage(error);
        })
        //TODO: a mejorar
        setImageUri('');
        setTitle('');
        setDescription('');
        setType('');
        setDifficulty(0);
        setPlace('');
        setLoading(false);
        setUser({});
        setError(false);
        setErrorMessage("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.botton}>NEW POST</Text>
        <View>

        </View>
            <ScrollView style={{margin:10}}>
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

            {/*        <View style={styles.inputContainer}>
                        <Ionicons name="fitness-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Training Type"
                            value={trainingType}
                            onChangeText={setTrainingType}
                            multiline={true}
                        />
                    </View>*/}

                    <View style={styles.inputContainer}>
                        <Ionicons name="ios-stats-chart-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        {/*
                        <TextInput
                            style={styles.input}
                            maxLength={1}
                            placeholder="Difficulty (1-5)"
                            value={difficulty}
                            onChangeText={(value) => setDifficulty(value.replace(/[^1-5]/g, ''))}
                            keyboardType="numeric"
                        />*/}
                        <Text style={styles.difficultyInput}> Difficulty:  </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <TouchableWithoutFeedback key={value} onPress={() => handleDifficulty(value)}>
                                    <Icon name={value <= difficulty ? 'star' : 'star-outline'} size={20} color="#FDB813" />
                                </TouchableWithoutFeedback>
                            ))}
                            <Text style={{ marginLeft: 10 }}>{difficulty > 0 ? ' ' + ' ' : ' '}</Text>
                        </View>
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
                <TrainingType setType={setType}/>

                </View>

                <UploadImage setImage={setImageUri}></UploadImage>

                { loading 
                ? <View style={{marginTop:50, marginHorizontal: 40}}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                : <TouchableOpacity style={styles.button} onPress={createPost}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                }

                {error && (
                    <View style = {{alignItems:"center",marginTop:15}}>
                        <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                    </View>
                )}

                </ScrollView>
            </View>
    );
};



const styles = StyleSheet.create({
    botton: {
        padding: 10,
        color: 'rgba(32,38,70,0.63)',
        fontSize: 20,
        marginTop:15,
        alignContent: 'center',
        textAlign: 'center'
    },
    container: {
        marginTop:0,
        flex:1,
        backgroundColor: 'white',
    },
    boxContainer: {
        marginVertical:10,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    },
    inputContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        minHeight:40,
        backgroundColor: 'rgba(163,205,255,0.42)',
        paddingHorizontal: 5,
        borderRadius: 18,

    },
    input: {
        fontSize: 18,
        minHeight:25,
        maxWidth:320,
        margin:3,
        width: '99%',
        color:"rgba(53,63,79,0.74)"
    },
    difficultyInput: {
        fontSize: 18,
        minHeight:25,
        maxWidth:320,
        margin:3,
        color:"rgba(53,63,79,0.74)"
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
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: '#F0A500',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop:30,
        marginHorizontal: 40
    }
});

export default CreateTraining;

/*
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import MultiSelect from 'react-native-multi-select';

const MyComponent = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
  ];

  const onSelectedItemChange = (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  const onConfirmSelection = () => {
    // Aquí puedes realizar acciones con el elemento seleccionado
    console.log(selectedItem);
  };

  return (
    <View>
      <MultiSelect
        items={items}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemChange}
        selectedItems={[selectedItem]}
        selectText="Seleccionar"
        searchInputPlaceholderText="Buscar..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Confirmar"
        fixedHeight={false}
        hideTags
        onConfirm={onConfirmSelection}
        single
      />
    </View>
  );
};

export default MyComponent;

*/