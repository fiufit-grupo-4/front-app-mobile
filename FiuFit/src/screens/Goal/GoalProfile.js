import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import Goal from "../../components/goals/Goal";
import {Ionicons} from "@expo/vector-icons";

function GoalProfile({ route }) {
    const {item, user, canEdit, navigation} = route.params;

    const handleEditPress = () => {
        navigation.navigate('Edit Goal', { post: item, navigation: navigation });
    };

    return (
        <View style={{ padding: 5, marginHorizontal: 10, marginTop: 10 }}>
            <ScrollView>
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Ionicons name="md-settings-outline" size={15} color="#A6A6A6" style={styles.editButton} />
                </TouchableOpacity>
                <Goal item={item} user={user} canEdit={canEdit} navigation={navigation} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        //backgroundColor: 'rgba(222,233,248,0.29)'
        backgroundColor: 'white',
        paddingHorizontal:10,
        marginLeft:5,
        marginRight:5,
        borderRadius:11,
    },
    postContainer: {

    },
    postBackground: {
        marginBottom: 15,
        backgroundColor: 'white'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        marginLeft: 5,
        marginRight: 14,
        fontSize: 15,
        padding: 6,
        color: 'rgba(32,38,70,0.63)'
    },
    icon: {
        fontSize: 12,
        color: 'rgba(32,38,70,0.63)',
        marginLeft: 8
    },
    editButton:{
        marginVertical: 6,
        marginHorizontal: 4,
        alignContent: "center"
    },
});

export default GoalProfile;