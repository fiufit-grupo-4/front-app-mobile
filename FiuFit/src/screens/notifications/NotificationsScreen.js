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

    const getIconName = (type) => {
        switch (type) {
            case 'New follower':
                return 'md-person-outline';
            case 'Goal accomplished':
                return 'checkmark-outline';
            default:
                return 'notifications-outline';
        }
    };

    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
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

    //console.log("NOTIFICATIONS  : ", notifications)

    return (
        <View>

            { loading
                ? <View style={{marginTop:250, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
                : <>

                    <ScrollView contentContainerStyle={styles.container}>
                        {notifications.map((notification, index) => (
                            <View key={index} style={styles.notificationContainer}>
                                <View style={styles.notificationHeader}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name={getIconName(notification.title)} size={18} color='rgba(26,49,70,0.86)'/>
                                    </View>
                                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                                </View>
                                <View style={styles.notificationBody}>
                                    <Text style={styles.notificationText}>{notification.body}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {error && (
                        <View style = {{alignItems:"center",marginTop:15}}>
                            <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                        </View>
                    )}
                </>
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    notificationContainer: {
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 12,
        marginBottom: 10,
        padding: 13,
    },
    notificationHeader: {
        borderBottomColor: 'rgba(58,142,212,0.21)',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 6,
        flexDirection: "row"
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgba(26,49,70,0.86)',
    },
    notificationBody: {
        marginBottom: 8,
    },
    notificationText: {
        fontSize: 16,
        color: 'rgba(26,49,70,0.86)',
    },
    iconContainer: {
        marginRight: 16,
        color: 'rgba(26,49,70,0.86)',
    },
});


export default NotificationScreen;
