import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "react-native-vector-icons";


const TrainingGoal = ({item, onDelete}) => {
   
    const handleDelete = () => {
        onDelete(item);
    };

    return (
        <View style={ styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>
                    <View key = {item.id} style={newstyles.container}>
                        <View style={newstyles.header}> 
                        <Text style={newstyles.titulo}>{item.title}</Text>                 
                            <View style ={{marginLeft:30}}>
                                <TouchableOpacity onPress={handleDelete}>
                                    <Ionicons name={'close-outline'} size = {30} color = {"crimson"}/>
                                </TouchableOpacity> 
                            </View>    
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'pulse-outline'} style={styles.icon}/>
                        <Text style={styles.description}>{item.metric}</Text>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'md-pulse-outline'} style={styles.icon}/>
                        <Text style={styles.description}>{item.quantity}</Text>
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width:"90%",
        paddingHorizontal:5,
        margin:10,
        borderRadius:15,
        borderWidth:0.5,
        alignSelf:"center"
    },

    postBackground: {
        marginBottom: 15,
        
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
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
        padding: 2,
        color:'rgba(32,38,70,0.89)',

    },

});





const newstyles = {
    container: {
        padding: 10,
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


};


export default TrainingGoal;