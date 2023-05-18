import {FlatList, Image, Text, Modal, TouchableWithoutFeedback, View, StyleSheet, ActivityIndicator} from "react-native";
import {useState,useEffect} from "react";
import Training from "../../components/trainings/Training";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER, API_GATEWAY } from '../../utils/constants';


const ProfileScreen = ( ) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState({});
    const [training, setTraining] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    //const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);

    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };


    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
        function getUsers() {
            setLoading(true);
            AsyncStorage.getItem(USER)
                .then((item) => {
                    let user = JSON.parse(item)
                    Promise.all([
                        fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + user.access_token,
                            },
                        }).then((response) => {
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
                                response.json().then((data) => {
                                    setUser(data);
                                }).catch((error) => {
                                    setError(true);
                                    setErrorMessage(error);
                                });
                            }
                        }).catch((error) => {
                            setError(true);
                            setErrorMessage(error);
                        }),
                        fetch(API_GATEWAY + 'trainers/me/trainings', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + user.access_token,
                            },
                        }).then((response) => {
                            if (response.ok) {
                                response.json().then((data) => {
                                    console.log("POSTS: ", data);
                                    setPosts(data);
                                }).catch((error) => {
                                    setError(true);
                                    setErrorMessage(error);
                                });
                            } else {
                                setError(true);
                                setErrorMessage('Failed to fetch posts');
                            }
                        }).catch((error) => {
                            setError(true);
                            setErrorMessage(error);
                        }),
                    ]);
                })
                .catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                });
        }
        getUsers();
    }, [])

    return (
        <View style={{ flex: 1,padding: 1 }}>

            { loading 
             ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                <ActivityIndicator size="large" color = "black"/>
               </View>
             : <>
             <StatusBar style="auto" />
                <View style={styles.profileBar}>
                    <TouchableWithoutFeedback onPress={() => toggleModal(require('../../../assets/images/profilepic.jpeg'))}>
                        <Image source={require('../../../assets/images/profilepic.jpeg')} style={styles.profileImage} />
                    </TouchableWithoutFeedback>
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.profileName}>{user.name + " " + user.lastname}</Text>

                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.profileFollow}>3 Followers</Text>
                            <Text style={styles.profileFollow}>213 Following</Text>
                        </View>

                    </View>
                </View>

                <Modal visible={showModal} transparent={true}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                            <Image source={selectedImage} style={styles.enlargedProfileImage} />
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>

                    <FlatList
                        data={posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Training user={user} item={item} canEdit={true} />
                        )}
                    />

                {error && (
                    <View style = {{alignItems:"center"}}>
                    <Text style = {{fontSize:18,color : "crimson",padding:5}}> {errorMessage} </Text>
                    </View>
                )}
             
               </>
            }
                
        </View>
     )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileName: {
        marginLeft: 10,
        fontSize: 20,
        color:'rgba(23,29,52,0.93)'
    },
    profileBar: {
        flexDirection: 'row',
        alignItems: 'center',padding:9,
        backgroundColor:'white'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.64)',
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
    profileFollow: {
        marginLeft: 10,
        fontSize: 15,
        color:'rgba(23,29,52,0.93)'
    }
});

export default ProfileScreen;
