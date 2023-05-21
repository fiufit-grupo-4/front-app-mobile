import React, { useState } from 'react';
import {View,ActivityIndicator, Button, Image, Text, StyleSheet, error, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useForm} from "react-hook-form";
import { Ionicons } from '@expo/vector-icons';
import {firebase} from '../../config/firebase'
import * as ImagePicker from 'expo-image-picker';
import { API_GATEWAY,USER } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CertifyScreen = ({ onPress }) => {
    const [video, setVideo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSelectVideo = async () => {
        setError(false)
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [3, 3],
            quality:1,
        });
        if (!result.canceled) {
            setVideo(result.assets[0].uri);
            //console.log(result.assets[0].uri)
        }
    };

    const uploadVideo = async (user) => {
        setLoading(true);
        const response = await fetch(video);
        const blob = await response.blob();
        let date = new Date().getTime()
        await firebase.storage().ref().child(`users/${user.mail}/verification/${date}`).put(blob)
        const uri = await firebase.storage().ref().child(`users/${user.mail}/verification/${date}`).getDownloadURL()   
        setLoading(false) 
        return uri   
    }



    const sendVerify = async () => {
        if (!video) {
            setError(true)
            setErrorMessage('You must upload a video');
            return
        } else {
            let url = API_GATEWAY + "users/me/verification" 
            setLoading(true);
            setError(false)
            let user_string = await AsyncStorage.getItem(USER)
            console.log(user_string)
            let user = JSON.parse(user_string)
            const uri = await uploadVideo(user)
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.access_token,
                },
                body: JSON.stringify({
                    "video": uri,
                })
            })
            setLoading(false);
            if (!response.ok) {
                setError(true);
                console.log(response.status)
                if (response.status === 401) {
                    setErrorMessage('Unauthorized, not a valid access token');
                } else {
                    setErrorMessage('Failed to connect with the server');
                }
            } else {
                let data = await response.json()
                console.log(JSON.stringify(data))                
                navigation.navigate("Home")
            }
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.botton}>Get Verified <Ionicons name = "checkmark-done-outline" size = {22} color={"powderblue"}></Ionicons></Text>

            <View style={styles.boxContainer}>
                
            <Text style={styles.subtitle}>Upload a video endorsing your identity and obtain a recognized trainer certificate </Text>



            <View>
                <View style={boxStyles.videoContainer}>
                    {video ? (
                    <Image source={{ uri: video }} style={boxStyles.videoPreview} />
                    ) : (
                    <View style={boxStyles.placeholder} />
                    )}
                    
                </View>

                { loading 
                ? <View style={{marginTop:50, marginHorizontal: 40}}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                : <>
                    <View style = {{marginBottom:10}} >
                        <Button title="Select" onPress={handleSelectVideo} />
                        
                    </View>
                    <View style = {{marginBottom:10}} >
                        <Button title="Send" onPress={sendVerify} style = {{backgroundColor:"orange"}}  />
                    </View>
                </>
                }
                

                {error && (
                    <View style = {{alignItems:"center",marginTop:15}}>
                        <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                    </View>
                )}
                
            </View>
        </View>

            

        </View>
    );
};

const styles = StyleSheet.create({
    botton: {
        padding: 10,
        color: 'rgba(32,38,70,0.63)',
        fontSize: 20,
        marginTop:20,
        alignContent: 'center',
        textAlign: 'center'
    },
    subtitle: {
        padding: 10,
        color: 'rgba(32,38,70,0.63)',
        fontSize: 20,
        marginTop:20,
        
        textAlign: 'center'
    },
    container: {
        marginTop:0,
        flex:1,
        backgroundColor: 'white',
    },
    boxContainer: {
        marginVertical:20,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    },
    inputContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        minHeight:40,
        backgroundColor: 'rgba(163,205,255,0.42)',
        paddingHorizontal: 5,
        borderRadius: 18,

    },
    input: {
        fontSize: 18,
        minHeight:25,
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
        borderRadius: 10,
        paddingVertical: 10,
        marginTop:30,
        marginHorizontal: 40,
        marginBottom:40
    },
});

const boxStyles = StyleSheet.create({
    videoContainer: {
        
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        width: '80%',
        height: '60%',
        marginLeft:38,
        marginRight:38,
        marginBottom:15,
        marginTop:10
    },
    videoPreview: {
      width: '100%',
      height: '100%',
    },
    placeholder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#ccc',
    },
    plusIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CertifyScreen;

  

/*
import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const UploadVideoScreen = () => {
  

  return (
    <View>
      <View style={styles.videoContainer}>
        {video ? (
          <Image source={{ uri: video.uri }} style={styles.videoPreview} />
        ) : (
          <View style={styles.placeholder} />
        )}
        <View style={styles.plusIcon}>
          <Text>+</Text>
        </View>
      </View>
      <Button title="Seleccionar Video" onPress={handleSelectVideo} />
      <Button title="Subir Video" onPress={handleUploadVideo} />
    </View>
  );
};



export default UploadVideoScreen;

*/

