import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "react-native-vector-icons";


const FirstGoalView = ({item, user}) => {

   
    return (
        <View style={item.state == 3 ? styles.backgroundCompleted : styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>
                    <View key = {item.id} style={newstyles.container}>
                        <View style={newstyles.header}>
                            <Text style={item.state == 3 ? newstyles.tituloCompleted : newstyles.titulo}>{item.title}</Text>

                            { item.state == 3 
                             ? 
                                <View style ={{marginLeft:30}}>
                                    <Ionicons name={'checkmark-outline'} size = {30} color = {"#50C878"}/>
                                    </View> 
                             : <Text style={newstyles.dificultad}>{item.progress + "/" + item.quantity}</Text>
                            }
                            
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'pulse-outline'} style={styles.icon}/>
                        <Text style={item.state == 3 ? styles.descriptionCompleted : styles.description}>{item.metric}</Text>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
                        <Text style={item.state == 3 ? styles.descriptionCompleted : styles.description}>{item.description}</Text>
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
    backgroundCompleted: {
        backgroundColor: 'white',
        paddingHorizontal:10,
        marginLeft:5,
        marginRight:5,
        borderRadius:10,
        //borderWidth:0.5,
        borderColor:"#50C878"
    },
    postBackground: {
        marginBottom: 15,
        
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
    description: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        padding: 6,
        color:'rgba(32,38,70,0.89)',

    },

    descriptionCompleted: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        padding: 6,
        color:'grey',

    }
});





const newstyles = {
    container: {
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
        color:'rgba(32,38,70,0.99)',
        borderBottomWidth:1,
        borderBottomColor: "rgba(255,164,92,0.74)"
    },
    tituloCompleted: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'gray',
        borderBottomWidth:1,
        borderBottomColor: "#50C878"
    },

    dificultad: {
        color:"gray",
        fontSize:16,
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


export default FirstGoalView;