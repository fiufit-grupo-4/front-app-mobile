import {ScrollView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import React, {useState} from "react";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {trainingPrincipalContent} from "../../components/trainings/ContentTraining";
import {GoalContent} from "../../components/goals/GoalContent";

function GoalProfile({ route }) {
    const {item, user, canEdit, navigation} = route.params;
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const toggleModal = (image) => {
        setSelectedImage(image);
        setShowModal(!showModal);
    };

    const handleEditPress = () => {
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
            {/* EDIT BUTTON */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                <Ionicons name="md-settings-outline" size={15} color="#A6A6A6" style={styles.editIcon} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>

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
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 20,
    },
    editIcon: {
        color: '#A6A6A6',
    },
    content: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 8,
    },
    details: {
        marginVertical:10,
        fontSize: 16,
        color: '#888',
    },
});

export default GoalProfile;