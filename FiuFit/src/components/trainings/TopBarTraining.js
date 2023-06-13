import {Image, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";
import {editPostDots,viewPostStats} from "./EditTrainingButton";
export function topContent(canEdit, handleEdit, item) {
    return <View style={styles.topContent}>
        {topBarPost(item)}
        
            <TouchableOpacity onPress={() => (console.log("started"))}
                style={styles.button}>
                <Text style={{fontSize:18,fontWeight:"bold",color:"white"}}>
                    Start
                   
                </Text>
             </TouchableOpacity>

            {viewPostStats(canEdit, handleEdit, item)}
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
    place: {
        flex:1,
        fontSize: 13,
        color: 'rgba(32,38,70,0.63)'
    },
    placeIcon: {
        fontSize: 12,
        marginLeft:30,
        color : 'rgba(91,99,95,0.77)',
    },
    button:{
        backgroundColor:"orange",
        paddingHorizontal:5,
        paddingVertical:2,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        width:"20%",
        alignSelf:"center",
        justifyContent:"center",
        marginRight:10,
        marginLeft:90,
    },
});