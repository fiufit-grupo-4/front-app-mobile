import { Image, Text, Modal, TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import {useState} from "react";

export default Training = ({item}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);


    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };

    const handleEdit = (item) => {
        setSelectedPost(item);
        navigation.navigate('EditTrainingScreen', { post: item });
    }

    return(
    <View style={{ marginBottom: 40 }}>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        <View style={{ backgroundColor: '#DEE9F8FF', padding: 5, flex: 1 }}>
            <Text style={{ fontSize: 20, color:'#4A4F4C' }}>{item.title}</Text>
        </View>

        <TouchableWithoutFeedback onPress={() => handleEdit(item)}>
            <View style={{ backgroundColor: '#DEE9F8FF', padding: 5}}>
                <Ionicons name={'ellipsis-vertical-outline'} size={20} color={'#5B635F'}/>
            </View>
        </TouchableWithoutFeedback>
    </View>

    <TouchableWithoutFeedback onPress={() => toggleModal(item.image)}>
        <Image source={item.image} style={styles.postImage} />
    </TouchableWithoutFeedback>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={'md-pencil-outline'} size={15} />
        <Text style={{ marginLeft: 5 }}>{'Description: ' + item.content}</Text>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={'ios-stats-chart-outline'} size={15} />
        <Text style={{ marginLeft: 5 }}>{'Difficulty: ' + item.difficulty}</Text>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={'md-pin-outline'} size={15} />
        <Text style={{ marginLeft: 5 }}>{'Place: ' + item.place}</Text>
    </View>

    </View>)
}

const styles = StyleSheet.create({
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.64)',
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