import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import CustomButton from '../buttons/CustomButton';

const Training = ({item}) => {
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
        <View style={{backgroundColor: 'white'}}>
           
            <View style={styles.postBackground}>

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/images/profilepic.jpeg')} style={styles.profileImage} />
                        <Text style={{ fontSize: 18, color:'rgba(23,29,52,0.93)', marginHorizontal: 10}}>{'Pepito Boxeador'}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => handleEdit(item)}>
                        <View style={{ flexDirection:'row', padding: 5}}>
                            <Ionicons name={'ellipsis-vertical-outline'} size={20} color={'#5B635F'}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Ionicons name={'md-pin-outline'} size={15} color='rgba(32,38,70,0.63)'/>
                    <Text style={styles.descriptions}>{item.place}</Text>
                </View>

                <TouchableWithoutFeedback onPress={() => toggleModal(item.image)}>
                    <Image source={item.image} style={styles.postImage} />
                </TouchableWithoutFeedback>

                <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 15, color:'rgba(23,29,52,0.93)' }}>{item.title}</Text>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={'md-pencil-outline'} size={15} color='rgba(32,38,70,0.63)' />
                    <Text style={styles.descriptions}>{'Description: ' + item.description}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={'fitness-outline'} size={15} color='rgba(32,38,70,0.63)'/>
                    <Text style={styles.descriptions}>{'Training Type: ' + item.trainingType}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={'ios-stats-chart-outline'} size={15} color='rgba(32,38,70,0.63)'/>
                    <Text style={styles.descriptions}>{'Difficulty: ' + item.difficulty}</Text>
                </View>
                <TouchableOpacity onPress={onPress}></TouchableOpacity>
                
            </View>        
        </View>
    
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 25,
        height: 25,
        borderRadius: 30,
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
    descriptions: {
        marginLeft: 5,
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