import {ScrollView, StyleSheet, TouchableOpacity, View, Text, FlatList} from "react-native";
import React, {useState} from "react";

function MessageChat({ route }) {
    const {item, messages} = route.params;

    const renderMessage = ({ item }) => {
        const sender = item.find((participant) => participant.id === item.sender);
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.sender}>{sender.name}</Text>
                <Text style={styles.messageContent}>{item.content}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    messageContainer: {
        marginBottom: 10,
    },
    sender: {
        fontWeight: 'bold',
    },
    messageContent: {
        marginLeft: 10,
    },
});
export default MessageChat;