import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import {getUser} from "../../utils/getters";


const NotificationScreen = ( ) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getUsers() {
            setLoading(true)
            setError(false)
            let userInfo = await getUser()
            setUser(userInfo)
            console.log("hjhbjah")
            console.log(userInfo)
        }
        getUsers();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <ScrollView style={styles.notificationList}>
{/* 
                {user.notifications.map((notification) => (
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

