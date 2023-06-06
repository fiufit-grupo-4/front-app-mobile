import {useNavigation} from "@react-navigation/native";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import FirstMetricView from "./FirstMetricView";


const MetricsListItem = ({ item, user, canEdit }) => {
    const navigation = useNavigation();

    function handleOnPress() {
        navigation.navigate("Metric Profile", {item:item, user:user, canEdit:canEdit ? canEdit : false})
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={handleOnPress}>
                <FirstMetricView item={item} user={user} canEdit={canEdit} />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
});


export default MetricsListItem;