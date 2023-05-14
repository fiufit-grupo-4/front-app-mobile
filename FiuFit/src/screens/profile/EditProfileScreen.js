import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from "@expo/vector-icons";
import {StackActions, useNavigation} from "@react-navigation/native";
import { API_GATEWAY,TOKEN } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const EditProfileScreen = () => {
    const [name, setName] = useState('Pepito');
    const [lastName, setLastName] = useState('Boxeador');
    const [profilePicture, setProfilePicture] = useState(require('../../../assets/images/profilepic.jpeg'));
    const [age, setAge] = useState();
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setProfilePicture(result.uri);
        }
    };

    const handleSaveChanges = () => {
        const url = API_GATEWAY + 'users/645ed9cf5544e4af38873c29'
        setLoading(true)
        AsyncStorage.getItem(TOKEN).then( token =>{
            console.log(token)
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,    
                },
                body: JSON.stringify({
                    "name": name,
                    "lastname":lastName,
                    "age": age,
                    "mail": "username@mail.com",
                    "password": "secure",
                    "image": profilePicture
                  })
                }).then(response => {
                    setLoading(false)  
                    if (!response.ok) {
                        setError(true)
                        console.log(response.status)
                        if(response.status == 401){
                            setErrorMessage("Unhautorized, not valid access token")
                        } else {
                            setErrorMessage("Failed to connect with server")
                        }
                    } else {
                        response.json().then(data => {
                            console.log(data)
                            setUser(data);
                        }).catch(error => {
                            setError(true)
                            setErrorMessage(error)
                        })
                    }
                })
                .catch(error => {
                    setError(true)
                    setErrorMessage(error)
                })  
            }
            ).catch(error => {
                setError(true)
                setErrorMessage(error)
            }) 

        navigation.dispatch(
            StackActions.pop(1)
        );
    };

    return (
        <View style={{padding: 20 }}>

            <View style={{ alignItems: 'center', padding: 20 }}>
                <TouchableOpacity onPress={handleImagePicker}>
                    <Image source={require('../../../assets/images/profilepic.jpeg')} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Ionicons name={'camera-outline'} size={20} color={'#5B635F'}/>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>Name</Text>
                <TextInput
                    style={{ fontSize: 16, color: '#333' }}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>Last Name</Text>
                <TextInput
                    style={{ fontSize: 16, color: '#333' }}
                    placeholder="Enter your last name"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>

            <View style={styles.inputContainer}>
            <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>Age</Text>
                    <TextInput
                        style={styles.input}
                        maxLength={2}
                        placeholder="Enter your age"
                        value={age}
                        onChangeText={ (value) => setAge(value.replace(/[^10-99]/g, ''))}
                        keyboardType="numeric"
                    />
                </View>

            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>Number</Text>
                <TextInput
                    style={{ fontSize: 16, color: '#333' }}
                    placeholder="Enter your phone number"
                    value={number}
                    onChangeText={setNumber}
                    keyboardType="numeric"
                />
            </View>

            { loading 
              ? <View style={{}}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
              : <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            }

            {error && (
                <View style = {{alignItems:"center"}}>
                    <Text style = {{fontSize:18,color : "crimson",padding:5}}> {errorMessage} </Text>
                </View>
            )}

            

        </View>

    );
  };

export default EditProfileScreen;


const styles = StyleSheet.create({
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
        marginTop:20
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
        marginTop:110,
        marginHorizontal: 40
    }
})