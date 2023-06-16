import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";
import Client from '../../client/Client';
import { getErrorMessage, getUser } from '../../utils/getters';
import DatePicker from 'react-native-date-picker';



const EditGoal = ({ route, navigation }) => {
    const {goal} = route.params;
    console.log(goal.limit_time)
    const [title, setTitle] = useState(goal.title);
    const [description, setDescription] = useState(goal.description);
    const [metric, setMetric] = useState(goal.metric);
    const [quantity, setQuanity] = useState(goal.quantity_steps.toString());
    const [limit, setLimit] = useState(new Date(goal.limit_time));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedValue, setSelectedValue] = useState(" ");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)

    const metricItems = [
        { label: " ", value: " " },
        { label: "Distancia recorrida", value: "Distancia recorrida" },
        { label: "Tiempo utilizado", value: "Tiempo utilizado" },
        { label: "Calorias utilizadas", value: "Calorias utilizadas" },
        { label: "Cantidad de hitos realizados", value: "Cantidad de hitos realizados" },
        { label: "Tipo de actividad realizada", value: "Tipo de actividad realizada" },
    ];

    const handleSaveChanges = async () => {
        console.log(goal)
        setLoading(true);
        setError(false)
        let userInfo = await getUser()
        let response = await Client.editGoals(userInfo.access_token,title,description,metric,parseInt(quantity),limit.toISOString(),goal.id)
        setLoading(false);
        console.log(JSON.stringify(response))
        if (!response.ok) {
            
            setError(true);
            setErrorMessage(getErrorMessage(response.status))
        } else {
            navigation.goBack();  
            navigation.goBack();    
        }

    }

    async function handleDelete() {
        console.log(goal)
        setLoading(true);
        setError(false)
        let userInfo = await getUser()
        console.log(userInfo.access_token)
        let response = await Client.deleteGoal(userInfo.access_token,goal.id)
        setLoading(false);
        console.log(JSON.stringify(response))
        if (!response.ok) {
            setError(true);
            setErrorMessage(getErrorMessage(response.status))
        } else {
            navigation.goBack();
            navigation.goBack();   
        }     
    }

    return (
        <View style={{padding: 30, backgroundColor: 'white', flex:1,paddingTop:50}}>

            
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Title</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="md-barbell-outline" size={16} color={"rgba(52,60,80,0.85)"} style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16, color: "rgba(53,63,79,0.74)", width: '99%'}}
                            placeholder="Enter the title"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Description</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="md-pencil-outline" size={16} color={"rgba(52,60,80,0.85)"} style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16,  color: "rgba(53,63,79,0.74)", width: '99%'}}
                            placeholder="Enter the description"
                            value={description}
                            onChangeText={setDescription}
                            multiline={true}
                        />
                    </View>
                </View>

                <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                    <View style={{padding:1, marginTop:10, paddingTop:10 }}>
                        <Text style={styles.text}>Training Type</Text>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="fitness-outline" size={24} color={"rgba(53,63,79,0.74)"} style={styles.iconType}/>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: '99%', marginLeft: -10, color: "rgba(53,63,79,0.74)", fontSize: 18, }}
                                itemStyle={styles.pickerItem}
                                onValueChange={(itemValue) =>
                                {   setMetric(itemValue)
                                    setSelectedValue(itemValue)
                                }}
                            >
                                {metricItems.map((item, index) => (
                                    <Picker.Item key={index} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Quantity</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="md-pulse-outline" size={16} color={"rgba(52,60,80,0.85)"} style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16,  color: "rgba(53,63,79,0.74)", width: '99%',}}
                            placeholder="Enter the quantity"
                            value={quantity}
                            onChangeText={setQuanity}
                        />
                    </View>
                </View>


                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Limit Time</Text>
                        <TouchableOpacity style={{flexDirection:"row"}} onPress={ () => {setOpen(true)}}>
                            <Ionicons name="md-calendar-outline" size={24} color="#A6A6A6" style={styles.icon}/> 
                            {/* limit == limit_default || !limit 
                              ? <Text style={styles.input}> Select Limit Date (Optional)</Text>
                              : <Text style={styles.input}> {limit.toISOString().slice(0,10)} </Text>
                                */}
                            <Text style={{fontSize: 16,  color: "rgba(53,63,79,0.74)", width: '99%',}}> { limit.toISOString().slice(0,10)} </Text>
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


            { loading
                ? <View style={{marginBottom:100, marginHorizontal: 40,marginTop:20}}>
                    <ActivityIndicator size="large" color = "black"/>
                </View>
                : <>
                    <View style = {{marginBottom:60}}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.deleteButtonText}>Delete Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                    </View>
                    {error && (
                        <View style = {{alignItems:"center"}}>
                            <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                        </View>
                    )}
                    </View>

                </>
            }

            




        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent:"center",
        backgroundColor: '#fff',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        marginTop:20
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
        marginTop:20,
        padding:5
    },
    icon: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
    },
    iconType: {
        
        marginTop: 19,
        fontSize: 16,
        color: "#A6A6A6"
    },
    input: {
        flex: 1,
        fontSize: 18,
        padding:5
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: 'black',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',

    },
    deleteButtonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    deleteButton: {
        backgroundColor: 'crimson',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',

    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    trainingType: {
        height:5,
        maxHeight:10,
        backgroundColor: 'red'
    },
    typeIcon: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
    }
})


export default EditGoal;
