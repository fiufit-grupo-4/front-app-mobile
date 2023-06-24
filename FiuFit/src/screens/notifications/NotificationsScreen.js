import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {getUser} from "../../utils/getters";


const NotificationScreen = ( ) => {
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        console.log("------")
        async function getUsers() {
            let userInfo = await getUser()
            console.log(userInfo)
            
            setNotifications(userInfo.notifications)
        }
        getUsers();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <ScrollView style={styles.notificationList}>
{/*                 {notifications.map((notification) => (
                    <View style={styles.notificationItem}>
                        {notification.title === 'New follower' && (

                            <Text style={styles.notificationText}>
                                <Ionicons name={'md-person-outline'} style={styles.icon}/>
                                {"   "}
                                {notification.body}
                            </Text>
                        )}
                        {notification.title === 'Goal accomplished' && (
                            <Text style={styles.notificationText}>
                                <Ionicons name={'checkmark-outline'} style={styles.icon}/>
                                {"   "}
                                {notification.body}
                            </Text>
                        )}
                    </View>
                ))} */}
            </ScrollView>
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
