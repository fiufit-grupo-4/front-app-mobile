import {ScrollView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import React, {useState} from "react";
import {FontAwesome, Ionicons} from "@expo/vector-icons";

function GoalProfile({ route }) {
    const {item, user, canEdit, navigation} = route.params;
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };

    const handleEditPress = () => {
        setSelectedPost(item);
        navigation.navigate('Edit Goal', { post: item, navigation: navigation });
    };

    const renderDifficultyStars = (difficulty) => {
        const filledStars = [];
        for (let i = 0; i < difficulty; i++) {
            filledStars.push(
                <FontAwesome name="star" size={20} color="gold" key={i} style={styles.starIcon} />
            );
        }
        return filledStars;
    };

    return (
        <View style={styles.item}>
            <View style={{flexDirection: "row"}}>
            {/* EDIT BUTTON */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                <Ionicons name="md-settings-outline" size={15} color="#A6A6A6" style={styles.editIcon} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
            </View>

            </View>
                {/*IMAGEN

                {GoalContent(item, toggleModal)}
                */}


                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.details}>Type: {item.type}</Text>
                <View style={styles.difficultyContainer}>
                    <Text style={styles.details}>Difficulty: </Text>
                    {renderDifficultyStars(item.difficulty)}
                </View>

        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'space-between',
        paddingHorizontal: 1,
        marginHorizontal: 1,
        paddingVertical: 8,
    },
    starIcon: {
        marginRight: 2,
    },
    difficultyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgb(255,255,255)',
        padding: 8,
        borderRadius: 20,
        marginLeft: 20,
        alignContent: "flex-end"
    },
    editIcon: {
        color: 'rgba(32,38,70,0.48)',

    },
    content: {
        flex: 1,
        marginLeft: 10,
        marginHorizontal:10,
        alignContent: "flex-start"
    },
    title: {
        borderTopWidth:1,
        borderTopColor: 'rgba(255,160,62,0.94)',
        fontSize: 26,
        fontWeight: 'bold',
        marginRight:40,
        alignContent: "flex-start"
    },
    description: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 8,
        marginLeft:10
    },
    details: {
        marginVertical:10,
        fontSize: 16,
        color: '#888',
        marginLeft:10
    },
});

export default GoalProfile;