import {Image, StyleSheet, Text, TouchableWithoutFeedback,FlatList,  ScrollView,View} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";
import ImageTraining from "./ImageTraining";
import Video from 'react-native-video';

export function trainingPrincipalContent(item, toggleModal) {
    return <>
        <View style={{padding: 5}}>
            <Text style={styles.title}>{item.title}</Text>
        </View>

        <ScrollView>
        <TouchableWithoutFeedback>
            
            { (item.media != {}) 
                ? item.media[0]
                  ? <Image source={{uri : item.media[0].url}} style={styles.postImage}/>
                  : <Image source={{uri : "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fundefined%2Ftraining%2F1684884021158?alt=media&token=445fc135-b3bb-4bbf-83b4-433a79b2ce9e"}} style={styles.postImage}/>
                : <Image source={{uri : "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fundefined%2Ftraining%2F1684884021158?alt=media&token=445fc135-b3bb-4bbf-83b4-433a79b2ce9e"}} style={styles.postImage}/>
            }
            
        </TouchableWithoutFeedback>
        </ScrollView>
    </>
}

export function trainingContent(item) {
    return <>
        <View style={styles.item}>
            <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
        </View>

        <View style={styles.item}>
            <Ionicons name={'fitness-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Training Type: ' + item.type}</Text>
        </View>

        <View style={styles.item}>
            <Ionicons name={'ios-stats-chart-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Difficulty: ' + item.difficulty}</Text>
        </View>
    </>;
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
        marginRight: 10,
      },
      image: {
        width: 200,
        height: 200,
        borderRadius: 10,
      },
      video: {
        width: 200,
        height: 200,
        borderRadius: 10,
      },
});