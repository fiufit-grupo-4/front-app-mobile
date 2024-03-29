import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Ionicons} from "react-native-vector-icons";

function Goal({ item, user, canEdit, navigation }) {

    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
});

export default Goal;