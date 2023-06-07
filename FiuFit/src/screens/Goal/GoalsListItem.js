import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import FirstGoalView from "./FirstGoalView";
import {Ionicons} from "@expo/vector-icons";


function GoalsListItem({ item, user, canEdit }) {
    const navigation = useNavigation();

    function handleOnPress() {
        navigation.navigate("Goal Profile", { item, user, canEdit, navigation });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOnPress}>
                <FirstGoalView item={item} user={user} canEdit={canEdit} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
});


export default GoalsListItem;