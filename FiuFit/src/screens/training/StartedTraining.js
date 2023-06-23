import {ActivityIndicator, View, ScrollView} from "react-native";
import Training from "../../components/trainings/Training";
import {useEffect, useState} from "react";
import { useIsFocused,useNavigation } from '@react-navigation/native';
import { getUser,getErrorMessage } from "../../utils/getters";
import Client from "../../client/Client";
import Errors from "../../components/utils/Error";


const StartedTraining = ( {route} ) => {
    const {id} = route.params
    const isFocused = useIsFocused();
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({
    });
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        async function getTraining() {
            setLoading(true);
            let userInfo = await getUser()
            setUser(userInfo)
            Client.getTrainingsById(userInfo.access_token,id).then( response => {
                setItem(response)
                setShow(true)
                console.log(response)
                setLoading(false);
            }).catch( error =>{
                setLoading(false);
                console.log(error)
            })
            
        }
        getTraining();
    }, [isFocused])
    return (
        <ScrollView style={{ padding: 10 }}>
            { loading ?
                <View style={{marginTop:300, marginBottom:150,transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
            : show
                ? <Training user = {user} item =  {item} canEdit={false}> </Training>
                : <Errors message={"Failed to connect with server"} icon={"construct-outline"}></Errors>   
            }
            
        </ScrollView>
     )
}

export default StartedTraining;
