import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import { Card, Divider} from 'react-native-paper';

const Training = ({item, canEdit}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const navigation = useNavigation();

    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };

    const handleEdit = (item) => {
        setSelectedPost(item);
        navigation.navigate('EditTrainingScreen', { post: item });
    }


    function onPress(){
        navigation.navigate("Training",{item})
    }

    return(
        <View style={styles.background}>
            <View style={styles.postContainer}>
                <View style={styles.postBackground}>

                    <View style={styles.topContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/profilepic.jpeg')} style={styles.profileImage} />
                            <Text style={styles.name}>{'Pepito Boxeador'}</Text>
                        </View>


                        {canEdit && <TouchableWithoutFeedback onPress={() => handleEdit(item)}>
                            <View style={styles.edit}>
                                <Ionicons name={'ellipsis-vertical-outline'} size={20} color={'#5B635F'}/>
                            </View>
                        </TouchableWithoutFeedback>
                        }
                    </View>

                    <View style={{ padding: 5 }}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>

                    <View style={styles.item}>
                        <Ionicons name={'md-pin-outline'}  style={styles.icon}/>
                        <Text style={styles.place}>{item.place}</Text>
                    </View>


                    <TouchableWithoutFeedback onPress={() => toggleModal(item.image)}>
                        <Image source={item.image} style={styles.postImage} />
                    </TouchableWithoutFeedback>


                    <View style={styles.item}>
                        <Ionicons name={'md-pencil-outline'} style={styles.icon} />
                        <Text style={styles.itemText}>{'Description: ' + item.description}</Text>
                    </View>

                    <View style={styles.item}>
                        <Ionicons name={'fitness-outline'} style={styles.icon}/>
                        <Text style={styles.itemText}>{'Training Type: ' + item.trainingType}</Text>
                    </View>

                    <View style={styles.item}>
                        <Ionicons name={'ios-stats-chart-outline'}  style={styles.icon}/>
                        <Text style={styles.itemText}>{'Difficulty: ' + item.difficulty}</Text>
                    </View>
                    <TouchableOpacity onPress={onPress}></TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        paddingVertical: 6,
        backgroundColor: 'rgba(222,233,248,0.29)'
    },
    postContainer: {
        backgroundColor: 'white',
        //borderRadius: 10,
        overflow: 'hidden'
    },
    topContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileImage: {
        width: 22,
        height: 22,
        borderRadius: 30,
        marginLeft:5
    },
    name: {
        fontSize: 16,
        color:'rgba(23,29,52,0.93)',
        marginHorizontal: 10
    },
    edit: {
        flexDirection: 'row',
        padding: 5
    },
    title: {
        borderTopWidth:1,
        borderTopColor: 'orange',
        fontSize: 18,
        //marginLeft:7,
        color:'rgba(23,29,52,0.76)'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        marginLeft: 5,
        marginRight: 14,
        fontSize:15,
        padding: 6,
        color:'rgba(32,38,70,0.63)'
    },
    icon: {
        fontSize:15,
        color:'rgba(32,38,70,0.63)',
        marginLeft:8
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
    },
    postBackground: {
        marginBottom: 40,
        //backgroundColor: 'rgba(217,227,240,0.75)'
        backgroundColor: 'white'
    },
    place: {
        marginLeft: 5,
        fontSize:15,
        color:'rgba(32,38,70,0.63)'
    },
    enlargedProfileImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    postImage: {
        width: '100%',
        height: 300,
    },
});

export default Training;