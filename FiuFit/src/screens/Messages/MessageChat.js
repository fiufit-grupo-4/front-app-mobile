import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    TextInput,
    TouchableWithoutFeedback, Modal
} from "react-native";
import React, {useState,useEffect,useCallback} from "react";
import {Ionicons} from "react-native-vector-icons";
import { GiftedChat,InputToolbar } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';



const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
         
          borderRadius:15,
          
        }}
      />
    );
  };

function MessageChat({ route }) {
    const {chat, myId} = route.params;
    const [messages, setMessages] = useState([])
    const [sender, setSender] = useState({})
    const [user, setMyUser] = useState({})

    const getMessages = () =>{
        const senderUser = chat?.users.filter(user => user.id !== myId)[0];
        const myUser = chat?.users.filter(user => user.id == myId)[0];
        setSender(senderUser)
        setMyUser(myUser)

       

        const messages = chat.messages.map((message) => {
            const userFind = chat.users.find((user) => user.id === message.sender_id);
            console.log("IMAGE:",userFind.image)
            return {
                _id: message.id,
                text: message.text,
                createdAt: new Date(message.time),
                user: {
                    _id: userFind.id,
                    name: userFind.name + " " + userFind.lastname,
                    avatar: !userFind.image ||userFind.image == "string"  ? "" : userFind.image ,
                },
            };
        });
          
        let sorted = messages.sort((a, b) =>  b.createdAt -  a.createdAt);
        
        setMessages(sorted);
    }

    useEffect(() => {

        
        getMessages()
        
      }, [])

      const onSend = async (newMessages = []) => {
        const { text } = newMessages[0]
        let date = new Date()

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        )
        await firestore()
        .collection('chats')
        .doc(chat.id)
        .update({
            messages: firestore.FieldValue.arrayUnion({
                text: text,
                sender_id: user.id,
                time: date.toISOString(),
                id: Date.now().toString(36),
            }),
          });
      }


    return (
        <View style ={{flex:1,padding:5,marginBottom:10}}>


            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                renderInputToolbar={props => customtInputToolbar(props)}
                user={{
                    _id: myId,
                }}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    messageContainerSender: {
        marginBottom: 10,
        marginRight:70,
        marginVertical:5,
        backgroundColor: 'rgba(109,190,255,0.4)',
        borderRadius:20,
    },
    messageContainerReceiver: {
        marginBottom: 10,
        marginLeft:70,
        marginVertical:5,
        backgroundColor: 'rgba(0,0,0,0.11)',
        borderRadius:20,
    },
    sender: {
        fontWeight: 'bold',
    },
    messageContentReceiver:{
        marginLeft: 7,
        marginRight: 20,
        minHeight:20,
        marginVertical:3
    },
    messageContentSender: {
        marginLeft: 7,
        marginRight: 20,
        minHeight:20,
        marginVertical:3
    },
    newComment: {
        flexDirection: 'row',
        padding:1,
        borderRadius: 20,
        backgroundColor: '#ffffff',
    },
    commentInput: {
        minHeight: 20,
        flex: 1,
        marginRight: 10,
        marginLeft:10,
        padding:10,
        marginTop:20,
    },
    sendCommentIcon:{
        fontSize:20,
        marginVertical:40,
        marginRight: 18,
        alignSelf: 'flex-end',
    },
    commentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
export default MessageChat;