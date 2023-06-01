import {FlatList,ActivityIndicator,View,Text} from "react-native";
import Training from "../../components/trainings/Training";
import React,{useState,useEffect} from 'react';
import {API_GATEWAY } from '../../utils/constants';
import TrainingListItem from "../search/TrainingListItem";
import Client from "../../client/Client";
import { useIsFocused } from '@react-navigation/native';
import { getUser } from "../../utils/getters";

function ViewTrainings({ navigation,route }) {
    const {user, myUser} = route.params
    const [trainings,setTrainings] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [notTrainigs, setNotTrainigs] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {

        async function getTrainings() {
            setLoading(true)

            if (myUser){
                Client.getMyTrainings(user.access_token)
                    .then((response) => {
                        console.log(JSON.stringify(response))
                        setTrainings(response)
                        setLoading(false) 
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error.toString());
                        setLoading(false)
                    })
            } else {
                let userInfo = await getUser()
                Client.getTrainingsById(userInfo.access_token,user.id)
                .then((response) => {
                    console.log(JSON.stringify(response))
                    setTrainings(response)
                    setLoading(false) 
                }).catch((error) => {
                    setError(true);
                    setErrorMessage(error.toString());
                    setLoading(false)
                })
            }
            }
            getTrainings();
        }, [isFocused])

    return (
        <>
            {loading 
                ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                : <>
                    <View style={{padding:10 }}>
                        <FlatList
                        data={trainings}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={{marginTop:10 }}>
                                <TrainingListItem user={user} item={item} canEdit={myUser}></TrainingListItem>  
                            </View>
                        )}
                        />
                    </View>
                    {notTrainigs && (
                        <View style = {{alignItems:"center",marginTop:15}}>
                            <Text style = {{fontSize:18}}> You don't have any trainings yet  </Text>
                        </View>
                    )}
                    {error && (
                        <View style = {{alignItems:"center",marginTop:15}}>
                            <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                        </View>
                    )}
                </>
                
            }         
        </>
        
      
    )
}

export default ViewTrainings;