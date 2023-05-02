import React, { useState } from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CreateTraining from "./CreateTraining";
import * as ImagePicker from "expo-image-picker";
import {useNavigation} from "@react-navigation/native";


const UploadImage = ({onPress, setImage}) => {
    const [imageUri, setImageUri] = useState('');

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageUri(result.assets[0].uri);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={{padding: 10, color: 'grey', fontSize: 20, paddingRight:280}}>New Post</Text>

            <View style={styles.boxContainer}>

                <View style={{alignItems: 'center', justifyContent: 'center' }}>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={{ marginTop: 90, width: 300, height: 300 }} />
                )}

                    <TouchableOpacity style={[styles.button, { backgroundColor: '#DEE9F8FF' }]}  onPress={pickImage}>
                        <Text style={styles.buttonText}>Select an Image</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#F0A500' }]}
                                      onPress={() => {
                                          onPress()
                                      }}>
                        <Text style={styles.buttonText}>Next Step</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>


    )
};

const styles = StyleSheet.create({
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