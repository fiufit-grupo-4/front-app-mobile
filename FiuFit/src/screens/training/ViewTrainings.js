import {FlatList} from "react-native";
import Training from "../../components/trainings/Training";
import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER, API_GATEWAY } from '../../utils/constants';
import MenuProfileScreen from "../profile/MenuProfileScreen";


function ViewTrainings({ navigation, route }) {
    const {user, reload} = route.params
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleSetUser(newData, oldData) {
        const updateUser = {
            "name": newData.name,
            "lastname": newData.lastname,
            "age": newData.age,
            "mail": newData.mail,
            "role": newData.role,
            "image": newData.image,
            "blocked": newData.blocked,
            "phone_number": newData.phone_number,
            "trainings": newData.trainings,
            "access_token": oldData.access_token,
            "token_type": oldData.token_type,
            "id": newData.id
        }
        setUser(updateUser)
        AsyncStorage.setItem(USER, JSON.stringify(updateUser)).then()
            .catch(error => {
                setError(true)
                setErrorMessage(error)
            })

    }

    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
        function getPosts() {
            setLoading(true);
            AsyncStorage.getItem(USER)
                .then((item) => {
                    let user = JSON.parse(item)
                    Promise.all([
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
                                    navigation.navigate(0)
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
        getPosts();
    }, [reload])

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <Training user={user} item={item} canEdit={true} reload={reload}/>
            )}
        />
    )
}

export default ViewTrainings;