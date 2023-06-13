import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    SafeAreaView,ScrollView
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getUser,getErrorMessage } from '../../utils/getters';
import Client from '../../client/Client';
import ModalGoal from '../Goal/ModalGoal';
import CustomButton from '../../components/buttons/CustomButton';
import TrainingGoal from '../Goal/TraniningGoal';
export const GoalCreator = ({ goals, setGoals  }) => {
   
    const [modalVisible, setModalVisible] = useState(false);
    const [newGoal, setNewGoal] = useState({
        metric: '',
        title: '',
        description: '',
        quantity: ''
    });

    const addGoal = () => {
        setModalVisible(true);
    };

    const handleSaveGoal = () => {
        
        if (
          newGoal.metric === '' ||
          newGoal.quantity === '' ||
          newGoal.title === '' ||
          newGoal.description === ''
        ) {
         Alert.alert('Error', 'Please fill all fields');
          return;
        }

        const newFullGoal = {
          metric:  newGoal.metric,
          title: newGoal.title,
          description: newGoal.description,
          quantity: newGoal.quantity
        };
    
        setGoals([...goals, newFullGoal]);

        setNewGoal({
          tipo: '',
          titulo: '',
          descripcion: '',
          cantidad: ''
        });
    
        setModalVisible(false);
      };

      const deleteGoal = (goal) => {
        const newGoals = goals.filter((g) => g !== goal);
        setGoals(newGoals);
      };

    return (
    <View>
        
        
        <ScrollView style = {{padding:5}} >
            {goals.map((goal, index) => (
                <TrainingGoal key={index} item={goal} onDelete={deleteGoal} />
            ))}
        </ScrollView>
        


        <TouchableOpacity style={styles.button} onPress={addGoal}>
            <Text style={styles.buttonText}>Add Goal</Text>
        </TouchableOpacity>
        <ModalGoal newGoal={newGoal} setNewGoal={setNewGoal} modalVisible={modalVisible} handleSave={handleSaveGoal} setModal={setModalVisible}></ModalGoal>
    </View>)
}



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
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop:20,
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
    },
    mediaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      }
});

export default GoalCreator;