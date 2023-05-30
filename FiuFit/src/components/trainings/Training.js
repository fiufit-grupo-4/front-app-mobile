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


const Training = ({user, item, canEdit, reload, fav = false}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [rating, setRating] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [showStars, setShowStars] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [isFavorite, setIsFavorite] = useState(fav);
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
        navigation.navigate('Edit Training', {post: item});
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

    const handleAddFavorite = async () => {
        console.log(item.id)
        let url = API_GATEWAY + "users/me/trainings/" + item.id
        setIsFavorite(true)
        setLoading(true);
        setError(false)
        let storage = await AsyncStorage.getItem(USER)
        let userInfo = JSON.parse(storage)
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.access_token,
            },
        })
        setLoading(false);

        if (!response.ok) {
            setError(true);
            console.log("RESPONSE: ", response.status);
            if (response.status === 401) {
                setErrorMessage('Unauthorized, not a valid access token');
            } else {
                setErrorMessage('Failed to connect with the server');
            }
        } else {
            let data = await response.json()
            console.log(data)
        }
    }

    const handleDeleteFavorite = async () => {
        setIsFavorite(false)
        console.log(item.id)
        let url = API_GATEWAY + "users/me/trainings/" + item.id
        setLoading(true);
        setError(false)
        let storage = await AsyncStorage.getItem(USER)
        let userInfo = JSON.parse(storage)
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.access_token,
            },
        })
        setLoading(false);

        if (!response.ok) {
            setError(true);
            console.log("RESPONSE: ", response.status);
            if (response.status === 401) {
                setErrorMessage('Unauthorized, not a valid access token');
            } else {
                setErrorMessage('Failed to connect with the server');
            }
        } else {
            let data = await response.json()
            console.log(data)
        }

    }

    const handleFavoritePress = () => {
        isFavorite? handleDeleteFavorite() : handleAddFavorite()
    }


    return (
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>

                    {topContent(canEdit, handleEdit, item)}

                    {/*{trainingPlace(item)}*/}

                    {trainingPrincipalContent(item, toggleModal)}


                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                        {/* COMENTATIOS */}
                        {getComments(user, handleComment, showCommentPopup, toggleCommentPopup, item, setCommentText, commentText, reload)}

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
        //backgroundColor: 'rgba(222,233,248,0.29)'
        backgroundColor: 'white',
        paddingTop:15,
        paddingHorizontal:10
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