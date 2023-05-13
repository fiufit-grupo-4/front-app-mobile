import {Image, Text, View, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";
import {editPostDots} from "./EditTrainingButton";



export function topContent(canEdit, handleEdit, item) {
    return <View style={styles.topContent}>
        {topBarPost()}
        {editPostDots(canEdit, handleEdit, item)}
    </View>;
}

export function topBarPost() {
    return <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={require('../../../assets/images/profilepic.jpeg')}
               style={styles.profileImage}/>
        <Text style={styles.name}>{'Pepito Boxeador'}</Text>
    </View>;
}

export function trainingPlace(item) {
    return <View style={styles.item}>
        <Ionicons name={'md-pin-outline'} style={styles.placeIcon}/>
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
        fontSize: 16,
        color: 'rgba(23,29,52,0.93)',
        marginHorizontal: 10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    place: {
        flex:1,
        fontSize: 13,
        color: 'rgba(32,38,70,0.63)'
    },
    placeIcon: {
        fontSize: 12,
        marginLeft:30,
        color : 'rgba(91,99,95,0.77)',
    }
});