import {ScrollView, TouchableOpacity, View, StyleSheet} from "react-native";
import Training from "../../components/trainings/Training";
import {useEffect, useState} from "react";
import { useIsFocused } from '@react-navigation/native';
import { API_GATEWAY,USER } from "../../utils/constants";

const TrainingProfile = ( {route} ) => {
    const {item, user} = route.params
    const [training,setTraining] = useState(null)
    const isFocused = useIsFocused();

    /*
    useEffect(() => {
        const url = API_GATEWAY + 'trainings/' + item.training_id.toString()
        async function getUsers() {
            setLoading(true);
            let storage = await AsyncStorage.getItem(USER)
            let userInfo = JSON.parse(storage)
            let response = await fetch(url, {
                method: 'GET',
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
                setUser(data)
                setPosts(data.trainings);
                //await handleSetUser(data,user)
            }
        }
        getUsers();
    }, [isFocused])*/

    return (

        <View style={{ padding: 1, marginHorizontal:10,marginTop:10  }}>
            <ScrollView>
                 <Training item =  {item} user={user} canEdit={false}> </Training>
            </ScrollView>
            
        </View>
     )
}

export default TrainingProfile;