import {Image, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Modal} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import {useState, FC, Fragment} from "react";
import {useNavigation} from "@react-navigation/native";
import {Card, Divider} from 'react-native-paper';

const Training = ({item, canEdit}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

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


{/*
                    <View style={styles.bottomContent}>
                        <TouchableWithoutFeedback onPress={handleComment}>
                            <Ionicons name={'chatbox-outline'} style={styles.commentIcon}/>
                        </TouchableWithoutFeedback>
                        <Text style={styles.commentText}>{item.comments.length}</Text>
                        <Modal visible={showCommentPopup}>

                            <View style={styles.commentPopUp}>
                                {item.comments.map((comment) => (
                                    <View style={styles.commentItem}>
                                        <Text style={styles.commentUsername}>{comment.user}</Text>
                                        <Text style={styles.commentContent}>{comment.content}</Text>
                                    </View>
                                ))}
                                <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                                    <Ionicons name={'close-circle'} style={styles.closeIcon}/>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
*/}

                    <View style={styles.bottomContent}>

                        <View style={styles.like}>
                            <TouchableWithoutFeedback onPress={handleLike}>
                                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} style={[styles.likeIcon, {color: isLiked ? 'red' : '#5B635F'}]}/>
                            </TouchableWithoutFeedback>
                            <Text style={styles.likeText}>{item.likes.length}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={onPress}></TouchableOpacity>

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
        backgroundColor: 'rgba(222,233,248,0.29)'
    },
    postContainer: {
        backgroundColor: 'white',
        //borderRadius: 10,
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
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    comment: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentContainer: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    commentIcon: {
        fontSize: 24,
        marginRight: 5,
        color: '#8B8B8B'
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333'
    },
    commentList: {
        marginTop: 10
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    commentAuthor: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#333333'
    },
    commentText: {
        fontSize: 16,
        color: '#333333'
    },
    commentUsername: {
        fontWeight: 'bold',
        marginRight: 5,
    },

    commentContent: {
        marginLeft: 5,
    },

    commentPopUp: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
    },

    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    }
});

export default Training;