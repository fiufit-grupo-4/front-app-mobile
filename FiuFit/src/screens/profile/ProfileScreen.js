import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import {Ionicons} from "react-native-vector-icons";

const ProfileScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Fuerza de brazos', content: 'Lorem ipsum dolor sit amet.',
            difficulty: 3, image: require('../../../assets/images/post1.png') },
        { id: 2, title: 'GAP', content: 'Sed ut perspiciatis unde omnis iste natus error.',
            difficulty: 5, image: require('../../../assets/images/post2.png') },
        { id: 3, title: 'Sentadillas', content: 'Excepteur sint occaecat cupidatat non proident.',
            difficulty: 1, image: require('../../../assets/images/post3.png') },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
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
                    <View style={{ marginBottom: 40 }}>
                        <Text style={{ fontSize: 20, marginBottom: 5 }}>{item.title}</Text>
                        <TouchableWithoutFeedback onPress={() => toggleModal(item.image)}>
                            <Image source={item.image} style={styles.postImage} />
                        </TouchableWithoutFeedback>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name={'md-pencil-outline'} size={15} />
                            <Text style={{ marginLeft: 5 }}>{item.content}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name={'ios-stats-chart-outline'} size={15} />
                            <Text style={{ marginLeft: 5 }}>{'Difficulty: '+item.difficulty}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name={'md-pin-outline'} size={15} />
                            <Text style={{ marginLeft: 5 }}>{'Place: '+item.difficulty}</Text>
                        </View>

                    </View>
                )}
            />
        </View>
    );
};

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
        backgroundColor: 'rgba(0,0,0,0.7)',
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
