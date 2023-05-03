import {FlatList, Image, Text, Modal, TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import {useState} from "react";
import Training from "../../components/trainings/Training";

const ProfileScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Fuerza de brazos',
            content: 'Lorem ipsum dolor sit amet.',
            difficulty: 3,
            image: require('../../../assets/images/post1.png')
        },
        {
            id: 2,
            title: 'GAP',
            content: 'Sed ut perspiciatis unde omnis iste natus error.',
            difficulty: 5,
            image: require('../../../assets/images/post2.png')
        },
        {
            id: 3,
            title: 'Sentadillas',
            content: 'Excepteur sint occaecat cupidatat non proident.',
            difficulty: 1,
            image: require('../../../assets/images/post3.png')
        },
    ]);

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

    return (
        
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:30,padding:10}}>
                <TouchableWithoutFeedback onPress={() => toggleModal(require('../../../assets/images/profilepic.jpeg'))}>
                    <Image source={require('../../../assets/images/profilepic.jpeg')} style={styles.profileImage} />
                </TouchableWithoutFeedback>
                <Text style={{ marginLeft: 10, fontSize: 20 }}>Pepito Boxeador</Text>
            </View>

            <Modal visible={showModal} transparent={true}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                        <Image source={selectedImage} style={styles.enlargedProfileImage} />
                    </TouchableWithoutFeedback>
                </View>
            </Modal>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Training item =  {item}></Training>
                )}/>
            </View>
            )}

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

export default ProfileScreen;
