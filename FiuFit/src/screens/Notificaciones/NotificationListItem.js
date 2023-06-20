import {useNavigation} from "@react-navigation/native";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FirstGoalView from "../Goal/FirstGoalView";
import React from "react";
import {Ionicons} from "react-native-vector-icons";

function NotificationListItem({item}) {
    const navigation = useNavigation();

    //function handleOnPress() {
      //  navigation.navigate("Goal Profile", { item, user, navigation });
    //}

    return (
        <View style={styles.container}>
            <ScrollView style={styles.notificationList}>
                {jsonData.notifications.map((notification) => (
                    <View key={notification.id} style={styles.notificationItem}>
                        {notification.type === 'follower' && (
                            <Text style={styles.notificationText}>
                                New follower: {notification.follower.name}
                            </Text>
                        )}
                        {notification.type === 'goal_accomplishment' && (
                            <Text style={styles.notificationText}>
                                {notification.message}
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


export default NotificationListItem;