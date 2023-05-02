import React, { useState } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Modal} from 'react-native';

const ProfileScreen = ({ navigation }) => {
      const data = [
        { id: 1, image: require('../../../assets/images/post1.png') },
        { id: 2, image: require('../../../assets/images/post2.png') },
        { id: 3, image: require('../../../assets/images/post3.png') },
      ];

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>

            <TouchableWithoutFeedback onPress={toggleModal}>
                <Image source={require('../../../assets/images/profilepic.jpeg')} style={styles.profileImage} />
            </TouchableWithoutFeedback>

            <Modal visible={showModal} transparent={true}>
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={styles.modalBackground}>
                        <Image source={require('../../../assets/images/profilepic.jpeg')} style={styles.enlargedProfileImage} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
          <Text style={{ marginLeft: 10, fontSize: 20 }}>Pepito Boxeador</Text>
        </View>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Image source={item.image} style={{ width: '100%', height: 300, marginBottom: 10 }} />}
        />
      </View>
  );
};


const styles = StyleSheet.create({
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 25,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    enlargedProfileImage: {
        width: 300,
        height: 300,
        borderRadius: 300,
    },
});

export default ProfileScreen;
