import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import FirstGoalView from "./FirstGoalView";


function GoalsListItem({item, user}) {
    const navigation = useNavigation();

    function handleOnPress() {
        navigation.navigate("Goal Profile", { item, user });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOnPress}>
                <FirstGoalView item={item} user={user} />
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