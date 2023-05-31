
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import React, {useEffect, useState} from "react";
import {Ionicons} from "react-native-vector-icons";
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

export function getComments(user, handleComment, showCommentPopup, toggleCommentPopup, item, setCommentText, commentText, reload) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [comments, setComments] = useState(item.comments);
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    const handleAddComment = () => {
        if (!commentText) {
            // Don't add an empty comment
            return;
        }

        const newComment = {
            user: {
                name: user && user.name ? user.name : "Unknown",
                lastname: user && user.lastname ? user.lastname : "User",
            },
            detail: commentText,
        };
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        let url = API_GATEWAY + "trainings/" + item.id + "/comment";
        setLoading(true);
        setError(false);

        AsyncStorage.getItem(USER)
            .then((item) => {
                let userInfo = JSON.parse(item);
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userInfo.access_token,
                    },
                    body: JSON.stringify({
                        "detail": commentText
                    })
                });
            })
            .then((response) => {
                setLoading(false);
                console.log(JSON.stringify(response));
                if (!response.ok) {
                    setError(true);
                    if (response.status === 401) {
                        setErrorMessage('Unauthorized, not a valid access token');
                    } else {
                        setErrorMessage('Failed to connect with the server');
                    }
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(JSON.stringify(data));
                navigation.navigate(0, { reload: !reload });
            })
            .catch((error) => {
                setError(true);
                setErrorMessage(error);
            });

        setCommentText('');
    }


    return <>
        {/* COMENTARIOS */}
        <TouchableWithoutFeedback onPress={handleComment}>
            <Ionicons name={'chatbubble-outline'} style={styles.commentIcon}/>
        </TouchableWithoutFeedback>
        <Modal visible={showCommentPopup}>
            <Text style={styles.commentTitle}>Comments</Text>
            {/* Cerrar comentarios */}

            <TouchableOpacity onPress={toggleCommentPopup} style={styles.closeButton}>
                <Ionicons name={'close-circle'} style={styles.closeIcon}/>
            </TouchableOpacity>

            <View style={styles.commentPopUp}>
                <ScrollView>
                    {comments && comments.map((comment, index) => { // Add index as second argument
                        return (
                            <View key={index}>
                                <Text style={styles.commentUsername}>{comment.user.name + " " + comment.user.lastname}</Text>
                                <Text style={styles.commentContent}>{comment.detail}</Text>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* NUEVO COMENTARIO */}
                <View style={styles.newComment}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        onChangeText={(text) => setCommentText(text)}
                        value={commentText}
                    />
                    <TouchableWithoutFeedback onPress={handleAddComment}>
                        <Ionicons name={'send-outline'} style={styles.sendCommentIcon}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </Modal>
    </>;
}

const styles = StyleSheet.create({
    commentIcon: {
        fontSize: 24,
        marginRight: 3,
        padding:8,
        color: '#000000'
    },
    commentTitle: {
        padding: 5,
        color: 'rgba(32,38,70,0.63)',
        fontSize: 20,
        marginTop:20,
        marginLeft:18
    },
    commentPopUp: {
        padding: 20,
        maxHeight: '92%',
    },
    commentUsername: {
        marginTop:10,
        fontWeight: 'bold',
        marginRight: 5,
        fontSize:15,
        padding:7,
        borderTopWidth:1,
        borderTopColor: 'sandybrown',
    },
    commentContent: {
        marginLeft: 5,
        marginBottom:10,
    },
    closeButton: {
        position: 'absolute',
        padding:9,
        top: 10,
        right: 10,
        zIndex: 1,
    },
    closeIcon: {
        fontSize:25,
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
