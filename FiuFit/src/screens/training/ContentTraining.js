import {StyleSheet, Text, View} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";

export function trainingContent(item) {
    return <>
        <View style={styles.item}>
            <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
        </View>

        <View style={styles.item}>
            <Ionicons name={'fitness-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Training Type: ' + item.trainingType}</Text>
        </View>

        <View style={styles.item}>
            <Ionicons name={'ios-stats-chart-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Difficulty: ' + item.difficulty}</Text>
        </View>
    </>;
}

const styles = StyleSheet.create({
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