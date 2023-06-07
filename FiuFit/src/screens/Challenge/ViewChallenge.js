import axios from "axios";
import React, {useState} from "react";
import {StyleSheet, View, Text, ScrollView, ActivityIndicator, FlatList, Image, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Errors from "../../components/utils/Error";
import ChallengeListItem from "./ChallengeListItem";


const ViewChallenge = ({user, item, canEdit}) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [notGoals, setNotGoals] = useState(false);

    const navigation = useNavigation();


    const challenge1 = [
        {
            "id": 1,
            "athlete": "ti",
            "title": "Challenge1",
            "type": "Caminata",
            "description": "Achieve a healthy weight by losing excess body fat through a combination of proper nutrition and regular exercise."
        },
        {
            "id": 2,
            "athlete": "ti",
            "title": "Challenge2",
            "type": "Running",
            "description": "Increase muscle mass and strength by following a structured resistance training program and consuming adequate protein."
        },
        {
            "id": 3,
            "athlete": "ti",
            "title": "Challenge3",
            "type": "Caminata",
            "description": "Improve cardiovascular fitness and stamina through activities such as running, cycling, or swimming."
        }
    ]


    return (
        <>
            {loading
                ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>

                : <>
                    {challenge1.length === 0
                        ? <Errors message={"This athlete dont have any goal yet"} icon={"image-outline"}></Errors>
                        : <View style={{padding:10 }}>
                            <FlatList
                                data={challenge1}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <View style={{marginTop:10 }}>
                                        <ChallengeListItem user={user} item={item} canEdit={user}></ChallengeListItem>
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
        //backgroundColor: 'rgba(222,233,248,0.29)'
        backgroundColor: 'white',
        paddingTop:15,
        paddingHorizontal:10
    },
    postBackground: {
        marginBottom: 40,
        //backgroundColor: 'rgba(217,227,240,0.75)'
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
        //flexDirection: 'row',
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

export default ViewChallenge;