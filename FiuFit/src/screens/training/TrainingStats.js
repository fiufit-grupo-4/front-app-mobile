import {FlatList,ActivityIndicator,View,Text,StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React,{useState,useEffect} from 'react';
import Client from "../../client/Client";
import { useIsFocused } from '@react-navigation/native';
import { getUser,getErrorMessage } from "../../utils/getters";

function TrainingStats({ navigation,route}) {
    const {item} = route.params;
    const [stats,setStats] = useState({"count_comments": 0, "count_favorites": 0, "count_scores": 0})
    const [loading, setLoading] = useState(false);
   
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const isFocused = useIsFocused();


    useEffect(() => {

        async function getStats() {
            setLoading(true)
            setError(false)
            let userInfo = await getUser()
            let response = await Client.getTrainingStats(userInfo.access_token,item.id)
            if (!response.ok){
                setLoading(false)
                setError(true)
                setErrorMessage(getErrorMessage(response.status))
            } else {
                let data = await response.json()
                console.log(data)
                setStats(data)
                setLoading(false)
            }
            }
            getStats();
        }, [isFocused,])

    return (
        <>
            {loading 
                ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                : <>
                    <View style={ styles.background}>
                        <View style={styles.postContainer}>
                            <View style={styles.postBackground}>
                                <View style={newstyles.container}>
                                    <View style={newstyles.header}> 
                                        <Text style={newstyles.titulo}>{"Stats: " + item.title} </Text>                 
                                    </View>
                                </View>
                                
                                <View style={styles.item}>
                                    <Ionicons name={'chatbox-ellipses-outline'} style={styles.icon}/>
                                    <Text style={styles.description}>{"Comments: " + stats.count_comments}</Text>
                                </View>
                                <View style={styles.item}>
                                    <Ionicons name={'heart-outline'} style={styles.icon}/>
                                    <Text style={styles.description}>{"Likes: " + stats.count_scores}</Text>
                                </View>
                                <View style={styles.item}>
                                    <Ionicons name={'star-outline'} style={styles.icon}/>
                                    <Text style={styles.description}>{"Favorites: " + stats.count_favorites}</Text>
                                </View>
                                

                            </View>
                        </View>
                    </View>

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

export default TrainingStats;


const styles = StyleSheet.create({
    background: {
        width:"90%",
        paddingHorizontal:5,
        margin:25,
        borderRadius:15,
        backgroundColor:"white",
        alignSelf:"center",
        

    },

    postBackground: {
        marginBottom: 15,
        
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    icon: {
        fontSize: 18,
       
        marginLeft: 8
    },
    description: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18,
        padding: 5,
       

    },

});





const newstyles = {
    container: {
        padding: 10,
        borderRadius:10,

    },name: {
        fontSize: 16,
        color: 'rgba(23,29,52,0.93)',
        marginHorizontal: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        borderBottomWidth:1,
        borderBottomColor: "rgba(255,164,92,0.74)"
    },
    tituloCompleted: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'gray',
        borderBottomWidth:1,
        borderBottomColor: "#50C878"
    },


};