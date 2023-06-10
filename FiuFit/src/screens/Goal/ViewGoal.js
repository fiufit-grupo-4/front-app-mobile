import axios from "axios";
import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ActivityIndicator, FlatList} from "react-native";
import Errors from "../../components/utils/Error";
import GoalsListItem from "./GoalsListItem";


const ViewGoal = ({route}) => {
    const {user} = route.params
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const goals = [
        {
            "id": "1",
            "title": "Caminata",
            "description": "Caminar por palermo 1 hora, haciendo dos breves pausas de 5 minutos. ",
            "metric": "Distancia recorrida",
            "limit_time": "2023-07-08T15:26:20.558Z",
            "quantity": 0,
            "progress": 0,
            "difficulty": 2,
        },
        {
            "id":"2",
            "title": "Caminata",
            "description": "Caminar por palermo 5 hora",
            "metric": "Distancia recorrida",
            "limit_time": "2023-07-08T15:26:20.558Z",
            "quantity": 0,
            "progress": 0,
            "difficulty": 3,
        },
        {
            "id":"3",
            "title": "Abdominales",
            "description": "1.30 de abs.",
            "metric": "Calorias utilizadas",
            "limit_time": "2023-07-08T15:26:20.558Z",
            "quantity": 0,
            "progress": 0,
            "difficulty": 4,
        },
        {
            "id":"4",
            "title": "GAP",
            "description": "abs ggggggg oppp ",
            "metric": "Calorias utilizadas",
            "limit_time": "2023-07-08T15:26:20.558Z",
            "quantity": 0,
            "progress": 0,
            "difficulty": 4,
        },
        {
            "id":"5",
            "title": "GAPX2",
            "description": "abs ggggggg oppp ",
            "metric": "Calorias utilizadas",
            "limit_time": "2023-07-08T15:26:20.558Z",
            "quantity": 0,
            "progress": 0,
            "difficulty": 5,
        },
    ]

    return (
        <>
            {loading
                ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
            </View>

                : <>
                    {goals.length === 0
                        ? <Errors message={"This athlete dont have any goal yet"} icon={"image-outline"}></Errors>
                        : <View style={{padding:10 }}>
                            <FlatList
                                data={goals}
                                keyExtractor={(goalItem) => goalItem}
                                renderItem={({item}) => (
                                    <View style={{marginTop:10 }}>
                                        <GoalsListItem item={item} user={user} ></GoalsListItem>
                                    </View>
                                )}
                            />
                        </View>
                    }

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

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        paddingTop:15,
        paddingHorizontal:10
    },
    postBackground: {
        marginBottom: 40,
        backgroundColor: 'white'
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    title: {
        borderTopWidth: 1,
        borderTopColor: 'orange',
        fontSize: 18,
        //marginLeft:7,
        color: 'rgba(23,29,52,0.76)'
    },
    item: {
        alignItems: 'center'
    },
    itemText: {
        marginLeft: 5,
        marginRight: 14,
        fontSize: 15,
        padding: 6,
        color: 'rgba(32,38,70,0.63)'
    },
    icon: {
        fontSize: 12,
        color: 'rgba(32,38,70,0.63)',
        marginLeft: 8
    },
    postContainer: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    postDescription: {
        fontSize: 14,
        marginTop: 5,
    },
    mediaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    image: {
        width: 300,
        height: 300,
    }
});

export default ViewGoal;