import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {getComments} from "../../screens/training/CommentTraining";
import {topContent, trainingPlace} from "./TopBarTraining";
import {trainingContent, trainingPrincipalContent} from "./ContentTraining";
import {getCalification} from "./RateTraining";
import axios from "axios";

const FavTraining = ({item, canEdit}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [rating, setRating] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [showStars, setShowStars] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigation = useNavigation();

    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };

    // EDITA POST
    const handleEdit = (item) => {
        setSelectedPost(item);
        navigation.navigate('EditTrainingScreen', {post: item});
    }


    // COMENTARIOS
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


    // CALIFICACION
    const handleRate = (value) => {
        setRating(value);

        axios.post('/api/posts/rate', {
            postId: item.id,
            rating: value,
        }).then((response) => {
            // Handle the response from the server
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleStarPress = (value) => {
        setSelectedStars(value);
        setShowStars(false);
    };


    return (
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>

                    {topContent(canEdit, handleEdit, item)}

                    {trainingPlace(item)}

                    {trainingPrincipalContent(item, toggleModal)}


                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                        {/* COMENTATIOS */}
                        {getComments(handleComment, showCommentPopup, toggleCommentPopup, item, setCommentText, commentText, handleAddComment)}

                    </View>


                    {trainingContent(item)}

                    {getCalification(handleStarPress, handleRate, item)}


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
    postBackground: {
        marginBottom: 40,
        //backgroundColor: 'rgba(217,227,240,0.75)'
        backgroundColor: 'white'
    }
});

export default FavTraining;