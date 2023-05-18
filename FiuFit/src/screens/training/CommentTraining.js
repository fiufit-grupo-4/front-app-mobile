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
import React from "react";
import {Ionicons} from "react-native-vector-icons";

export function getComments(handleComment, showCommentPopup, toggleCommentPopup, item, setCommentText, commentText, handleAddComment) {
        console.log(item)
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
                    {item.comments && item.comments.map((comment) => {
                        return (<View key={comment.user.name + " " + comment.user.lastname}>
                            <Text style={styles.commentUsername}>{comment.user.name + " " + comment.user.lastname}</Text>
                            <Text style={styles.commentContent}>{comment.detail}</Text>
                        </View>);
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
        marginVertical:30,
        marginRight: 18,
        alignSelf: 'flex-end',
    },
    commentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
