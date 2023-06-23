import axios from "axios";
import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import {FontAwesome} from "@expo/vector-icons";


const FirstMessageView = ({item}) => {

    return (
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>
                    <View key = {item.id} style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.titulo}>{item.name}</Text>
                            <Ionicons name="mail" size={20} style={styles.icon} />
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        paddingHorizontal:10,
        marginLeft:5,
        marginRight:5,
        borderRadius:10,

    },
    postBackground: {
        marginBottom: 15,
        backgroundColor: 'white'
    },
    icon: {
        color: "rgb(255,164,92)"
    },
    container: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius:10,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'rgba(32,38,70,0.99)',
        borderBottomWidth:1,
        borderBottomColor: "rgba(255,164,92,0.74)"
    }
})


export default FirstMessageView;