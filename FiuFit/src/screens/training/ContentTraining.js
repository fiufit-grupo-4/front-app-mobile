import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";


export function trainingPrincipalContent(item, toggleModal) {
    return <>
        <View style={{padding: 5}}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => toggleModal(item.image)}>
            <Image source={item.image} style={styles.postImage}/>
        </TouchableWithoutFeedback>
    </>;
}

export function trainingContent(item) {
    return <>
        <View style={styles.item}>
            <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
        </View>

        <View style={styles.item}>
            <Ionicons name={'fitness-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Training Type: ' + item.type}</Text>
        </View>

        <View style={styles.item}>
            <Ionicons name={'ios-stats-chart-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Difficulty: ' + item.difficulty}</Text>
        </View>
    </>;
}

const styles = StyleSheet.create({
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
        flexDirection: 'row',
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
    }
});