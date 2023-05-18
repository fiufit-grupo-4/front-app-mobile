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
import {useNavigation} from "@react-navigation/native";
import { API_GATEWAY } from '../../utils/constants';
import {firebase} from '../../config/firebase'
import { getLocation } from '../../utils/locations';


export const EditProfileScreen = ({route}) => {
    const {user,reload} = route.params
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastname);
    const [profilePicture, setProfilePicture] = useState("");
    const [profileUpload, setProfileUpload] = useState("");
    const [age, setAge] = useState(user.age);
    const [location, setLocation] = useState(user.location);
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
            setProfilePicture(result.assets[0].uri);
            //console.log(result.assets[0].uri)
        }
    };

    const uploadImage = async () => {
        setLoading(true);
        const response = await fetch(profilePicture);
        const blob = await response.blob();
        let date = new Date().getTime()
        const res = await firebase.storage().ref().child(`users/${user.id}/avatar/${date}`).put(blob)
        const uri = await firebase.storage().ref().child(`users/${user.id}/avatar/${date}`).getDownloadURL()   
        //console.log(uri)
        setProfileUpload(uri)
        setLoading(false)   
    }

    const handleGetLocation = async () => {
        const res = await getLocation()
        setLocation(res)
    }

    const handleSaveChanges = async () => {
        let url = API_GATEWAY + "users/" + user.id
        setLoading(true);
        setError(false)
        if (profilePicture) {
            await uploadImage()
        }
        let image = profilePicture ? profileUpload : user.image
    
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.access_token,
            },
            body: JSON.stringify({
                "name": name,
                "lastname": lastName,
                "age": age ,
                "image" : image,
                "location" : location
            })
        })
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
            let data = await response.json()
            console.log(JSON.stringify(data))                
            navigation.navigate("Profile",{reload:!reload})
        }
        
        
        /*
        
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.access_token,
            },
            body: JSON.stringify({
                "name": name,
                "lastname": lastName,
                "age": age ,
                "image" : image,
                "location" : location
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
                    navigation.navigate("Profile",{reload:!reload})
                }).catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                });
            }}).catch((error) => {
                setError(true);
                setErrorMessage(error);
    })*/
}

    return (
        <View style={{flex:1,padding:30}}>

            <View style={{ alignItems: 'center', padding: 20 }}>
                <TouchableOpacity onPress={handleImagePicker}>
                    { profilePicture 
                        ? <Image source={{uri: profilePicture}} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    : user.image 
                        ? <Image source={ {uri: user.image}} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        : <Image source={ require('../../../assets/images/profilepic.jpeg')} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    }
                    <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Ionicons name={'camera-outline'} size={20} color={'#5B635F'}/>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 17, color: 'black',  marginLeft:10 }}>Name</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{ fontSize: 16, color: 'black',marginLeft:10 }}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <Text style={{ fontSize: 17, color: 'black', marginLeft:10 }}>Last Name</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{ fontSize: 16, color: 'black',marginLeft:10 }}
                    placeholder="Enter your last name"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>

            <Text style={{ fontSize: 17, color: 'black', marginLeft:10 }}>Age</Text>
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

                <TouchableOpacity style={styles.buttonLocation} onPress={handleGetLocation}>
                  <Text style={styles.buttonText}>Get Location</Text>
                </TouchableOpacity>


            { loading 
              ? <View style={{marginTop:50, marginHorizontal: 40}}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
              : <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            }

            {error && (
                <View style = {{alignItems:"center",marginTop:15}}>
                    <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                </View>
            )}

        </View>

    );
  };

export default EditProfileScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '90%',
        
        height: 50,
        padding: 10,
        //borderWidth: 1,
        borderBottomWidth:1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 10,
        marginLeft:15
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
        marginTop:50,
        marginHorizontal: 40
    },
    buttonLocation: {
        backgroundColor: 'crimson',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop:50,
        marginHorizontal: 40
    }
})