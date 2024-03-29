import {StyleSheet, Text, View,TouchableOpacity} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";
import {useNavigation} from "@react-navigation/native";


export function editPostDots(canEdit, handleEdit, item) {
    return <>
        {canEdit && (<> 
        <TouchableOpacity onPress={() => handleEdit(item)}>
            <View style={styles.edit}>
                <Ionicons name={'ellipsis-vertical-outline'} style={styles.placeIcon}/>
            </View>
        </TouchableOpacity>
        </>
        )
        }
    </>;
}

export function viewPostStats(canEdit, item) {
    const navigation = useNavigation();
    return <>
        {canEdit && <TouchableOpacity onPress={() =>  navigation.navigate('Training Stats', {item: item})}>
            <View style={styles.stats}>
                <Ionicons name={'md-analytics-outline'} size={26} color= {"#32CD32"}/>
            </View>
            </TouchableOpacity>
        }
    </>;
}

export function viewProgress(canEdit, handleProgress, item) {
    return <>
        {canEdit && <TouchableOpacity onPress={() => handleProgress(item)}>
            <View style={styles.stats}>
                <Ionicons name={'md-analytics-outline'} size={26} color= {"#32CD32"}/>
            </View>
            </TouchableOpacity>
        }
    </>;
}

const styles = StyleSheet.create({
    placeIcon: {
        fontSize: 22,
        
        color : 'black',
    },
    edit: {
        flexDirection: 'row',
        padding: 5
    },

    stats: {
        position: 'absolute',
        top: -13,
        right: -60,
    }
});