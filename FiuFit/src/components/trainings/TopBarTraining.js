import {Image, Text, View, TouchableOpacity, StyleSheet,ActivityIndicator} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React, {useState} from "react";
import { TRAINER } from "../../utils/constants";
import {editPostDots,viewPostStats} from "./EditTrainingButton";
import Client from "../../client/Client";
import { getUser } from "../../utils/getters";


export function topContent(canEdit, handleEdit, item,user) {
    const [state, setState] = useState(item.state);
    const [loading, setLoading] = useState(false);

    const handleStartPress = async () => {
        setLoading(true)
        let user = await getUser()
        let response = await Client.startTraining(user.access_token,item.id)
        setLoading(false)
        if (!response.ok) {
            console.log(response.status)
        } else {
            setState("INIT")
        }
        
    };

    const handleStopPress = async () => {
        setLoading(true)
        let user = await getUser()
        let response = await Client.stopTraining(user.access_token,item.id)
        setLoading(false)
        if (!response.ok) {
            console.log(response.status)
        } else {
            setState("STOP")
        }
        
    };


    return <View style={styles.topContent}>
        {topBarPost(item)}
        
            {user.role != TRAINER && (
                <> 
                { loading 
                  ? <View style = {styles.buttonStart}> 
                        <ActivityIndicator size = "small" color = "white"></ActivityIndicator>
                    </View>
                  : <>
                  { state == "NOT_INIT" && (
                    <TouchableOpacity style={styles.buttonStart} onPress={handleStartPress}>
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                    )}
                    { state == "INIT" && (
                        <TouchableOpacity style={styles.buttonStop} onPress={handleStopPress}>
                            <Text style={styles.buttonText}>Stop</Text>
                        </TouchableOpacity>
                    )}

                    { state == "STOP" && (
                        <TouchableOpacity style={styles.buttonStart} onPress={handleStartPress}>
                            <Text style={styles.buttonText}>Resume</Text>
                        </TouchableOpacity>
                    )}

                    { state == "COMPLETE" && (
                        <View style={styles.stats}>
                            <Ionicons name={'checkbox-outline'} style={styles.icon}/>
                        </View>
                    )}
                  </>
                }


                
                
                
                </>
            )}
            

            {viewPostStats(canEdit, item)}
            {editPostDots(canEdit, handleEdit, item)}
        </View>;
}

export function topBarPost(item) {
    return <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/*<Image source={require('../../../assets/images/profilepic.jpeg')}
               style={styles.profileImage}/>*/}
        <Text style={styles.name}>{item.title}</Text>
    </View>;
}

export function trainingPlace(item) {
    return <View style={styles.item}>
        <Ionicons name={'md-pin-outline'} style={styles.placeIcon} />
        <Text style={styles.place}>{item.place}</Text>
    </View>;
}


const styles = StyleSheet.create({
    topContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileImage: {
        width: 22,
        height: 22,
        borderRadius: 30,
        marginLeft: 5
    },
    name: {
        fontSize: 22,
        color: 'rgba(23,29,52,0.93)',
        marginHorizontal: 10,
        fontWeight:"bold"
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    buttonStart:{
        backgroundColor:"orange",
        paddingHorizontal:5,
        paddingVertical:2,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        width:"25%",
        alignSelf:"center",
        justifyContent:"center",
        marginRight:10,   
    },

    buttonStop:{
        backgroundColor:"crimson",
        paddingHorizontal:5,
        paddingVertical:2,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        width:"25%",
        alignSelf:"center",
        justifyContent:"center",
        marginRight:10,   
    },
    buttonText: {fontSize:18,fontWeight:"bold",color:"white"},
    icon: {
        fontSize: 28, 
        color : 'green',
    },
    edit: {
        flexDirection: 'row',
        padding: 5,
    },
    stats: {
        position: 'absolute',
        top: -5,
        right: 0,
        padding:5
    }

});