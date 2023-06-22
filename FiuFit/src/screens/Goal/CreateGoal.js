import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    DatePickerAndroid,
    ScrollView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getUser,getErrorMessage } from '../../utils/getters';
import Client from '../../client/Client';
import ListType from "../../components/trainings/ListType";
import DatePicker from 'react-native-date-picker';

export const CreateGoal = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuanity] = useState('');
    const [metric, setMetric] = useState('');
    let limit_default = new Date()
    limit_default.setMonth(limit_default.getMonth()+12)
    const [limit, setLimit] = useState(limit_default);
    const [select, setSelect] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const metricItems = [
        { label: " ", value: " " },
       
        { label: "Calories Burned", value: "Calories" },
        { label: "Number of Steps", value: "Steps" },
        { label: "Distance traveled (Km)", value: "Kilometers" },
        
    ];
    


    const resetStates =  ()=> {
        setTitle('');
        setDescription('');
        setMetric('');
        setQuanity('');
        setLimit(limit_default)
        setLoading(false);
        setError(false);
        setErrorMessage("");
        setSelect(false)
    }

    const createGoal = async () => {

        if (!title || !description  || !metric || !quantity) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (title.trim() === '' || description.trim() === '' || metric.trim() === '' || quantity.trim() === '') {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        let user = await getUser()
        setLoading(true)
        setError(false)
        let response = await Client.createNewGoal(user.access_token,title,description,metric,parseInt(quantity),limit.toISOString())
        console.log(limit)
        if (!response.ok) {
            console.log(response.status)
            setLoading(false)
            setError(true);
            setErrorMessage(getErrorMessage(response.status))
        } else {
            let data = await response.json()
            console.log(JSON.stringify(data))
            setLoading(false)
            ToastAndroid.show('Goal created succesfully!', ToastAndroid.SHORT)
            resetStates()
            navigation.goBack();
        }

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

                    

                    {/* Tipo de metrica */}
                    <ListType setType={setMetric} listItem={metricItems} icon={"fitness-outline"} styles={styles}/>

                    
                    <View style={styles.inputContainer}>
                        <Ionicons name="md-pulse-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Quantity"
                            value={quantity}
                            onChangeText={setQuanity}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={{flexDirection:"row"}} onPress={ () => {
                            setOpen(true)
                            setSelect(true)
                            }}>
                            <Ionicons name="md-calendar-outline" size={24} color="#A6A6A6" style={styles.icon}/> 
                            { !select
                              ? <Text style={styles.input}> Select Limit Date (Optional)</Text>
                              : <Text style={styles.input}> {"Limit time: " + limit.toISOString().slice(0,10)} </Text>}
                        </TouchableOpacity>
                    </View>


                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        minimumDate={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setLimit(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    
                    
                </View>




                { loading
                    ? <View style={{marginTop:50, marginHorizontal: 40}}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                    : <TouchableOpacity style={styles.button} onPress={createGoal}>
                        <Text style={styles.buttonText}>Create</Text>
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
