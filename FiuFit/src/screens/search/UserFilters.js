import React, { useState,useEffect } from 'react';
import { FlatList,ActivityIndicator,View, Text, TouchableOpacity, TextInput,ScrollView } from 'react-native';
import TypeSelector from './TypeSelector';
import { API_GATEWAY, USER, ADMIN, ATHLETE, TRAINER } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserListItem from './UserListItem';
import { getLocation,calcularDistancia } from '../../utils/locations';

const UserFilters = ({search}) => {
  const [type,setType] = useState('');
  const [users,setUsers]  = useState([]);
  const [myUser,setMyUser]  = useState({});
  const [location,setLocation]  = useState({});
  
  const [maxDistance, setMaxDistance] = useState('');
  const [minDistance, setMinDistance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const types = ['Athlete', 'Trainer','Admin'];
  
  const handleMinDistanceChange = (value) => {
    setMinDistance(value);
  };

  const handleMaxDistanceChange = (value) => {
    setMaxDistance(value);
  };

  const calculateDistance = (myDistance,userDistance) =>{
    if (!userDistance){
      console.log("-------------------------------")
      console.log("El otro usuario no tiene distancia")
      return false
    } else if (!myDistance){
      console.log("Mi usuario no tiene distancia")
      console.log("-------------------------------")
      return false 
    } else {
      calcularDistancia(
        myDistance.location.latitude,
        userDistance.location.latitude,
        myDistance.location.longitude,
        userDistance.location.longitude
      )

    }
      
  }
  useEffect(() => {
    const url = API_GATEWAY + 'users/'
    async function getUsers() {
        setLoading(true)
        AsyncStorage.getItem(USER).then((item) => {
            let userInfo = JSON.parse(item)
            setMyUser(userInfo)
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
            }).then((response) => {
                setLoading(false);
                if (!response.ok) {
                    setError(true);
                    if (response.status === 401) {
                        setErrorMessage('Unauthorized, not a valid access token');
                    } else {
                        setErrorMessage('Failed to connect with the server');
                    }
                } else {
                    response.json().then((data) => {
                        console.log(JSON.stringify(data))
                        setUsers(data)
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
        getUsers();
    }, [])


    function getRole(role){
        if (role == ADMIN){
            return "Admin"
        } else if (role == TRAINER){
            return "Trainer"
        } else if (role == ATHLETE){
            return "Athlete"
        } else {
            return "Undefined"
        }
        }

    function getFilteredUsers() {
        return users.filter((user) => {
            //calculateDistance(myUser.location,user.location)
            const nameMatches = user.name.toLowerCase().includes(search.toLowerCase());
            const roleMatches = getRole(user.role).toLowerCase().includes(type.toLowerCase());    
            return nameMatches && roleMatches ;
        });
    }

  return (
    <View>
        <View style={styles.filtersContainer}> 
              {myUser.location && (
                    <View style={styles.distanceContainer}>
                        <Text style={styles.textInput}>Distance:</Text>
                        <TextInput
                          style={styles.distanceInput}
                          keyboardType="numeric"
                          placeholder="Max (km)"
                          value={minDistance}
                          onChangeText={handleMinDistanceChange}
                        />
                    </View>
              )}

          <TypeSelector setType={setType} types={types}></TypeSelector>
        </View> 
       

        <View>
          { loading 
            ? <View style={{marginTop:10}}>
                <ActivityIndicator size="large" color = "black"/>
              </View>
            :  <View style={{marginTop:10 }}>
                <FlatList
                        data={getFilteredUsers()}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 30 }}
                        renderItem={({ item }) => (
                            <UserListItem user = {item}/>
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

export default UserFilters

const styles = {
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
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
    },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },
    difficultyInput: {
        flex: 1,
        width: 60,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
        
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:5
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
        marginBottom:5,
        borderRadius: 5,
        padding: 5,
        marginLeft:15,
        marginRight: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft:5,
    }
};