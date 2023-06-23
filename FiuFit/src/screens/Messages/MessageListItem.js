import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import FirstMessageView from "./FirstMessageView";

function MessageListItem({item, messages, handleMessage}) {
    const navigation = useNavigation();

    //TODO PASAR LOS MSJ CON ESA PERSONA
    function handleOnPress() {
        navigation.navigate("Message Chat", { item, messages, handleMessage });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOnPress}>
                <FirstMessageView item={item}  />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
});


export default MessageListItem;