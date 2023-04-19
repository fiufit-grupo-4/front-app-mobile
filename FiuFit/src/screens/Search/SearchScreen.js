import React from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import styles from "../../styles/styles";

const Tab = createMaterialTopTabNavigator();


export const SearchScreen = () => {
        return (
            <View style={searchStyle.container}>
                <View style={searchStyle.buttonContainer}>
                    <Button title="Trainers"/>
                </View>
                <View style={searchStyle.buttonContainer}>
                    <Button title="Training"/>
                </View>
            </View>
        );
}


const searchStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1,
        borderRadius: 4,
        paddingVertical: 3,
        color: '#ffffff'
    }
});
