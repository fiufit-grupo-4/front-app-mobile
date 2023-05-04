import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from "@expo/vector-icons";

export const EditProfileScreen = () => {
    const [name, setName] = useState('Pepito');
    const [lastName, setLastName] = useState('Boxeador');
    const [profilePicture, setProfilePicture] = useState(require('../../../assets/images/profilepic.jpeg'));
    const [email, setEmail] = useState('pepitoboxeador@gmail.com');
    const [number, setNumber] = useState('');

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
      // handle saving changes to user profile
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
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>Email</Text>
                <TextInput
                    style={{ fontSize: 16, color: '#333' }}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>Number</Text>
                <TextInput
                    style={{ fontSize: 16, color: '#333' }}
                    placeholder="Enter your phone number"
                    value={number}
                    onChangeText={setNumber}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

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