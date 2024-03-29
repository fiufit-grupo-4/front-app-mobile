import React, { useState,useEffect } from 'react';
import { API_GATEWAY } from '../../utils/constants';
import { FlatList,ActivityIndicator,View,ScrollView, Text, StyleSheet,SafeAreaView, TextInput, Button, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import ListRecommended from './ListRecommended';
import { getUser} from '../../utils/getters';
import Client from '../../client/Client';

export const HomeTab = () => {
  const [recommendedTrainings,setRecommendedTrainings] =  useState([]);
  const [interest,setInterests] =  useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isFocused = useIsFocused();
  
  
    const notBlocked = (data) =>{
      const filteredData = data.filter(obj => !obj.blocked);
      
      return filteredData.length;
  
    }

  useEffect(() => {
    async function getTrainings() {
        setLoading(true)
        setError(false)
        let userInfo = await getUser()
        setUserData(userInfo)
        let response = await Client.getInterests(userInfo.access_token)
        if (!response.ok){
          setLoading(false);
          setError(true);
          setErrorMessage(error.toString());
        } else {
          let json = await response.json()
          setInterests(json.interest)
          Client.getTrainings(userInfo.access_token).then((data) => {
            
            if ( json.interest.length == 0 ) {
              setRecommendedTrainings(data.reverse())
            } else {
              const filtered = data.filter((training) =>
                json.interest.includes(training.type) && !training.blocked
              );
              setRecommendedTrainings(filtered.reverse())
            }

            setLoading(false);

          }).catch((error) => {
              setLoading(false);
              setError(true);
              setErrorMessage(error.toString());
          })
        }

        }
 
    getTrainings();
    
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }

    if (requestUserPermission()) {
      messaging().getToken().then(async token => { 
        let userInfo = await getUser();
        let url = API_GATEWAY + 'users/' + userInfo.id;
        fetch(url, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + userInfo.access_token,
          },
          body: JSON.stringify({ "device_token" : token })
        }).then((response) => {}).catch((error) => {console.log(error)})
      })
    };

    return messaging().onMessage(async remoteMessage => { 
      console.log(JSON.stringify(remoteMessage));
      //Alert.alert('New foreground message arrived', JSON.stringify(remoteMessage)) 
    })

    }, [isFocused])


    return (
        <View style ={styles.root}>

            <Text style ={styles.title}>Welcome to FiuFit</Text>
            


            <SafeAreaView  >
        
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
                    :  <ScrollView style={{flex:1}}>

                        <View style = {{marginTop:15}}>
                            <Text style ={styles.subtitle}> Trainings just for you:</Text>
                        </View>
                        <FlatList
                                data={recommendedTrainings}
                                keyExtractor={(item) => item.id.toString()}
                                ListFooterComponent={<View/>}
                                horizontal= {true}
                                renderItem={({ item }) => (
                                    <ListRecommended item={item} user={userData} canEdit={false} />
                                )}
                          />

                        {/* 
                        <View style = {{marginTop:15}}>
                            <Text style ={styles.subtitle}>Trainings near to you: </Text>
                        </View>
                          <FlatList
                                data={nearestTrainings}
                                keyExtractor={(item) => item.id.toString()}
                                ListFooterComponent={<View/>}
                                horizontal= {true}
                                contentContainerStyle={{ marginBottom: 50 }}
                                renderItem={({ item }) => (
                                    <ListRecommended item={item} user={userData} canEdit={false} />
                                )}
                          /> */}
                      </ScrollView>
                      
                  }  
                </View>  
            </SafeAreaView>
              
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
      flex:1,
      alignItems: 'center',
      padding: 20,
      paddingBottom:70
      
    },
    container: {
      width: '85%',
      padding: 5,
      alignItems: 'center',
      borderRadius: 15,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      margin: 10,
      marginBottom:20
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      margin: 10,
      marginBottom:20
    },
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
      marginBottom:5,
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

  });

/*


const TrainingFilters = ({search}) => {


  


  useEffect(() => {
    async function getTrainings() {
        setLoading(true)
        let userInfo = await getUser()
        setUserData(userInfo)
        Client.getTrainings(userInfo.access_token).then((data) => {
          console.log(JSON.stringify(data))
          setTrainings(data)
          setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setError(true);
            setErrorMessage(error.toString());
        })
        }
        getTrainings();
    }, [])

  return (
    <SafeAreaView  >
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
            :  <View style={{height:"86%"}}>
                <FlatList
                        data={getFilteredTrainings()}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={<View/>}
                        renderItem={({ item }) => (
                            <TrainingListItem item={item} user={userData} canEdit={false} />
                        )}
                  />
               </View>
               
          }  
        
        </View>  
    </SafeAreaView>
  );
};

export default TrainingFilters

const styles = {
  
};





*/