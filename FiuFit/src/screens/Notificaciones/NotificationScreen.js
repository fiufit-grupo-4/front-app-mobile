import axios from "axios";
import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ActivityIndicator, FlatList, ScrollView} from "react-native";
import Errors from "../../components/utils/Error";
import * as PropTypes from "prop-types";
import NotificationListItem from "./NotificationListItem";


const NotificationScreen = ( ) => {
    //const {user} = route.params
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
                    body: "cumpliste tu meta sarten",
                    title:"new goal accomplish"},
                timestamp: '2023-06-19T12:30:45Z',
                messageId:2,
            }
    ]



    return (
        <View style={styles.container}>
            <ScrollView style={styles.notificationList}>
                {notifications.map((notification) => (
                    <View key={notification.notification.messageId} style={styles.notificationItem}>
                        {notification.notification.title === 'new follower' && (
                            <Text style={styles.notificationText}>
                                {notification.notification.body}
                            </Text>
                        )}
                        {notification.notification.title === 'new goal accomplish' && (
                            <Text style={styles.notificationText}>
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
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NotificationScreen;



