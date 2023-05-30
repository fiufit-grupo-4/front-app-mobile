import {FlatList,ActivityIndicator,View,Text} from "react-native";
import Training from "../../components/trainings/Training";
import React,{useState,useEffect} from 'react';
import {API_GATEWAY } from '../../utils/constants';


function ViewTrainings({ navigation,route }) {
    const {user, reload} = route.params
    const [trainings,setTrainings] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [notTrainigs, setNotTrainigs] = useState(false);



    useEffect(() => {
        const url = API_GATEWAY + 'trainers/me/trainings?'
        var query = new URLSearchParams({
            limit: 128
        })
        console.log(url + query)
        async function getTrainings() {
            setLoading(true)
            fetch(url + query, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.access_token,
                    },
                }).then((response) => {
                    setLoading(false);
                    if (!response.ok) {
                        console.log(response.status)
                        setError(true);
                        if (response.status == 404) {
                           setNotTrainigs(true)
                        } else {
                            setErrorMessage('Failed to connect with the server');
                        }

                    } else {
                        response.json().then((data) => {
                            console.log(JSON.stringify(data))
                            setTrainings(data)
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    });
                }}).catch((error) => {
                    setError(true);
                    setErrorMessage(error);
            })}
            getTrainings();
        }, [])

    return (
        <>
            {loading 
                ? <View style={{marginTop:50, marginHorizontal: 40}}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
                : <>
                    <View style={{padding:10 }}>
                        <FlatList
                        data={trainings}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={{marginTop:10 }}>
                                <Training user={user} item={item} canEdit={true} reload={true}/>
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