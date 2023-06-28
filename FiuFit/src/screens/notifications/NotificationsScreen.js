import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ScrollView, ActivityIndicator, FlatList,TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER, API_GATEWAY } from '../../utils/constants';
import {Ionicons} from "@expo/vector-icons";
import GoalsListItem from "../Goal/GoalsListItem";
import { useIsFocused,useNavigation } from "@react-navigation/native";


const NotificationScreen = ( ) => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const getIconName = (type) => {
        switch (type) {
            case 'New follower':
                return 'md-person-outline';
            case 'Goal accomplished':
                return 'medal-outline';
            default:
                return 'notifications-outline';
        }
    };

    const handleOnPress = (type) =>{
        if (type == 'New follower') {
            navigation.navigate("Profile",{reload : false})
        } else if (type == 'Goal accomplished') {
            navigation.navigate("View Goals",{user : user})
        } else {
            navigation.navigate("Profile",{reload : false})
        }
    }

    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
       
        async function getUsers() {
            setError(false)
            setLoading(true)
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
                               
                                setUser(data)
                                setNotifications(data.notifications.reverse());
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
    }, [isFocused])

    //console.log("NOTIFICATIONS  : ", notifications)

    return (
        <View style = {{paddingHorizontal: 10,paddingTop: 20, }}>
            <Text style={styles.title}> {"Notifications "}</Text>
            { loading
                ? <View style={{marginTop:250, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
                : <>
                    {notifications.length === 0
                        ? <View style = {{alignItems:"center",marginTop:30}}>
                            <Text style = {{fontSize:18}}> You don´t have any notifications yet </Text>
                          </View>
                        : <ScrollView contentContainerStyle={styles.container}>
                            {notifications.map((notification, index) => (
                                <View key={index} style={styles.notificationContainer}>
                                    <TouchableOpacity onPress={() => handleOnPress(notification.title)}>
                                        <View style={styles.notificationHeader}>
                                            <View style={styles.iconContainer}>
                                                <Ionicons name={getIconName(notification.title)} size={18} color='rgba(26,49,70,0.86)'/>
                                            </View>
                                            <Text style={styles.notificationTitle}>{notification.title}</Text>
                                        </View>
                                        <View style={styles.notificationBody}>
                                            <Text style={styles.notificationText}>{notification.body}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        ))}
                    </ScrollView>
                    }
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom:20,
        paddingHorizontal:10
      },
});


export default NotificationScreen;
