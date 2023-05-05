import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";

const Training = ({item, canEdit}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [commentText, setCommentText] = useState('');


    const navigation = useNavigation();

    const [showCommentPopup, setShowCommentPopup] = useState(false);

    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };

    const handleEdit = (item) => {
        setSelectedPost(item);
        navigation.navigate('EditTrainingScreen', {post: item});
    }

    function onPress() {
        navigation.navigate("Training", {item})
    }

    const handleLike = (postId) => {
        setIsLiked(!isLiked);
    };
    // Logic to handle a user liking a post with the given postId


    // add function to toggle comment popup
    const toggleCommentPopup = () => {
        setShowCommentPopup(!showCommentPopup);
    };

    // update handleComment function to call toggleCommentPopup instead of console.log
    const handleComment = () => {
        toggleCommentPopup();
    };

    const handleAddComment = () => {
        const newComment = {
            user: 'Your Username', // Replace with actual username
            content: commentText,
        };
        const updatedComments = [...item.comments, newComment];
        //setItem({ ...item, comments: updatedComments });
        setCommentText('');
    };

    return (
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>

                    <View style={styles.topContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../../assets/images/profilepic.jpeg')}
                                   style={styles.profileImage}/>
                            <Text style={styles.name}>{'Pepito Boxeador'}</Text>
                        </View>


                        {canEdit && <TouchableWithoutFeedback onPress={() => handleEdit(item)}>
                            <View style={styles.edit}>
                                <Ionicons name={'ellipsis-vertical-outline'} style={styles.placeIcon}/>
                            </View>
                        </TouchableWithoutFeedback>
                        }
                    </View>

                    <View style={styles.item}>
                        <Ionicons name={'md-pin-outline'} style={styles.placeIcon}/>
                        <Text style={styles.place}>{item.place}</Text>
                    </View>

                    <View style={{padding: 5}}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => toggleModal(item.image)}>
                        <Image source={item.image} style={styles.postImage}/>
                    </TouchableWithoutFeedback>


                    {/* COMENTARIOS */}
                    <View>
                        <TouchableWithoutFeedback onPress={handleComment}>
                            <Ionicons name={'chatbubble-outline'} style={styles.commentIcon}/>
                        </TouchableWithoutFeedback>
                        <Modal visible={showCommentPopup}>
                        <Text style={styles.commentTitle}>Comments</Text>
                            {/*Cerrar comentarios*/}

                            <TouchableOpacity onPress={toggleCommentPopup}  style={styles.closeButton}>
                                <Ionicons name={'close-circle'} style={styles.closeIcon}/>
                            </TouchableOpacity>

                            <View style={styles.commentPopUp}>
                                        <ScrollView>
                                    {item.comments && item.comments.map((comment) => {
                                    return (<View key={comment.user + comment.content}>
                                        <Text style={styles.commentUsername}>{comment.user}</Text>
                                        <Text style={styles.commentContent}>{comment.content}</Text>
                                    </View>);
                                })}
                                        </ScrollView>

                                {/*NUEVO COMENTARIO*/}
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
                    </View>


                    {/*<View style={styles.bottomContent}>

                        <View style={styles.like}>
                            <TouchableWithoutFeedback onPress={handleLike}>
                                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} style={[styles.likeIcon, {color: isLiked ? 'red' : '#5B635F'}]}/>
                            </TouchableWithoutFeedback>
                            <Text style={styles.likeText}>{item.likes.length}</Text>
                        </View>
                    </View>*/}



                    <View style={styles.item}>
                        <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
                        <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
                    </View>

                    <View style={styles.item}>
                        <Ionicons name={'fitness-outline'} style={styles.icon}/>
                        <Text style={styles.itemText}>{'Training Type: ' + item.trainingType}</Text>
                    </View>

                    <View style={styles.item}>
                        <Ionicons name={'ios-stats-chart-outline'} style={styles.icon}/>
                        <Text style={styles.itemText}>{'Difficulty: ' + item.difficulty}</Text>
                    </View>

                    <TouchableOpacity onPress={onPress}></TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        paddingVertical: 6,
        //backgroundColor: 'rgba(222,233,248,0.29)'
        backgroundColor: 'white'
    },
    postContainer: {
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    topContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileImage: {
        width: 22,
        height: 22,
        borderRadius: 30,
        marginLeft: 5
    },
    name: {
        fontSize: 16,
        color: 'rgba(23,29,52,0.93)',
        marginHorizontal: 10
    },
    edit: {
        flexDirection: 'row',
        padding: 5
    },
    title: {
        borderTopWidth: 1,
        borderTopColor: 'orange',
        fontSize: 18,
        //marginLeft:7,
        color: 'rgba(23,29,52,0.76)'
    },
    item: {
        flexDirection: 'row',
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
    },
    postBackground: {
        marginBottom: 40,
        //backgroundColor: 'rgba(217,227,240,0.75)'
        backgroundColor: 'white'
    },
    place: {
        flex:1,
        fontSize: 13,
        color: 'rgba(32,38,70,0.63)'
    },
    placeIcon: {
        fontSize: 12,
        marginLeft:30,
        color : 'rgba(91,99,95,0.77)',
    },
    enlargedProfileImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    like: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        fontSize:19
    },
    likeIcon: {
        color: '#ccc',
        marginRight: 5,
        fontSize:22
    },
    liked: {
        color: 'red',
    },
    commentIcon: {
        fontSize: 24,
        marginRight: 10,
        padding:10,
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

export default Training;