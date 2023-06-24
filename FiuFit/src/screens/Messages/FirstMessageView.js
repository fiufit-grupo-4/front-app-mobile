import axios from "axios";
import React, {useState,useEffect} from "react";
import {StyleSheet, View, Text, TouchableOpacity,Image} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";



const FirstMessageView = ({item,myId}) => {
    const [user, setUser] = useState({})
    const isFocused = useIsFocused()

    useEffect(() => {
        const filteredUser = item?.users.filter(user => user.id !== myId);
        setUser(filteredUser[0])
    }
     , [isFocused])



    return (
        <View style={styles.background}>
             <View style={styles.avatarContainer}>
                { user.image && user.image !="string"
                    ? <Image source={{uri:user.image}} style={styles.avatar}/>
                    : <Image source={ require('../../../assets/images/profilepic.jpeg') } style={styles.avatar} />
                }  
                
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.name}>{user.name + " " + user.lastname + " "}
                </Text>
                
            </View>

                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Ionicons name="mail" size={26} style={styles.icon} />
                        </View>
                    </View>
    
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor:"white",
        padding:9,
        borderRadius:25,

    },
    postBackground: {
        marginBottom: 15,
        backgroundColor: 'white',
        alignContent:"center"
    },
    icon: {
        color: "orange"
    },
    container: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius:10,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'rgba(32,38,70,0.99)',
        borderBottomWidth:1,
        borderBottomColor: "rgba(255,164,92,0.74)"
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 10,
      },
      avatar: {
        width: '100%',
        height: '100%',
      },
      userInfo: {
        flex: 1,
      },
      name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft:2,
        color:'rgba(32,38,70,0.99)',
        borderBottomWidth:1,
        borderBottomColor: "rgba(255,164,92,0.74)",
       
      },
})


export default FirstMessageView;