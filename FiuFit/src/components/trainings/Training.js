import axios from "axios";
import React, {useState} from "react";
import {StyleSheet, View,Text,TouchableOpacity, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {getComments} from "../../screens/training/CommentTraining";
import {getCalification, likeTraining} from "./RateTraining";
import {favouriteTraining} from "./FavouriteTraining";
import {topContent, trainingPlace} from "./TopBarTraining";
import {trainingContent, trainingPrincipalContent} from "./ContentTraining";
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser,getErrorMessage } from "../../utils/getters";
import Client from "../../client/Client";
import CustomIconButton from "../buttons/CustomIconButton";
import { Ionicons } from "@expo/vector-icons";
import VisualizeTrainingGoal from "../../screens/Goal/VisualizeTrainingGoal";

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


    const navigation = useNavigation();

    let goals = [
        {"metric":"Adelgazar",
         "quantity":2,
         "title":"Bajar de peso",
         "description":"Bajas",
        },
        {"metric":"Caminar",
         "quantity":10,
         "title":"Caminata extrema",
         "description":"Caminas",
        },
        {"metric":"Correr",
         "quantity":22,
         "title":"COrrido tumbao",
         "description":"que le parece esa morra",
        },

    ]

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
        
        setIsLike(true)
        setLoading(true);
        setError(false)
        let userInfo = await getUser()
        let response = await Client.handleAddLike(userInfo.access_token, item.id)
        if (!response.ok) {
            setError(true);
            console.log("RESPONSE: ", response.status);
            setErrorMessage(getErrorMessage(response.status));
        } else {
            let data = await response.json()
            console.log(data)
        }
        setLoading(false);
        /*
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
        }*/
    }

    const handleDeleteLike = async () => {
        
        setIsLike(false)
        setLoading(true);
        setError(false)
        let userInfo = await getUser()
        let response = await Client.handleDeleteLike(userInfo.access_token, item.id)
        if (!response.ok) {
            setError(true);
            console.log("RESPONSE: ", response.status);
            setErrorMessage(getErrorMessage(response.status));
        } else {
            let data = await response.json()
            console.log(data)
        }
        setLoading(false);
        /*
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
        }*/
    }

    const handleLikePress = () => {
        isLike? handleDeleteLike() : handleAddLike()
    }


    const handleAddFavorite = async () => {
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
            setErrorMessage(getErrorMessage(response.status));
        } else {
            let data = await response.json()
            console.log(data)
        }
    }

    const handleDeleteFavorite = async () => {
        
        setIsFavorite(false)
        setLoading(true);
        setError(false)

        let userInfo = await getUser()
        let response = await Client.handleDeleteFavorite(userInfo.access_token, item.id)
        if (!response.ok) {
            setError(true);
            console.log("RESPONSE: ", response.status);
            setErrorMessage(getErrorMessage(response.status));
        } else {
            let data = await response.json()
            console.log(data)
        }
        /*
        setLoading(false);
        setIsFavorite(false)
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
        }*/

    }

    const handleFavoritePress = () => {
        isFavorite? handleDeleteFavorite() : handleAddFavorite()
    }


    return (
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>

                    {topContent(canEdit, handleEdit, item,user.role)}

                    {/*{trainingPlace(item)}*/}

                    {trainingPrincipalContent(item, toggleModal)}

                    {goals && (
                    <>
                        {/*<Text style = {styles.goalsTitle}>Goals</Text>*/}
                        <ScrollView style = {{padding:5}} horizontal= {true} >
                            {goals.map((goal, index) => (
                                <VisualizeTrainingGoal key={index} item={goal} />
                            ))}
                        </ScrollView>
                    
                    </>

                    )}

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            
                            {getComments(user, handleComment, showCommentPopup, toggleCommentPopup, item, setCommentText, commentText, reload)}

                           
                            {likeTraining(handleLikePress, isLike)}

                    
                        </View>

                        
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
        paddingHorizontal:10,
        borderRadius:15
    },
    button:{
        backgroundColor:"orange",

        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        width:"50%",
        alignSelf:"center",
        justifyContent:"center",
        marginLeft:25
        
    },
    postContainer: {
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    postBackground: {
        marginBottom: 40,
        //backgroundColor: 'rgba(217,227,240,0.75)'
        backgroundColor: 'white'
    },
    goalsTitle: {
        marginTop:10,
        fontSize: 18,
        //color: 'rgba(32,38,70,0.83)',
        marginHorizontal: 10,
        fontWeight:"bold"
    },

});

export default Training;