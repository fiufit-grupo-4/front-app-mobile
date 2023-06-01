import {ScrollView, TouchableOpacity, View, StyleSheet,ActivityIndicator} from "react-native";
import Training from "../../components/trainings/Training";
import {useEffect, useState} from "react";
import { useIsFocused } from '@react-navigation/native';
import { API_GATEWAY,USER } from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser,getErrorMessage } from "../../utils/getters";

const FavoriteTrainingProfile = ( {route} ) => {
    const {id} = route.params
    const [training,setTraining] = useState(
        {
            "id": "string",
            "trainer": {
              "id": "string",
              "name": "string",
              "lastname": "string"
            },
            "title": "string",
            "description": "string",
            "type": "Caminata",
            "difficulty": 5,
            "media": [],
            "comments": [],
            "scores": [],
            "blocked": false
          }
    )
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const url = API_GATEWAY + 'trainings/' + id.toString()
        async function getTraining() {
            setLoading(true);
            let storage = await AsyncStorage.getItem(USER)
            let userInfo = JSON.parse(storage)
            setUser(userInfo)
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
            })
            if (!response.ok) {
                setError(true);
                setErrorMessage(getErrorMessage(response.status))
                setLoading(false);
            } else {
                let data = await response.json()
                setTraining(data)
                setLoading(false);
            }
        }
        getTraining();
    }, [isFocused])

    return (

        <View style={{ padding: 1, marginHorizontal:10,marginTop:10  }}>
            { loading 
                ? <View style={{marginTop:315, transform: [{ scaleX: 2.2 }, { scaleY: 2.2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
                :<ScrollView>
                    <Training item =  {training} user= {user} canEdit={false} fav = {true}> </Training>
                </ScrollView>
            }
            {error && (
                <View style = {{alignItems:"center",marginTop:15}}>
                    <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                </View>
            )}
        </View>
     )
}

export default FavoriteTrainingProfile;