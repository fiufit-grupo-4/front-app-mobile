import {Image, StyleSheet, Text, TouchableWithoutFeedback,FlatList,  ScrollView,View} from "react-native";
import React from "react";
import MediaVisualizableBox from "../media/MediaVisualizableBox";

export function GoalContent({item}) {
    return <>
        <View style={{padding: 5}}>
            <Text style={styles.title}>{item.title}</Text>
        </View>

        <ScrollView
            contentContainerStyle={styles.mediaContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <MediaVisualizableBox media={item.media[0]}/>
        </ScrollView>

    </>
}

const styles = StyleSheet.create({
    postImage: {
        width: '100%',
        height: 300,
    },
    title: {
        borderTopWidth: 1,
        borderTopColor: 'orange',
        fontSize: 18,
        //marginLeft:7,
        color: 'rgba(23,29,52,0.76)'
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
    postContainer: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    postDescription: {
        fontSize: 14,
        marginTop: 5,
    },
    mediaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    image: {
        width: 300,
        height: 300,
    }
});