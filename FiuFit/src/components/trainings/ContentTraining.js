import {Image, StyleSheet, Text, TouchableWithoutFeedback,FlatList,  ScrollView,View} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";
import MediaVisualizableBox from "../media/MediaVisualizableBox";
import { DEFAULT_IMAGE } from "../../utils/constants";

export function trainingPrincipalContent(item, toggleModal) {
    return <>
        <View style={{padding: 5}}>
            <Text style={styles.title}></Text>
        </View>
    
        <ScrollView
            contentContainerStyle={styles.mediaContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            >

            {item.media[0] ?
              <>
                <MediaVisualizableBox media = { item.media[0]}/>
                <MediaVisualizableBox media = { item.media[1]}/>
                <MediaVisualizableBox media = { item.media[2]}/>
                <MediaVisualizableBox media = { item.media[3]}/> 
              </>
            :
                <View style={styles.mediaBox}>
                    <Image source={{ uri: DEFAULT_IMAGE }} style={styles.imageBox} /> 
                </View>
            }
                        
        </ScrollView>
    {/*
        <FlatList
            data={item.media}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={({item}) => (
                <View style={styles.postContainer}>      
                        { item.media_type == "image" 
                            ? item.url 
                                ? <Image source={{ uri: item.url }} style={styles.image} />
                                : <Image source={{ uri: DEFAULT_IMAGE }} style={styles.image} /> 
                            : item.media_type == "video"
                                ? <Video uri ={item.url} />
                                : <Image source={{ uri: DEFAULT_IMAGE }} style={styles.image} /> 
                        }           
                </View>        
        )}/>     */}

    </>
}

export function trainingContent(item) {
    return <>

        <View style={styles.item}>
            <Ionicons name={'md-person-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Trainer: ' + item.trainer.name + " " + item.trainer.lastname}</Text>
        </View>
        <View style={styles.item}>
            <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
        </View>

        <View style={styles.item}>
            <Ionicons name={'fitness-outline'} style={styles.icon}/>
            <Text style={styles.itemText}>{'Type: ' + item.type}</Text>
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
        fontSize: 16,
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
      },
      mediaBox: {
        width: 300,
        height: 300,
        margin: 10,
        borderRadius:10
      },
      imageBox: {
        width: '100%',
        height: '100%',
        borderRadius:5,
      },
});