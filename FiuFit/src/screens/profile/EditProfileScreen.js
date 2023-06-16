import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    ToastAndroid,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { getErrorMessage } from '../../utils/getters';
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import { API_GATEWAY } from '../../utils/constants';
import {firebase} from '../../config/firebase'
import * as ImagePicker from 'expo-image-picker';
import { getLocation } from '../../utils/locations';
import Client from '../../client/Client';

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
        //const storageRef = firebase.storage().ref()
        //const imageRef = storageRef.child(`users/${user.id}/avatar/${date}`)
        //await imageRef.put(blob)
        const res = await firebase.storage().ref().child(`users/${user.mail}/avatar/${date}`).put(blob)
        const uri = await firebase.storage().ref().child(`users/${user.mail}/avatar/${date}`).getDownloadURL()   
        //console.log(uri)
        //const uri = await imageRef.getDownloadURL() 
        //setProfileUpload(uri)
        setLoading(false) 
        return uri   
    }

    const handleGetLocation = async () => {
        const res = await getLocation()
        setLocation(res)
        ToastAndroid.show('Got location succesfully', ToastAndroid.SHORT)
    }

    const handleSaveChanges = async () => {
        setLoading(true);
        setError(false)
        let image 
        if (profilePicture) image = await uploadImage()
        else image = user.image  
        let response = await Client.editUserInfo(user,name,lastName,age,image,location)
        setLoading(false);
        console.log(JSON.stringify(response))
        if (!response.ok) {
            setError(true);
            setErrorMessage(getErrorMessage(response.status))
        } else {
            let data = await response.json()
            console.log(JSON.stringify(data))                
            navigation.navigate("Profile",{reload:!reload})
        }
        
    }

    return (
        <View style={{flex:1,padding:30,backgroundColor: '#fff'}}>

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
            <View style = {{alignContent:"center",alignItems:"center"}}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ fontSize: 16, color: 'black',marginLeft:10 }}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
            </View>

            <Text style={{ fontSize: 17, color: 'black', marginLeft:10 }}>Last Name</Text>
            <View style = {{alignContent:"center",alignItems:"center"}}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{ fontSize: 16, color: 'black',marginLeft:10 }}
                    placeholder="Enter your last name"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>
            </View>

            <Text style={{ fontSize: 17, color: 'black', marginLeft:10 }}>Age</Text>
            <View style = {{alignContent:"center",alignItems:"center"}}>
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
            </View>
            <View style = {styles.buttonContainer} >
                <TouchableOpacity onPress={handleGetLocation} style={styles.buttonLocation}>
                    <Text style={styles.buttonText}>
                        Add Location
                    </Text>
                </TouchableOpacity>
            </View>

        


            { loading 
              ? <View style={{marginTop:50, marginHorizontal: 40}}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
              : <View style = {[styles.buttonContainer,{marginTop:50}]} > 
                    <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
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
        borderBottomWidth:1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 10,
       
    },
    buttonText: {
        fontSize:16,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        padding: 10,
        marginVertical: 5,
        backgroundColor:"black",
        alignItems: 'center',
        borderRadius: 10,
        width: "90%",
        marginBottom: 20
    },
    buttonLocation: {
        padding: 10,
        marginVertical: 5,
        backgroundColor:"crimson",
        alignItems: 'center',
        borderRadius: 10,
        width: "90%",
        marginBottom: 20
    },
    buttonContainer: {
        marginBottom:10,
        alignContent:"center",
        alignItems:"center",
        marginTop:20
    }
})