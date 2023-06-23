import React, { useState,useEffect } from 'react';
import { FlatList,ActivityIndicator,View, Text, TouchableOpacity, TextInput,ScrollView } from 'react-native';
import TypeSelector from './TypeSelector';
import { API_GATEWAY, USER, ADMIN, ATHLETE, TRAINER } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserListItem from './UserListItem';
import { distance} from '../../utils/locations';
import { getRole,getUser } from '../../utils/getters';
import Client from '../../client/Client';

const UserFilters = ({search}) => {
  const [type,setType] = useState('');
  const [users,setUsers]  = useState([]);
  const [myUser,setMyUser]  = useState({});
  
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
    console.log("--------")
    if (userDistance == null || myDistance == null){
      return false
    } else if (maxDistance == "") {
      return true
    } else {
       let dist = distance(myDistance,userDistance)
       return dist <= parseInt(maxDistance)
    }
      
  }
  useEffect(() => {
    const url = API_GATEWAY + 'users'
    async function getUsers() {
        setLoading(true)
        setError(false)
        let userInfo = await getUser()
        setMyUser(userInfo)
        Client.getUsers(userInfo.access_token).then((data) => {
          setUsers(data)
          setLoading(false)
        }).catch((error) => {
          setError(true);
          setErrorMessage(error.toString());
          setLoading(false)
        })
        }
        getUsers();
    }, [])



    function getFilteredUsers() {
      if (!maxDistance) {
        return users.filter((user) => {
          const notMyUser = myUser.mail != user.mail
          const nameMatches = user.name.toLowerCase().includes(search.toLowerCase());
          const roleMatches = getRole(user.role).toLowerCase().includes(type.toLowerCase());    
          return nameMatches && roleMatches && notMyUser && !user.blocked;
          });
      } else {
        return users.filter((user) => {
          const notMyUser = myUser.mail != user.mail
          const distanceMatches = calculateDistance(myUser.location,user.location)
          const nameMatches = user.name.toLowerCase().includes(search.toLowerCase());
          const roleMatches = getRole(user.role).toLowerCase().includes(type.toLowerCase());    
          return nameMatches && roleMatches && distanceMatches && notMyUser && !user.blocked;
      });
      }
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
                    value={maxDistance}
                    onChangeText={handleMaxDistanceChange}
                  />
              </View>
            )}
          <TypeSelector setType={setType} types={types}></TypeSelector>
        </View> 
        {error && (
            <View style = {{alignItems:"center",marginTop:15}}>
                <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
            </View>
        )}
        <View>
          { loading 
            ? <View style={{marginTop:200, transform: [{ scaleX: 2 }, { scaleY: 2 }]}}>
                <ActivityIndicator size="large" color = "black"/>
              </View>
            :  <View style={{maxHeight:"85%",marginTop:10}}>
                <FlatList
                        data={getFilteredUsers()}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={<View/>}
                        renderItem={({ item }) => (
                            <UserListItem user = {item} myDistance = {myUser.location} myId = {myUser.id}/>
                        )}
                    />
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
    }
};