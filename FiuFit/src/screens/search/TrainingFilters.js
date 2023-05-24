import React, { useState,useEffect } from 'react';
import { FlatList,ActivityIndicator,View, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import TypeSelector from './TypeSelector';
import { API_GATEWAY, USER, ADMIN, ATHLETE, TRAINER } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Training from "../../components/trainings/Training";
import TrainingListItem from './TrainingListItem';
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TrainingFilters = ({search}) => {
  const [minDifficulty, setMinDifficulty] = useState('');
  const [maxDifficulty, setMaxDifficulty] = useState('');
  const [type,setType] = useState('');
  const types = ['Running', 'Caminata','Boxeo','Yoga','Cardio'];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [trainings,setTrainings] =  useState([]);
  const [difficulty, setDifficulty] = useState(5);
  const [lastDifficulty, setLastDifficulty] = useState(5);
  const [cancel,setCancel]= useState(false)

  const handleMinDifficultyChange = (value) => {
    setMinDifficulty(value);
  }

  const handleMaxDifficultyChange = (value) => {
    setMaxDifficulty(value);
  }

  const handleDifficulty = (value) => {
    setLastDifficulty(difficulty)
    if (value == 5 && lastDifficulty == 5){
      setCancel(!cancel)
    } else {
      setCancel(false)
    } 
    setDifficulty(value);
  };

  


  useEffect(() => {
    const url = API_GATEWAY + 'trainings/'
    async function getTrainings() {
        setLoading(true)
        AsyncStorage.getItem(USER).then((item) => {
            let userInfo = JSON.parse(item)
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
            }).then((response) => {
                setLoading(false);
                if (!response.ok) {
                  console.log(response.status)
                    setError(true);
                    if (response.status === 401) {
                        setErrorMessage('Unauthorized, not a valid access token');
                    } else {
                        setErrorMessage('Failed to connect with the server');
                    }
                } else {
                    response.json().then((data) => {
                        console.log(JSON.stringify(data))
                        setTrainings(data)
                }).catch((error) => {
                    setError(true);
                    setErrorMessage(error);
                });
            }}).catch((error) => {
                setError(true);
                setErrorMessage(error);
        })}).catch((error) => {
            setError(true);
            setErrorMessage(error);
        });
        }
        getTrainings();
    }, [])

    function getFilteredTrainings() {
      return trainings.filter((training) => {
          const nameMatches = training.title.toLowerCase().includes(search.toLowerCase());
          const typeMatches = training.type.toLowerCase().includes(type.toLowerCase());
          
          const difficultyMatches = training.difficulty <= difficulty
          //const minDifficultyMatches = minDifficulty <= training.difficulty.toString()
          //const maxDifficultyMatches = maxDifficulty >= training.difficulty.toString()
          return nameMatches && difficultyMatches && typeMatches ;
      });
  }

  return (
    <View>
        <View style={styles.filtersContainer}>

            
            <View style={styles.distanceContainer}>
              <Text style={styles.textInput}>Difficulty:</Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:10}}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <TouchableWithoutFeedback key={value} onPress={() => handleDifficulty(value)}>
                                    {cancel 
                                      ? <Icon name= 'star-outline' size={25} color="#FDB813" />
                                      : <Icon name={value <= difficulty ? 'star' : 'star-outline'} size={25} color="#FDB813" />
                                    }
                                    
                                </TouchableWithoutFeedback>
                            ))}
                            <Text style={{ marginLeft: 10 }}>{difficulty > 0 ? ' ' + ' ' : ' '}</Text>
                        </View>
            </View>
            <TypeSelector setType={setType} types={types}></TypeSelector>
        </View>
        
          

        <View>
          { loading 
            ? <View style={{marginTop:10}}>
                <ActivityIndicator size="large" color = "black"/>
              </View>
            :  <View style={{marginTop:10 }}>
                <FlatList
                        data={getFilteredTrainings()}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 400 }}
                        renderItem={({ item }) => (
                            <TrainingListItem item={item} />
                        )}
                    />
                  {error && (
                    <View style = {{alignItems:"center",marginTop:15}}>
                        <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                    </View>
                  )}
               </View>
               
          }  
        
        </View>  
    </View>
  );
};

export default TrainingFilters

const styles = {
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop:10

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  filtersContainer:{
    backgroundColor: '#91AED4',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
   
    },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft:5,
    },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
    },
    difficultyInput: {
        flex: 1,
        width: 60,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        marginLeft:10,
        marginRight: 10,
        
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:10
    },
    distanceInput: {
        flex: 1,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
       marginLeft:10,
        marginRight: 10,
    },
    textInput: {
    

      borderRadius: 5,
      padding: 5,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft:5,
  }
};