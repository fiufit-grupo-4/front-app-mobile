import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ActivityIndicator, FlatList} from "react-native";
import Errors from "../../components/utils/Error";
import MessageListItem from "./MessageListItem";
import {Ionicons} from "@expo/vector-icons";

const MessageScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const participants = [
        {
            "id": 1,
            "name": "John Doe"
        },
        {
            "id": 2,
            "name": "Jane Smith"
        }
    ];

    const messages = [
        {
            "id": 1,
            "senderId": 1,
            "receiverId": 2,
            "content": "Hey Jane, how are you?",
            "timestamp": "2023-06-19T12:30:45Z"
        },
        {
            "id": 2,
            "senderId": 2,
            "receiverId": 1,
            "content": "Hi John! I'm doing well, thanks. How about you?",
            "timestamp": "2023-06-19T12:35:20Z"
        },
        {
            "id": 3,
            "senderId": 1,
            "receiverId": 2,
            "content": "I'm good too! Just working on a project.",
            "timestamp": "2023-06-19T12:38:10Z"
        }
    ];


    return (
        <>
            {loading
                ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>

                : <>
                    {participants.length === 0
                        ? <Errors message={"You dont have any message yet"} icon={"mail"}></Errors>
                        : <View style={{padding:10 }}>
                            <Text style={styles.header}>Messages</Text>
                            <FlatList
                                data={participants}
                                keyExtractor={(participant) => participant.id}
                                renderItem={({item}) => (
                                    <View style={{marginTop:10 }}>
                                        <MessageListItem item={item} messages={messages} ></MessageListItem>
                                    </View>
                                )}
                            />
                        </View>
                    }

                    {error && (
                        <View style = {{alignItems:"center",marginTop:15}}>
                            <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                        </View>
                    )}
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        paddingTop:15,
        paddingHorizontal:10
    },
    postBackground: {
        marginBottom: 40,
        backgroundColor: 'white'
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    header:{
        fontSize:20,
        color: 'rgba(32,38,70,0.91)',
        marginBottom:10,
    },
    title: {
        borderTopWidth: 1,
        borderTopColor: 'orange',
        fontSize: 18,
        //marginLeft:7,
        color: 'rgba(23,29,52,0.76)'
    },
    item: {
        alignItems: 'center'
    },
    itemText: {
        marginLeft: 5,
        marginRight: 14,
        fontSize: 15,
        padding: 6,
        color: 'rgba(32,38,70,0.63)'
    },
    icon: {
        fontSize: 12,
        color: 'rgba(32,38,70,0.63)',
        marginLeft: 8
    },
    postContainer: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    postDescription: {
        fontSize: 14,
        marginTop: 5,
    },
    mediaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    image: {
        width: 300,
        height: 300,
    }
});

export default MessageScreen;