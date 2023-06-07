import {useNavigation} from "@react-navigation/native";
import {Button, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import React, {useState} from "react";
import FirstChallengeView from "./FirstChallengeView";



const ChallengeListItem = ({ item, user, canEdit }) => {
    const navigation = useNavigation();

    function handleOnPress() {
        navigation.navigate("View Goal", {item:item, user:user, challengeId:item.id, canEdit:canEdit ? canEdit : false})
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOnPress}>
                <FirstChallengeView item={item} user={user} canEdit={canEdit}  navigation={navigation} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    editButton:{
        backgroundColor: 'rgba(217,227,240,0.79)',
        color: "white",
        tintColor: "white",
        borderRadius: 10,
        marginBottom: 6,
        marginVertical: 6,
        marginHorizontal: 4,
        paddingVertical: 5,
    },
    buttonText: {
        alignContent: "center",
        marginHorizontal: 25
    }
});


export default ChallengeListItem;