import {FlatList, View, StyleSheet, Text} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from '@react-navigation/native';
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavTraining from "../../components/trainings/favTrainings";

const FavoriteTrainingScreen = () => {
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();

    //const getFavoriteTrainings = () => {
    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
        function getUsers() {
            console.log("tenemos favs??? veamos")
            setLoading(true);
            AsyncStorage.getItem(USER)
                .then((item1) => {
                    let user = JSON.parse(item1)
                        fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + user.access_token,
                            },
                        }).then((response) => {

                            if (response.ok) {
                                response.json().then((data) => {
                                    console.log("POSTS faaaaavs: ", data);
                                    setUser(data);
                                    if (data && data.trainings) {
                                        setPosts(data.trainings);
                                    }
                                    console.log("SE GUARDARON LOS Fvsposts como: ", posts)
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
                        })
                })
                .catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                });
        }
        getUsers();
    }, [])


    return (
        <View>
            <Text>Hola estoy aca, soy tus favs</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <FavTraining user={user} item={item} canEdit={false} />
                )}
            />
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

export default FavoriteTrainingScreen;