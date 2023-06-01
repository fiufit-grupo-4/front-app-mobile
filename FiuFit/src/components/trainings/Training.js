import axios from "axios";
import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {getComments} from "../../screens/training/CommentTraining";
import {getCalification, likeTraining} from "./RateTraining";
import {favouriteTraining} from "./FavouriteTraining";
import {topContent, trainingPlace} from "./TopBarTraining";
import {trainingContent, trainingPrincipalContent} from "./ContentTraining";
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
    const [postLiked, setPostLiked] = useState(false)
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

    /*LIKES*/
    const isliked = (item, user) => {
        return item.scores.some((score) => (score?.user.id === user.id));
    };

    const [isLike, setIsLike] = useState(isliked(item, user));

    const handleAddLike = async () => {
        console.log(item.id)
        console.log(item.scores)
        let url = API_GATEWAY + 'trainings/' + item.id + '/score';
        setIsLike(true)
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
            body: JSON.stringify({
                "qualification": 1
            })
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

    const handleDeleteLike = async () => {
        setIsLike(false)
        console.log(item.id)
        let url = API_GATEWAY + 'trainings/' + item.id + '/score';
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

    const handleLikePress = () => {
        isLike? handleDeleteLike() : handleAddLike()
    }

    /*FAVORITES*/
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

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {/* COMENTATIOS */}
                            {getComments(user, handleComment, showCommentPopup, toggleCommentPopup, item, setCommentText, commentText, reload)}

                            {/* LIKES */}
                            {likeTraining(handleLikePress, isLike)}
                        </View>

                        {/* FAVORITOS */}
                        {favouriteTraining(handleFavoritePress, isFavorite)}


                    </View>


                    {trainingContent(item)}




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