import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
Button,
    ScrollView,

    Modal
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getUser,getErrorMessage } from '../../utils/getters';
import Client from '../../client/Client';
import ListType from "../../components/trainings/ListType";

export const ModalGoal = ({ newGoal,setNewGoal,modalVisible,handleSave,setModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity_steps, setQuanity] = useState('');
    const [metric, setMetric] = useState('');



    const metricItems = [
        { label: " ", value: " " },
        { label: "Distancia recorrida", value: "Distancia recorrida" },
        { label: "Tiempo utilizado", value: "Tiempo utilizado" },
        { label: "Calorias utilizadas", value: "Calorias utilizadas" },
        { label: "Cantidad de hitos realizados", value: "Cantidad de hitos realizados" },
        { label: "Tipo de actividad realizada", value: "Tipo de actividad realizada" },
    ];
    


    const handleCancel =  ()=> {
        resetStates()
        setModal(false)
    }

    const resetStates =  ()=> {
        setTitle('');
        setDescription('');
        setMetric('');
        setQuanity('');   

    }

    return (


        <Modal visible={modalVisible} animationType="slide" >
                    {/*
                    <TextInput
                        placeholder="Metric"
                        value={newGoal.metric}
                        onChangeText={(text) => setNewGoal({ ...newGoal, metric: text })}
                    />
                    <TextInput
                        placeholder="Title"
                        value={newGoal.title}
                        onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
                    />
                    <TextInput
                        placeholder="Description"
                        value={newGoal.description}
                        onChangeText={(text) =>
                            setNewGoal({ ...newGoal, description: text })
                        }
                    />
                    <TextInput
                        placeholder="Quantity"
                        value={newGoal.quantity}
                        onChangeText={(text) =>
                        setNewGoal({ ...newGoal, quantity: text })
                        }
                    />*/}            
                
            <View style={styles.container}>
                <Text style={styles.botton}>NEW GOAL</Text>
                <View style={styles.boxContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="md-barbell-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                         style={styles.input}
                        placeholder="Title"
                        value={newGoal.title}
                        onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
                        />
                        
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="md-pencil-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            placeholder="Description"
                            value={newGoal.description}
                            onChangeText={(text) =>
                                setNewGoal({ ...newGoal, description: text })
                            }
                            style={styles.input}
                            multiline={true}
                        />
                    </View>

                    <ListType setType={(text) => setNewGoal({ ...newGoal, metric: text })} listItem={metricItems} icon={"fitness-outline"} styles={styles}/>

                    
                    <View style={styles.inputContainer}>
                        <Ionicons name="md-pulse-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Quantity"
                            value={newGoal.quantity_steps}
                            onChangeText={(text) => setNewGoal({ ...newGoal, quantity_steps: text })}
                            keyboardType='numeric'
                        />
                    </View>      
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleCancel}>
                        <Text style={styles.deleteButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                        
                </View>

            </View>
        </Modal>
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
        padding:15,
        marginTop:100,
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
   
    

    trainingType: {
        height: 50,
        width: '99%',
        marginLeft: -10,
        color: "rgba(53,63,79,0.74)",
        fontSize: 18
    },

    typeIcon: {
        size: 24,
        color: "#A6A6A6"
    },

    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:50
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
});

export default ModalGoal;
