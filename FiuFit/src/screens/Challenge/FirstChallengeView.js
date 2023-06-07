import axios from "axios";
import React, {useState} from "react";
import {StyleSheet, View,Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "react-native-vector-icons";


const FirstChallengeView = ({user, item, canEdit, reload}) => {
    const [showModal, setShowModal] = useState(false);


    return (
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>
                    <View key = {item.id} style={newstyles.container}>
                        <View style={newstyles.header}>
                            <Text style={newstyles.titulo}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'person-outline'} style={styles.icon}/>
                        <Text style={styles.itemText}>{"Athlete: " + item.athlete}</Text>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
                        <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        //backgroundColor: 'rgba(222,233,248,0.29)'
        backgroundColor: 'white',
        paddingHorizontal:10,
        marginLeft:5,
        marginRight:5,
        borderRadius:10,

    },
    postContainer: {

    },
    postBackground: {
        marginBottom: 15,
        //backgroundColor: 'rgba(217,227,240,0.75)',
        backgroundColor: 'white'
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
    },
});



const newstyles = {
    container: {
        backgroundColor: '#ffffff',
        padding: 15,

        borderRadius:10,

    },name: {
        fontSize: 16,
        color: 'rgba(23,29,52,0.93)',
        marginHorizontal: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'rgba(32,38,70,0.63)'
    },
    dificultad: {
        flexDirection: 'row',
    },
    tipo: {
        marginTop: 5,
        fontSize: 16,
        color:"gray"
    },
    descripcion: {
        marginTop: 10,
        fontSize: 14,
    },
};


export default FirstChallengeView;