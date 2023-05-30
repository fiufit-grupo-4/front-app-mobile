import axios from "axios";
import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {getComments} from "../../screens/training/CommentTraining";
import {getCalification} from "../../screens/training/RateTraining";
import {favouriteTraining} from "../../screens/training/FavouriteTraining";
import {topContent, trainingPlace} from "../../screens/training/TopBarTraining";
import {trainingContent, trainingPrincipalContent} from "../../screens/training/ContentTraining";
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoriteTrainingScreen from "../../screens/training/FavoriteTrainingScreen";


const Training = ({user, item, canEdit, reload}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState(item.comments);
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
        setIsFavorite(!isFavorite);
        AsyncStorage.getItem(USER).then((item1) => {
            let user = JSON.parse(item1)
            let url = API_GATEWAY + "users/me/trainings/" + item.id
            setLoading(true)
            setError(false)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.access_token,
                },
            }).then((response) => {
                setLoading(false);
                console.log(JSON.stringify(response))
                if (!response.ok) {
                    setError(true);
                    if (response.status === 401) {
                        setErrorMessage('Unauthorized, not a valid access token');
                    } else {
                        setErrorMessage('Failed to connect with the server');
                    }
                } else {
                    response.json().then((data) => {
                        console.log(JSON.stringify(data))
                        //navigation.goBack();
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    });
                }}).catch((error) => {
                setError(true);
                setErrorMessage(error);
            })
        }).catch((error) => {
            setError(true);
            setErrorMessage(error);
        })
    }


    return (
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>

                    {topContent(canEdit, handleEdit, item)}

                    {trainingPlace(item)}

                    {trainingPrincipalContent(item, toggleModal)}


                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                        {/* COMENTATIOS */}
                        {getComments(user, handleComment, showCommentPopup, toggleCommentPopup, item, setCommentText, commentText, reload)}

                        {/* FAVORITOS */}
                        {favouriteTraining(handleFavoritePress, isFavorite)}

                    </View>


                    {trainingContent(item)}

                    {/*
                    {getCalification(handleStarPress, handleRate, item)}
                    r*/}

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