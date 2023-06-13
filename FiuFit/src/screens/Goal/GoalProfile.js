import {ScrollView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import React, {useState} from "react";
import {FontAwesome, Ionicons} from "@expo/vector-icons";

function GoalProfile({ route }) {
    const {item, user, navigation} = route.params;
    const [selectedPost, setSelectedPost] = useState(null);

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

            <View style={{backgroundColor: '#ffffff', padding:15, borderRadius:10, marginHorizontal:15}}>

                {/* EDIT BUTTON */}
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Ionicons name="md-settings-outline" size={15} color="#A6A6A6" style={styles.editIcon} />
                </TouchableOpacity>



                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.descriptionTitle}>Description Goal</Text>
                <Text style={styles.description}>{item.description}</Text>

                <Text style={styles.detailsTitle}>Metric Goal</Text>
                <Text style={styles.details}>Metric: {item.metric}</Text>

                <Text style={styles.detailsTitle}>Difficulty Goal</Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: 1,
        marginHorizontal: 1,
        paddingVertical: 30,
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
        marginHorizontal:1,
        alignContent: "flex-start"
    },
    title: {
        color:'rgba(32,38,70,0.89)',
        fontSize: 26,
        fontWeight: 'bold',
        marginRight:40,
        alignContent: "flex-start",
        marginLeft:7,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor: "rgba(255,164,92,0.74)"
    },
    description: {
        color:'rgba(32,38,70,0.89)',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 8,
        marginLeft:16,
        marginRight:20
    },
    descriptionTitle: {
        color:'rgba(32,38,70,0.45)',
        fontSize: 18,
        marginTop: 5,
        marginLeft:10,
        marginRight:20
    },
    details: {
        marginVertical:10,
        fontSize: 16,
        color:'rgba(32,38,70,0.89)',
        marginLeft:16
    },
    detailsTitle: {
        color:'rgba(32,38,70,0.45)',
        fontSize: 16,
        marginTop: 5,
        marginLeft:10,
        marginRight:20
    },
});

export default GoalProfile;