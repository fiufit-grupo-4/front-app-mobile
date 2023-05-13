import axios from "axios";
import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {getComments} from "../../screens/training/CommentTraining";
import {getCalification} from "../../screens/training/RateTraining";
import {favouriteTraining} from "../../screens/training/FavouriteTraining";
import {topContent, trainingPlace} from "../../screens/training/TopBarTraining";
import {trainingContent, trainingPrincipalContent} from "../../screens/training/ContentTraining";


const Training = ({item, canEdit}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [rating, setRating] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [showStars, setShowStars] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

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

    function onPress() {
        navigation.navigate("Training", {item})
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

    // AGREGAR/SACAR DE FAVORITOS

    const handleFavoritePress = () => {
        //todo meter o sacar de los favs wacho
        setIsFavorite(!isFavorite);
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

                        {/* FAVORITOS */}
                        {favouriteTraining(handleFavoritePress, isFavorite)}

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

export default Training;