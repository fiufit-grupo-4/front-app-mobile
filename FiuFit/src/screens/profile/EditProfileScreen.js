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
import { API_GATEWAY,USER } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const EditProfileScreen = ({route}) => {
    const {user} = route.params
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastname);
    const [profilePicture, setProfilePicture] = useState(require('../../../assets/images/profilepic.jpeg'));
    const [age, setAge] = useState(user.age);
    const [number, setNumber] = useState(user.phone_number);
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
        if (!result.canceled) {
            setProfilePicture(result.uri);
        }
    };


    const handleSaveChanges = () => {
          
    }

    
    

    return (
        <View style={{flex:1,padding:30,backgroundColor: '#91AED4'}}>

            <View style={{ alignItems: 'center', padding: 20 }}>
                <TouchableOpacity onPress={handleImagePicker}>
                    <Image source={require('../../../assets/images/profilepic.jpeg')} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Ionicons name={'camera-outline'} size={20} color={'#5B635F'}/>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 17, color: 'black',  marginBottom: 5,marginLeft:10 }}>Name</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{ fontSize: 16, color: 'black',marginLeft:10 }}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <Text style={{ fontSize: 18, color: 'black', marginBottom: 5,marginLeft:10 }}>Last Name</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{ fontSize: 16, color: 'black',marginLeft:10 }}
                    placeholder="Enter your last name"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>

            <Text style={{ fontSize: 18, color: 'black', marginBottom: 5,marginLeft:10 }}>Age</Text>
            <View style={styles.inputContainer}>
            
                    <TextInput
                       style={{ fontSize: 16, color: 'black',marginLeft:10 }}
                        maxLength={2}
                        placeholder="Enter your age"
                        value={age}
                        onChangeText={ (value) => setAge(value.replace(/[^10-99]/g, ''))}
                        keyboardType="numeric"
                    />
                </View>

            <Text style={{ fontSize: 18, color: 'black', marginBottom: 5,marginLeft:10 }}>Number</Text>
            <View style={styles.inputContainer}>
                
                <TextInput
                    style={{ fontSize: 16, color: 'black',marginLeft:10 }}
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
        backgroundColor: '#AFC5E3',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        height:45,
        padding:5,
        margin:5,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    color: 'white',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop:110,
        marginHorizontal: 40
    }
})