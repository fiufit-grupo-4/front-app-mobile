import React, { useState,useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import {Ionicons} from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';


const ListType = ({setType, listItem, icon}) => {
    const [selectedValue, setSelectedValue] = useState(listItem[0]);
    const isFocused = useIsFocused();


    useEffect(() => {
        setSelectedValue(listItem[0])
        
    }, [isFocused,])

    return (
        <View style={styles.container}>
            <Ionicons name={icon} size={24} color="#A6A6A6" style={styles.icon}/>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: '99%', marginLeft: -10, color: "rgba(53,63,79,0.74)", fontSize: 18, }}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue) =>
                    {   setType(itemValue)
                        setSelectedValue(itemValue)
                    }}
            >
                {listItem.map((item, index) => (
                    <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
}


const styles = StyleSheet.create({
    botton: {
        padding: 10,
        color: 'rgba(32,38,70,0.63)',
        fontSize: 20,
        marginTop:20,
        alignContent: 'center',
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        height:40,
        backgroundColor: 'rgba(163,205,255,0.42)',
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    icon: {
        paddingHorizontal: 5,
        color: "rgba(53,63,79,0.74)",
        alignItems:"center",
        fontSize: 15,
        marginVertical:8
    },
    pickerItem: {
        color: "red",
        backgroundColor:  'rgba(163,205,255,0.42)'
    }
});

export default ListType;