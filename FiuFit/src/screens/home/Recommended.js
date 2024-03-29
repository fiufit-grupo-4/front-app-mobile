import axios from "axios";
import React, {useState} from "react";
import {StyleSheet, View,Text,Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MediaVisualizableBox from "../../components/media/MediaVisualizableBox";
import {Ionicons} from "react-native-vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DEFAULT_IMAGE } from "../../utils/constants";

const Recommended = ({user, item, canEdit, reload, fav = false}) => {
    const [showModal, setShowModal] = useState(false);

    const navigation = useNavigation();


    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };

    const renderStars = (dificultad) => {
        const maxStars = 5;
        const filledStars = Math.min(dificultad, maxStars);
    
        return Array(maxStars)
          .fill()
          .map((_, index) => (
            <Icon
              key={index}
              name={index < filledStars ? 'star' : 'star-outline'}
              size={18}
              color="#FDB813"
            />
          ));
      };


    const handleEdit = (item) => {
        setSelectedPost(item);
        navigation.navigate('Edit Training', {post: item});
    }

    return (
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>
                    <View key = {item.id} style={newstyles.container}>                         
                        <View style={newstyles.header}>
                            <Text style={newstyles.titulo}>{item.title}</Text>
                            <Text style={newstyles.dificultad}>{renderStars(parseInt(item.difficulty))}</Text>
                        </View>
                        <Text style={newstyles.tipo}>{item.type}</Text>       
                    </View>
                    <View style={{alignContent:"center",alignItems:"center"}} >

                    {!item.media[0] && (
                        <View style={styles.mediaBox}>
                            <Image source={{ uri: DEFAULT_IMAGE }} style={styles.image} /> 
                        </View>)
                    }
      
                        <MediaVisualizableBox media = { item.media[0]}/>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'bicycle-outline'} style={styles.icon}/>
                        <Text style={styles.itemText}>{"Trainer: "+item.trainer.name + " " + item.trainer.lastname}</Text>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name={'md-pencil-outline'} style={styles.icon}/>
                        <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        //backgroundColor: 'rgba(222,233,248,0.29)'
        backgroundColor: 'white',
        paddingHorizontal:10,
        marginLeft:5,
        marginRight:5,
        borderRadius:10,
       
    },
    postContainer: {
        //backgroundColor: 'rgba(222,233,248,0.29)',
        
    },
    postBackground: {
        marginBottom: 15,
        //backgroundColor: 'rgba(217,227,240,0.75)',
        backgroundColor: 'white'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        marginLeft: 5,
        marginRight: 0,
        fontSize: 15,
        padding: 6,
        color: 'rgba(32,38,70,0.63)'
    },
    icon: {
        fontSize: 12,
        color: 'rgba(32,38,70,0.63)',
        marginLeft: 8
    },
    mediaBox: {
        width: 300,
        height: 300,
        margin: 10,
        borderRadius:10
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius:5,
      },
});



const newstyles = {
    container: {
      backgroundColor: '#ffffff',
      padding: 15,

      borderRadius:10,
      
    },name: {
        fontSize: 16,
        color: 'rgba(23,29,52,0.93)',
        
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      color:'rgba(32,38,70,0.63)'
    },
    dificultad: {
      flexDirection: 'row',
    },
    tipo: {
      marginTop: 5,
      fontSize: 16,
      color:"gray"
    },
    descripcion: {
      marginTop: 10,
      fontSize: 14,
    },
  };
  

export default Recommended;