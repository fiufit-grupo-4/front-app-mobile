import {FlatList, Image, Text, Modal, TouchableWithoutFeedback, View, StyleSheet, ActivityIndicator} from "react-native";
import {useState,useEffect} from "react";
import Training from "../../components/trainings/Training";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ( ) => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Fuerza de brazos',
            place: 'AreaX',
            description: 'Lorem ipsum dolor sit amet.',
            trainingType: 'Dolor',
            difficulty: 3,
            image: require('../../../assets/images/post1.png'),
            comments: [
                {
                    content:'muy piolita',
                    user:'pepito1',
                },
                {
                    content:'dificil',
                    user:'yoyo'
                },
                {
                    content:'muy piolita',
                    user:'pepito2',
                },
                {
                    content:'dificil',
                    user:'yoyo2'
                },
                {
                    content:'muy piolita',
                    user:'pepito3',
                },
                {
                    content:'dificil',
                    user:'yoyo3'
                },
                {
                    content:'muy piolita',
                    user:'pepito4',
                },
                {
                    content:'dificil',
                    user:'yoyo8'
                },
                {
                    content:'muy piolita',
                    user:'pepito7',
                },
                {
                    content:'dificil',
                    user:'yoyo9'
                },
                {
                    content:'muy piolita',
                    user:'pepito8',
                },
                {
                    content:'dificil',
                    user:'yoyo6'
                }
                ],
            likes: {
                length:4
            }
        },
        {
            id: 2,
            title: 'GAP',
            place: 'Gimnasio de aca la vueltitta',
            description: 'Sed ut perspiciatis unde omnis iste natus error, con un texto bien largo para ver como queda el espacio entre las cosas.',
            trainingType: 'Localizada',
            difficulty: 5,
            image: require('../../../assets/images/post2.png'),
            comments: [
                {
                    content:'horror',
                    user:'pepito1',
                },
                {
                    content:'facil',
                    user:'yoyo'
                }
            ],
            likes: {
                length:32
            }
        },
        {
            id: 3,
            title: 'Sentadillas',
            place: 'Parque LasHeras',
            description: 'Excepteur sint occaecat cupidatat non proident.',
            trainingType: 'Cola',
            difficulty: 1,
            image: require('../../../assets/images/post3.png'),
            comments: [
                {
                    content:'eeee meshi',
                    user:'pepito1',
                },
                {
                    content:'colores?',
                    user:'yoyo'
                }
            ],
            likes: {
                length:32
            }
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState({});
    const [training, setTraining] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    //const [selectedPost, setSelectedPost] = useState(null);


    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };


    useEffect(() => {
        const url = 'https://api-gateway-fiufit.herokuapp.com/users/me/'
   
        async function getUsers() {
          setLoading(true)
          AsyncStorage.getItem('accesToken').then( token =>{
            console.log(token)
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,    
                }
                }).then(response => {
                
                setLoading(false)  
                if (!response.ok) {
                    setError(true)
                    console.log(response.status)
                    if(response.status == 401){
                        setErrorMessage("Unhautorized, not valid access token")
                    } else {
                        setErrorMessage("Failed to connect with server")
                    }
                } else {
                    response.json().then(data => {
                        console.log(data)
                        setUser(data);
                    }).catch(error => {
                        setError(true)
                        setErrorMessage(error)
                    })
                }
                })
                .catch(error => {
                    setError(true)
                    setErrorMessage(error)
                })  
          }
          ).catch(error => {
            setError(true)
            setErrorMessage(error)
          }) 
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
                        <Text style={styles.profileName}>Pepito Boxeador</Text>

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
                        <Training item =  {item} canEdit={true}></Training>
                )}/>

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
