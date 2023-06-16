import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";

export function editPostDots(canEdit, handleEdit, item) {
    return <>
        {canEdit && <TouchableWithoutFeedback onPress={() => handleEdit(item)}>
            <View style={styles.edit}>
                <Ionicons name={'ellipsis-vertical-outline'} style={styles.placeIcon}/>
            </View>
        </TouchableWithoutFeedback>
        }
    </>;
}

const styles = StyleSheet.create({
    placeIcon: {
        fontSize: 18,
        marginLeft:30,
        color : 'black',
    },
    edit: {
        flexDirection: 'row',
        padding: 5
    }
});