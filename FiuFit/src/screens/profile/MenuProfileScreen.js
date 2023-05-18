import React,{useState,useEffect} from 'react';
import {ScrollView,View, Image, Text, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import {StackActions} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Screens} from "../../navigation/Screens";
import {USER, API_GATEWAY } from '../../utils/constants';
function MenuProfileScreen({ navigation,route }) {
    const {reload} = route.params
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSetUser(newData,oldData){
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
            "location":newData.location,
            "access_token":oldData.access_token,
            "token_type":oldData.token_type,
            "id": newData.id
        }
        setUser(updateUser)
        AsyncStorage.setItem(USER,JSON.stringify(updateUser)).then()
        .catch(error => {
            setError(true)
            setErrorMessage(error)
          }) 

    }

    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
        function getUsers() {
            setLoading(true);
            AsyncStorage.getItem(USER)
                .then((item) => {
                    let user = JSON.parse(item)
                    Promise.all([
                        fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + user.access_token,
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
                                    setUser(data);
                                }).catch((error) => {
                                    setError(true);
                                    setErrorMessage(error);
                                });
                            }
                        }).catch((error) => {
                            setError(true);
                            setErrorMessage(error);
                        }),
                        fetch(API_GATEWAY + 'trainers/me/trainings', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + user.access_token,
                            },
                        }).then((response) => {
                            if (response.ok) {
                                response.json().then((data) => {
                                    console.log("POSTS: ", data);
                                    setPosts(data);
                                }).catch((error) => {
                                    setError(true);
                                    setErrorMessage(error);
                                });
                            } else {
                                setError(true);
                                setErrorMessage('Failed to fetch posts');
                            }
                        }).catch((error) => {
                            setError(true);
                            setErrorMessage(error);
                        }),
                    ]);
                })
                .catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                });
        }
        getUsers();
        }, [reload])

    return (
        <>
        { loading 
            ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                <ActivityIndicator size="large" color = "black"/>
              </View>
            : <ScrollView style={{ flex: 1, backgroundColor: '#91AED4' }}>
                <View style={{ alignItems: 'center', padding: 20,marginVertical:50}}>
                    <Image source={require('../../../assets/images/profilepic.jpeg')} style={{ width: 200, height: 200, borderRadius: 100 }} />
                    <Text style={{ fontSize: 18, color: '#172D34', fontWeight: 'bold', marginTop: 20 }}>{user.name + " " + user.lastname}</Text>
                    <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20, alignItems: 'flex-start'}}>Age: {user.age}</Text>
                    <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20, alignItems: 'flex-start'}}>Email: {user.mail}</Text>
                    <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20,  alignItems: 'flex-start' }}>Number: {user.phone_number}</Text>
                </View>


                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewTrainings',{user : user, posts: posts ,reload:reload})}>
                    <Text style={{ fontSize: 18, color: 'rgba(23,29,52,0.93)', textAlign: 'center' }}>Trainings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Profile',{user : user,reload:reload})}>
                    <Text style={{ fontSize: 18, color: 'rgba(23,29,52,0.93)', textAlign: 'center' }}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Change Password',{user : user,reload:reload})}>
                    <Text style={styles.buttonText}>Create New Password</Text>
                </TouchableOpacity>

                {error && (
                <View style = {{alignItems:"center",marginTop:15}}>
                    <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                </View>
                )}
            </ScrollView>
          }
          </>
        
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
        marginTop:20,
        marginHorizontal: 40
    }
})