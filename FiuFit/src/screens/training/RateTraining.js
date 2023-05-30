import React, { useState } from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Ionicons} from "react-native-vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Rating = ({ onRate}) => {
    const [rating, setRating] = useState(0);

    const handleRate = (value, item) => {
        //setRating(value);
        //onRate(value);
        let url = API_GATEWAY + "trainings/" + item.id + "/score"
        //setLoading(true);
        //setError(false)
        //let image = profilePicture ? profilePicture : user.image
        AsyncStorage.getItem(USER).then((item) => {
            let userInfo = JSON.parse(item)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
                body: JSON.stringify({
                    "qualification": value,
                })
            }).then((response) => {
                setLoading(false);
                console.log(JSON.stringify(response))
                if (!response.ok) {
                    setError(true);
                    if (response.status === 401) {
                        setErrorMessage('Unauthorized, not a valid access token');
                    } else {
                        setErrorMessage('Failed to connect with the server');
                    }
                } else {
                    response.json().then((data) => {
                        console.log(JSON.stringify(data))
                        //navigation.navigate("Profile",{reload:!reload})
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    });
                }})}).catch((error) => {
            setError(true);
            setErrorMessage(error);
        })

    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:11, marginLeft: -20}}>
            {[1, 2, 3, 4, 5].map((value) => (
                <TouchableWithoutFeedback key={value} onPress={() => handleRate(value)}>
                    <Icon name={value <= rating ? 'flash' : 'flash-outline'} size={22} color="#FDB813" />
                </TouchableWithoutFeedback>
            ))}
            <Text style={{ marginLeft: 10 }}>{rating > 0 ? ' ' + ' ' : ' '}</Text>
        </View>
    );
};


export function getCalification(handleStarPress, handleRate, item) {
    return <>
        {/* Calificacion */}
        <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback onPress={handleStarPress}>
                <Ionicons name={"md-ribbon-outline"} style={styles.qualifyIcon}/>
            </TouchableWithoutFeedback>
            <Rating onRate={handleRate(item)}/>
            {/*<Text style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                color: 'rgba(23,29,52,0.71)'
            }}>{'Average:  ' + item.likes.length}</Text>
            */}
        </View>
    </>;
}

const styles = StyleSheet.create({
    qualifyIcon :{
        fontSize: 0,
        marginRight: 10,
        padding:8,
        marginTop:12,
        color: 'rgba(32,38,70,0.7)'
    }
});

