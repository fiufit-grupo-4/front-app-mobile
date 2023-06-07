import axios from "axios";
import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ScrollView, ActivityIndicator, FlatList, Image, TouchableOpacity} from "react-native";
import Errors from "../../components/utils/Error";
import GoalsListItem from "./GoalsListItem";


const ViewGoal = ({route}) => {
    const {user, item, challengeId, canEdit} = route.params
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [notGoals, setNotGoals] = useState(false);
    const [challengeGoals, setChallengeGoals] = useState([])


    const metric1 = [
        {
            "id": 1,
            "athlete": "ti",
            "challengeId": 1,
            "title": "Weight Loss",
            "description": "ABS con fuerza mistica del mas alla",
            "type": "Caminata",
            "difficulty": 2,
        },
        {
            "id": 2,
            "athlete": "ti",
            "challengeId": 1,
            "title": "Muscle Building",
            "description": "Increase muscle with pesitas",
            "type": "Caminata",
            "difficulty": 5
        },
        {
            "id": 3,
            "athlete": "ti",
            "challengeId": 2,
            "title": "Cardiovascular Endurance",
            "description": "MMMM",
            "type": "Running",
            "difficulty": 5
        },
        {
            "id": 4,
            "athlete": "ti",
            "challengeId": 2,
            "title": "Flexibility and Mobility",
            "description": "mas abs",
            "type": "Running",
            "difficulty": 4
        },
        {
            "id": 5,
            "athlete": "ti",
            "challengeId": 2,
            "title": "Overall Fitness and Well-being aaaaa",
            "description": "GAP",
            "type": "Running",
            "difficulty": 3
        }
    ]


    useEffect(() => {
            setChallengeGoals(metric1.filter((goal) => (challengeId === goal.challengeId)))
    },
    [])


    return (
        <>
            {loading
                ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
            </View>

                : <>
                    {metric1.length === 0
                        ? <Errors message={"This athlete dont have any goal yet"} icon={"image-outline"}></Errors>
                        : <View style={{padding:10 }}>
                            <FlatList
                                data={challengeGoals}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <View style={{marginTop:10 }}>
                                        <GoalsListItem user={user} item={item} canEdit={user}></GoalsListItem>
                                    </View>
                                )}
                            />
                        </View>
                    }

                    {notGoals && (
                        <View style = {{alignItems:"center",marginTop:15}}>
                            <Text style = {{fontSize:18}}> You don't have any goals yet  </Text>
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