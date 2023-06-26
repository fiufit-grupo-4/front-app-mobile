import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ActivityIndicator, FlatList,ScrollView} from "react-native";
import Errors from "../../components/utils/Error";
import MessageListItem from "./MessageListItem";
import {Ionicons} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { getUser } from "../../utils/getters";

const MessageScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState({})

    const isFocused = useIsFocused()

    useEffect(() => {
        async function getChats() {
            setLoading(true)
            setError(false)
            let userInfo = await getUser()

            setUser(userInfo)
            const userChatsRef = firestore()
            .collection('chats')
            .where('participants', 'array-contains', userInfo.id);
            

            userChatsRef.get()
            .then((querySnapshot) => {
              
              const chatsInfo = [];
              querySnapshot.forEach((doc) => {
                const chat = doc.data();
                const newChat = {
                    id: doc.id,
                    participants: chat.participants,
                    messages: chat.messages,
                    users : chat.users
                }
                chatsInfo.push(newChat);
              });
              
              setChats(chatsInfo);
              setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
              setError(true)
              setErrorMessage('Error al obtener los chats:' + error.toString())
            });
            
        }
        getChats()
      }, [isFocused])



    return (
        <View style={styles.container}>
                <Text style={styles.title}> {"Messages "}</Text>
        
            {loading
                ? <View style={{marginTop:250, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>

                : <>
                    {chats.length === 0
                        ? <View style = {{alignItems:"center",marginTop:30}}>
                            <Text style = {{fontSize:18}}> You don´t have any messages yet </Text>
                          </View>
                        : <View style={{padding:5 }}>
                            <ScrollView>
                                {chats.map((item, index) => (
                                    <View key={index} style={{marginTop:5 }}>
                                        
                                    <MessageListItem chat={item} myId={user.id}></MessageListItem>
                                </View>
                                    
                                ))}
                                </ScrollView>
                               
                        </View>
                    }

                    {error && (
                        <View style = {{alignItems:"center",marginTop:15}}>
                            <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                        </View>
                    )}
                </>
            }
        </View>
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
    container: {
    
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom:20
      },
});

export default MessageScreen;