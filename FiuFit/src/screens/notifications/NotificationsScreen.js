import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ScrollView, ActivityIndicator, FlatList} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER, API_GATEWAY } from '../../utils/constants';
import {Ionicons} from "@expo/vector-icons";
import GoalsListItem from "../Goal/GoalsListItem";


const NotificationScreen = ( ) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
        //console.log("------")
        async function getUsers() {
            await AsyncStorage.getItem(USER)
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
                            setErrorMessage('Failed to connect with the server');
                        } else {
                            response.json().then((data) => {
                                setNotifications(data.notifications);
                                console.log(data.notifications)
                                console.log("---")
                                console.log(notifications)
                            }).catch((error) => {
                                setError(true);
                                setErrorMessage(error);
                            });
                        }
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    })
                ]);
            })
        }
        getUsers();
    }, [])

    //console.log("ESTAS SON LAS NOTIF POSTA POSTA: ", notifications)

    return (
        <View>

            { loading
                ? <View style={{marginTop:250, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
                : <>

                {notifications && notifications.map((notification, index) => (
                    <View key={index} style={styles.notificationItem}>
                        {notification.title === 'New follower' && (

                            <Text style={styles.notificationText}>
                                <Ionicons name={'md-person-outline'} style={styles.icon}/>
                                {"   "}
                                {notification.body}
                            </Text>
                        )}
                        {notification.title === 'Goal accomplished' && (
                            <Text key={index} style={styles.notificationText}>
                                <Ionicons name={'checkmark-outline'} style={styles.icon}/>
                                {"   "}
                                {notification.body}
                            </Text>
                        )}
                    </View>
                ))}


                    {error && (
                        <View style = {{alignItems:"center",marginTop:15}}>
                            <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                        </View>
                    )}
                </>
            }


        {/*{ loading ?
            <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
               <ActivityIndicator size="large" color = "black"/>
            </View> :
            <View style={styles.container}>
                <Text style={styles.title}>Notifications</Text>
                <ScrollView style={styles.notificationList}>
                {error && (
                        <View style = {{alignItems:"center"}}>
                        <Text style = {{fontSize:18,color : "crimson",padding:5}}> {errorMessage} </Text>
                        </View>
                    )}
                  {notifications && notifications.map((notification, index) => (
                        <View key={index} style={styles.notificationItem}>
                            {notification.title === 'New follower' && (

                                <Text style={styles.notificationText}>
                                    <Ionicons name={'md-person-outline'} style={styles.icon}/>
                                    {"   "}
                                    {notification.body}
                                </Text>
                            )}
                            {notification.title === 'Goal accomplished' && (
                                <Text key={index} style={styles.notificationText}>
                                    <Ionicons name={'checkmark-outline'} style={styles.icon}/>
                                    {"   "}
                                    {notification.body}
                                </Text>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
        }*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    notificationList: {
        flex: 1,
    },
    title:{
        fontSize:20,
        color: 'rgba(32,38,70,0.91)',
        marginBottom:10,
    },
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationText: {
        fontSize: 18,
        color: 'rgba(32,38,70,0.63)',
        paddingTop: 6
    },
    icon: {
        fontSize: 16,
        color: 'rgba(32,38,70,0.63)',
        marginLeft: 8,
        paddingHorizontal:10
    },
});

export default NotificationScreen;
