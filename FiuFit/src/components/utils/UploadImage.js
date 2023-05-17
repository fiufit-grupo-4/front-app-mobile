import React, { useState } from 'react';
import {View,Button, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator,Alert} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {firebase} from '../../config/firebase'


const UploadImage = ({setImage}) => {
    const [imageUri, setImageUri] = useState('');
    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false)
    
      const uploadImage = async () => {
        let image = pickImage()
        if (image){
            setUploading(true)
            //console.log(imageUri)
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const ref = firebase.storage().ref().child(`images/${new Date().getTime()}`).put(blob);    
            try {
                await ref
            } catch(e){
                console.log(e)
            }
            setUploading(false)
            Alert.alert("Photo uploaded correctly!")  
        } else {
            setError(true)
        }
        
    }
    
    

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {     
            setImage(result.assets[0].uri)
            setImageUri(result.assets[0].uri)
            setError(false)
            return true
        }
        return false
    };


    return (
        <View style={styles.container}>
           
                <View style={{alignItems: 'center', justifyContent: 'center' }}>

                {imageUri && (
                    <Image source={{ uri: imageUri }} style={{  width: 120, height: 120 }} />
                
                    )}
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#DEE9F8FF' }]}  onPress={pickImage}>
                        <Text style={styles.buttonText}>Select an Image</Text>
                    </TouchableOpacity>


                    {error && (
                        <Text style={{color: 'red'}}>You must select an image first</Text>
                    )}
                    

                {/* 
                    <View style={styles.container}>
                    {!uploading 
                     ? <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#F0A500' }]} onPress={uploadImage}>
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                     : <ActivityIndicator size={'large'} color='black' />}
                    </View>*/}

            </View>
        </View>


    )
};

const styles = StyleSheet.create({
    botton: {
        padding: 10,
        color: 'rgba(32,38,70,0.63)',
        fontSize: 20,
        marginTop:20,
    },
    container: {
        marginTop:0,
        backgroundColor: '#fffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
        marginTop:30
    },
    button: {
        backgroundColor: '#DEE9F8FF',
        alignItems: 'center',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 5,
        marginBottom:1,
        marginTop:10,
        width: 370
    },
    nextButton: {
        backgroundColor: '#DEE9F8FF',
        alignItems: 'center',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 5,
        marginBottom:1,
        marginTop:20,
        width: 400
    },
    buttonText: {
        color: '#333b48',
        fontWeight: 'bold',
    },
});
export default UploadImage;