import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getUser,getErrorMessage } from '../../utils/getters';
import Client from '../../client/Client';
import ListType from "../../components/trainings/ListType";

export const CreateGoal = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [metric, setMetric] = useState('');
    const [challenge, setChallenge] = useState('');
    const [difficulty, setDifficulty] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleDifficulty = (value) => {
        setDifficulty(value);
    };

    const metricItems = [
        { label: " ", value: " " },
        { label: "Distancia recorrida", value: "Distancia recorrida" },
        { label: "Tiempo utilizado", value: "Tiempo utilizado" },
        { label: "Calorias utilizadas", value: "Calorias utilizadas" },
        { label: "Cantidad de hitos realizados", value: "Cantidad de hitos realizados" },
        { label: "Tipo de actividad realizada", value: "Tipo de actividad realizada" },
    ];
    
    const trainingItems = [
        { label: " ", value: " " },
        { label: "Caminata", value: "Caminata" },
        { label: "Running", value: "Running" },
    ];


    const resetStates =  ()=> {
        setTitle('');
        setDescription('');
        setMetric('');
        setDifficulty(0);
        setLoading(false);
        setError(false);
        setErrorMessage("");
    }

    const createGoal = async () => {
        console.log(metric)
        if (!title || !description  || !metric || !difficulty) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (title.trim() === '' || description.trim() === '' || metric.trim() === '' || metric.trim() === '') {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        let user = await getUser()

        setLoading(true)
        setError(false)
        let response = await Client.createNewPost(user.access_token,title,description,metric,difficulty,challenge)
        setLoading(false)
        if (!response.ok) {
            setError(true);
            setErrorMessage(getErrorMessage(response.status))
        } else {
            let data = await response.json()
            console.log(JSON.stringify(data))
            ToastAndroid.show('Goal created succesfully!', ToastAndroid.SHORT)
            navigation.goBack();
        }
        resetStates()

    };

    return (
        <View style={styles.container}>
            <Text style={styles.botton}>NEW GOAL</Text>
            <View>

            </View>
            <ScrollView style={{margin:10}}>
                <View style={styles.boxContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="md-barbell-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="md-pencil-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            multiline={true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="ios-stats-chart-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <Text style={styles.difficultyInput}> Difficulty:  </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <TouchableWithoutFeedback key={value} onPress={() => handleDifficulty(value)}>
                                    <Icon name={value <= difficulty ? 'star' : 'star-outline'} size={20} color="#FDB813" />
                                </TouchableWithoutFeedback>
                            ))}
                            <Text style={{ marginLeft: 10 }}>{difficulty > 0 ? ' ' + ' ' : ' '}</Text>
                        </View>
                    </View>

                    {/* Tipo de metrica */}
                    <ListType setType={setMetric} listItem={metricItems} icon={"fitness-outline"} styles={styles}/>

                    
                    {/* Fecha limite */}
                    
                    
                </View>




                { loading
                    ? <View style={{marginTop:50, marginHorizontal: 40}}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                    : <TouchableOpacity style={styles.button} onPress={createGoal}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                }

                {error && (
                    <View style = {{alignItems:"center",marginTop:15}}>
                        <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                    </View>
                )}

            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    botton: {
        padding: 10,
        color: 'rgba(32,38,70,0.63)',
        fontSize: 20,
        marginTop:35,
        alignContent: 'center',
        textAlign: 'center'
    },
    container: {
        marginTop:0,
        flex:1,
        backgroundColor: 'white',
    },
    boxContainer: {
        marginVertical:10,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    },
    inputContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        minHeight:40,
        backgroundColor: 'rgba(163,205,255,0.42)',
        paddingHorizontal: 5,
        borderRadius: 10,

    },
    input: {
        fontSize: 18,
        minHeight:25,
        maxWidth:320,
        margin:3,
        width: '99%',
        color:"rgba(53,63,79,0.74)"
    },
    difficultyInput: {
        fontSize: 18,
        minHeight:25,
        maxWidth:320,
        margin:3,
        color:"rgba(53,63,79,0.74)"
    },
    icon: {
        paddingHorizontal: 5,
        color: "rgba(53,63,79,0.74)",
        alignItems:"center",
        fontSize: 15,
        marginVertical:8
    },
    nextButton: {
        backgroundColor: '#DEE9F8FF',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        marginBottom:1,
        marginTop:20,
        width: 90
    },
    buttonText: {
        fontSize: 18,
        color: 'rgba(23,29,52,0.93)',
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: '#F0A500',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop:50,
        marginHorizontal: 40,
        width:"80%",

    },
    trainingType: {
        height: 50,
        width: '99%',
        marginLeft: -10,
        color: "rgba(53,63,79,0.74)",
        fontSize: 18
    },
    pickerItem: {
        color: "red",
        backgroundColor:  'rgba(163,205,255,0.42)'
    },
    typeIcon: {
        size: 24,
        color: "#A6A6A6"
    }
});

export default CreateGoal;
