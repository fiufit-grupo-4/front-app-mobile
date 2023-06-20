import React, {useState} from "react";
import {StyleSheet, View, Text, FlatList, ScrollView} from "react-native";
import {Ionicons} from "react-native-vector-icons";


const NotificationScreen = ( ) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const notifications = [
            {
                notification: {
                    android: {},
                    body: 'Pepe started following you',
                    title:"new follower"},
                timestamp: '2023-06-19T12:30:45Z',
                messageId:1,
            },
            {
                notification: {
                    android: {},
                    body: "Cumpliste tu meta sarten",
                    title:"new goal accomplish"},
                timestamp: '2023-06-19T12:30:45Z',
                messageId:2,
            }
    ]


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <ScrollView style={styles.notificationList}>

                {notifications.map((notification) => (
                    <View key={notification.notification.messageId} style={styles.notificationItem}>
                        {notification.notification.title === 'new follower' && (

                            <Text style={styles.notificationText}>
                                <Ionicons name={'md-person-outline'} style={styles.icon}/>
                                {"   "}
                                {notification.notification.body}
                            </Text>
                        )}
                        {notification.notification.title === 'new goal accomplish' && (
                            <Text style={styles.notificationText}>
                                <Ionicons name={'checkmark-outline'} style={styles.icon}/>
                                {"   "}
                                {notification.notification.body}
                            </Text>
                        )}
                    </View>
                ))}
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
        color: 'rgba(32,38,70,0.91)'
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



