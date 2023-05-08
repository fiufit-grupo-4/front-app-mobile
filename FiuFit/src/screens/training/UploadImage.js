import React, { useState } from 'react';
import {View,Button, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator,Alert} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {firebase} from '../../config/firebase'


const UploadImage = ({onPress, setImage}) => {
    const [imageUri, setImageUri] = useState('');
    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false)
    /*
    const uploadImage = async (uri) => {
        const response = await fetch(uri);

        const blob = await response.blob();
        console.log(blob)
        const ref = firebase.storage().ref().child(`images/${new Date().getTime()}`);
        const snapshot = await ref.put(blob);
        const downloadURL = await snapshot.ref.getDownloadURL();
      
        return downloadURL;
      };*/

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

    const onNextPress = () => {
        if (imageUri) {
            onPress();
        } else {
            setError(true);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.botton}>NEW POST</Text>

            <View style={styles.boxContainer}>

                <View style={{alignItems: 'center', justifyContent: 'center' }}>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={{ marginTop: 90, width: 300, height: 300 }} />
                )}

                    <TouchableOpacity style={[styles.button, { backgroundColor: '#DEE9F8FF' }]}  onPress={pickImage}>
                        <Text style={styles.buttonText}>Select an Image</Text>
                    </TouchableOpacity>


                    {error && (
                        <Text style={{color: 'red'}}>You must select an image first</Text>
                    )}

                    <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#F0A500' }]}
                                      onPress={() => {
                                          onNextPress()
                                      }}>
                        <Text style={styles.buttonText}>Next Step</Text>
                    </TouchableOpacity>


                    <View style={styles.container}>
                    {!uploading ? <Button title='Upload Image' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
                    </View>

                </View>
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
        marginTop:120,
        width: 400
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