import {ActivityIndicator, StyleSheet, TouchableOpacity, View, Text,Share} from "react-native";
import React, {useState} from "react";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import Client from "../../client/Client";
import { getUser,getErrorMessage } from "../../utils/getters";


function GoalProfile({ route,  navigation }) {
    const {item, user} = route.params;
    const [state, setState] = useState(item.state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleEditPress = () => {
        
        navigation.navigate('Edit Goal', { goal: item});
    };

    const handleViewTraining = () => {
        
        navigation.navigate('Training Goal Profile', { id: item.training_id });
    };

    const handleStartPress = async () => {
        setLoading(true)
        setError(false)
        let user = await getUser()
        let response = await Client.startGoal(user.access_token,item.id)
        setLoading(false)
        if (!response.ok) {
            setError(true);
            setErrorMessage(getErrorMessage(response.status))
        } else {
            setState(2)
        }
        
    };

    const handleStopPress = async () => {
        setLoading(true)
        setError(false)
        let user = await getUser()
        let response = await Client.stopGoal(user.access_token,item.id)
        setLoading(false)
        if (!response.ok) {
            setError(true);
            setErrorMessage(getErrorMessage(response.status))
        } else {
            setState(4)
        }
        
    };

    const handleShare = async () => {
        let message = `Congratulations! You have succesfully completed your goal ${item.title} `
        try {
            await Share.share({
              message: message
            });
          } catch (error) {
            setError(true);
            setErrorMessage(error.message.toString())
          }
        
    };

    const getState = (state) => {
        if (state ==1) return "Not Started"
        else if (state == 2) return "Started"
        else if (state == 3) return "Completed"
        else if (state == 4) return "Stoped"
        else if (state == 5) return "Expired"
        else return "Not Sure"
    }

    const getProgress = () => {
        return item.progress_steps > item.quantity_steps ? item.quantity_steps : item.progress_steps
    }

    return (
        <View style={styles.item}>

            <View style={{backgroundColor: '#ffffff', padding:15, borderRadius:10, marginHorizontal:15}}>

                {/* EDIT BUTTON */}
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Ionicons name="md-settings-outline" size={22} color="#A6A6A6" style={styles.editIcon} />
                </TouchableOpacity>



                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.description}>{item.description}</Text>

                <Text style={styles.descriptionTitle}>Metric</Text>
                <Text style={styles.description}>{item.metric}</Text>

                <Text style={styles.descriptionTitle}>Progress</Text>
                <Text style={styles.description}>{getProgress() + "/" + item.quantity_steps}</Text>

                <Text style={styles.descriptionTitle}>State</Text>
                <Text style={styles.description}>{getState(state)}</Text>

                { item.training_id 
                 ? <View style={styles.buttonContainer}>                 
                    <TouchableOpacity style={styles.buttonShare} onPress={handleViewTraining}>
                        <Text style={styles.buttonText}>View Training</Text>
                    </TouchableOpacity>
                  </View>
                 :loading 
                    ?<View style={{marginTop:35, marginHorizontal: 40,marginBottom:32}}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                    : 
                    <View style={styles.buttonContainer}>
                        { state == 1 && (
                            <TouchableOpacity style={styles.buttonStart} onPress={handleStartPress}>
                                <Text style={styles.buttonText}>Start</Text>
                            </TouchableOpacity>
                        )}
                        { state == 2 && (
                            <TouchableOpacity style={styles.buttonStop} onPress={handleStopPress}>
                                <Text style={styles.buttonText}>Stop</Text>
                            </TouchableOpacity>
                        )}
                        { state == 3 && (
                            <TouchableOpacity style={styles.buttonShare} onPress={handleShare}>
                                <Text style={styles.buttonText}>Share</Text>
                            </TouchableOpacity>
                        )} 

                        { state == 4 && (
                            <TouchableOpacity style={styles.buttonStart} onPress={handleStartPress}>
                                <Text style={styles.buttonText}>Resume</Text>
                            </TouchableOpacity>
                        )}                
                    </View>
                }

                
               
                {error && (
                    <View style = {{alignItems:"center",marginTop:15}}>
                        <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                    </View>
                )}
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
        top: 14,
        right: 9,
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
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        marginTop:20,
        width:"90%",
        alignSelf:"center"
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    buttonStart: {
        backgroundColor: 'orange',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonStop: {
        backgroundColor: 'crimson',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonShare: {
        backgroundColor: 'black',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default GoalProfile;