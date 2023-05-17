import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import {Ionicons} from "@expo/vector-icons";


const TrainingType = ({setType, styles}) => {
    const [selectedValue, setSelectedValue] = useState(" ");

    return (
        <View style={styles.container}>
            <Ionicons name="fitness-outline" style={styles.typeIcon}/>
            <Picker
                selectedValue={selectedValue}
                style={styles.trainingType}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue) =>
                    {   setType(itemValue)
                        setSelectedValue(itemValue)
                    }}
            >
                <Picker.Item label=" " value=" " />
                <Picker.Item label="Caminata" value="Caminata" />
                <Picker.Item label="Running" value="Running" />
            </Picker>
        </View>
    );
}


export default TrainingType;