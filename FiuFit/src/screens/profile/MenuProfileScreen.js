import React,{useState,useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StackActions} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Screens} from "../../navigation/Screens";
import {USER, API_GATEWAY } from '../../utils/constants';
function MenuProfileScreen({ navigation }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSetUser(newData,oldData){
        setUser(data)
        const updateUser = {
            "name":newData.name,
            "lastname":newData.lastname,
            "age":newData.age,
            "mail":newData.mail,
            "role":newData.role,
            "image":newData.image,
            "blocked":newData.blocked,
            "phone_number":newData.phone_number,
            "trainings":newData.trainings,
            "access_token":oldData.access_token,
            "token_type":oldData.token_type
        }

    }

    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
        function getUser() {
            setLoading(true);
            AsyncStorage.getItem(USER).then((item) => {
            let userInfo = JSON.parse(item)
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
                }).then((response) => {
                    setLoading(false);
                    if (!response.ok) {
                        setError(true);
                        console.log("RESPONSE: ", response.status);
                        if (response.status === 401) {
                            setErrorMessage('Unauthorized, not a valid access token');
                        } else {
                            setErrorMessage('Failed to connect with the server');
                        }
                    } else {
                        response.json().then((data) => {
                            console.log(JSON.stringify(data))
                        }).catch((error) => {
                            setError(true);
                            setErrorMessage(error);
                        });
                    }}).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                })}).catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                });
        }
        getUser();
        }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center', padding: 20, marginVertical:100 }}>
                <Image source={require('../../../assets/images/profilepic.jpeg')} style={{ width: 200, height: 200, borderRadius: 100 }} />
                <Text style={{ fontSize: 18, color: '#172D34', fontWeight: 'bold', marginTop: 20 }}>Pepito Boxeador</Text>
                <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20, alignItems: 'flex-start'}}>Mail: pepitocampeon@yahoo.com</Text>
                <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20,  alignItems: 'flex-start' }}>Number: 19937472342</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#DEE9F8FF', borderRadius: 20, marginHorizontal: 40, paddingVertical: 10 }} onPress={() => navigation.navigate('EditProfileScreen')}>
                <Text style={{ fontSize: 18, color: 'rgba(23,29,52,0.93)', textAlign: 'center' }}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(Screens.ChangePassword)}>
                <Text style={styles.buttonText}>Create New Password</Text>
            </TouchableOpacity>
        </View>
    );
}
export default MenuProfileScreen;



const styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        color: 'rgba(23,29,52,0.93)',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#DEE9F8FF',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop:30,
        marginHorizontal: 40
    }
})