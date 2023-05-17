import React, { useState } from "react";
import {View, StyleSheet, Text} from "react-native";
import { Picker } from '@react-native-picker/picker';
import {Ionicons} from "@expo/vector-icons";


export const EditTrainingType = ({setType, trainingType}) => {
    const [selectedValue, setSelectedValue] = useState(trainingType);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Training Type</Text>
            <View style={{flexDirection:"row"}}>
                <Ionicons name="fitness-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                <Picker
                    selectedValue={trainingType}
                    style={{ height: 50, width: '99%', marginLeft: -10, color: "rgba(53,63,79,0.74)", fontSize: 18, }}
                    itemStyle={styles.pickerItem}
                    onValueChange={(itemValue) =>
                    {   setType(itemValue)
                        setSelectedValue(itemValue)
                    }}
                >
                    <Picker.Item label="Caminata" value="Caminata" />
                    <Picker.Item label="Running" value="Running" />
                </Picker>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 20,
        backgroundColor: '#fff',
        marginVertical: 10,
        marginTop:10,
        paddingTop:20
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
        marginTop:20
    },
    icon: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    buttonText: {
        fontSize: 18,
        color: 'rgba(23,29,52,0.93)',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#DEE9F8FF',
        borderRadius: 20,
        paddingVertical: 10,
        //marginTop:30,
        marginHorizontal: 40
    },
    deleteButtonText: {
        fontSize: 18,
        color: 'rgb(255,255,255)',
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10
    },
    typeIcon: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
    }
})