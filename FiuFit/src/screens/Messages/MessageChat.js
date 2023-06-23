import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    FlatList,
    TextInput,
    TouchableWithoutFeedback
} from "react-native";
import React, {useState, useCallback} from "react";
import {Ionicons} from "react-native-vector-icons";
import { firebaseService } from "./index";


function MessageChat({ route }) {
    const {item, messages} = route.params;
    const senderId = 'martuxd1';
    const [message, setMessage] = useState('')

    const handleAddMessage = useCallback(
        function () {
          firebaseService
            .createMessage({ message: 'message jiji', uid: 'martuxd1'})
            .then(function () {
              setMessage('')
            })
        },
        [message]
      )

    const renderMessage = ({ item }) => {
        const messageSenderId = item.senderId;

        return (
            <View style={(senderId === messageSenderId) ? styles.messageContainerSender : styles.messageContainerReceiver}>

                <Text style={(senderId === messageSenderId) ? styles.messageContentSender : styles.messageContentReceiver}>{item.content}</Text>
            </View>
        );
    };

    return (
        <View style={{flex:1}}>
            <ScrollView>
                <View style={styles.container}>
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderMessage}
                    />
                </View>
            </ScrollView>

            <View style={styles.newComment}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="New message..."
                    //onChangeText={(text) => setCommentText(text)}
                    //value={commentText}
                />
                <TouchableWithoutFeedback onPress={handleAddMessage}>
                    <Ionicons name={'send-outline'} style={styles.sendCommentIcon}/>
                </TouchableWithoutFeedback>
            </View>
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