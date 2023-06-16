import {FlatList, View, StyleSheet, Text,ActivityIndicator,ScrollView,TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from '@react-navigation/native';
import {API_GATEWAY, USER} from "../../utils/constants";
import GoalsListItem from "./GoalsListItem";
import { useIsFocused } from '@react-navigation/native';
import { getUser} from "../../utils/getters";
import Client from "../../client/Client";


const GOALS = [
    {
        "id": "1",
        "title": "Caminata",
        "description": "Caminar por palermo 1 hora, haciendo dos breves pausas de 5 minutos. ",
        "metric": "Distancia recorrida",
        "limit_time": "2023-07-08T15:26:20.558Z",
        "quantity": 10,
        "progress": 2,
        "state":2,
        "difficulty": 2,
    },
    {
        "id":"2",
        "title": "Caminata",
        "description": "Caminar por palermo 5 hora",
        "metric": "Distancia recorrida",
        "limit_time": "2023-07-08T15:26:20.558Z",
        "quantity": 5,
        "progress": 2,
        "state":2,
        "difficulty": 3,
    },
    {
        "id":"3",
        "title": "Abdominales",
        "description": "1.30 de abs.",
        "metric": "Calorias utilizadas",
        "limit_time": "2023-07-08T15:26:20.558Z",
        "quantity": 2,
        "progress": 2,
        "state":3,
        "difficulty": 4,
    },
    {
        "id":"4",
        "title": "GAP",
        "description": "abs ggggggg oppp ",
        "metric": "Calorias utilizadas",
        "limit_time": "2023-07-08T15:26:20.558Z",
        "quantity": 1,
        "progress": 1,
        "state":3,
        "difficulty": 4,
    },
    {
        "id":"5",
        "title": "GAPX2",
        "description": "abs ggggggg oppp ",
        "metric": "Calorias utilizadas",
        "limit_time": "2023-07-08T15:26:20.558Z",
        "quantity": 100,
        "progress": 80,
        "state":2,
        "difficulty": 5,
    },
    {
        "id":"42",
        "title": "GAPX2",
        "description": "abs ggggggg oppp ",
        "metric": "Calorias utilizadas",
        "limit_time": "2023-07-08T15:26:20.558Z",
        "quantity": 100,
        "progress": 80,
        "state":2,
        "difficulty": 5,
    },
]

const GoalsScreen = () => {
    const isFocused = useIsFocused();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [goals,setGoals] = useState({})
    
      
    useEffect(() => {
        async function getGoals() {
            setLoading(true)
            setError(false)
            let userInfo = await getUser()
            Client.getGoals(userInfo.access_token).then((data) => {
                setGoals(data)
                console.log(data)
                setLoading(false)
            }).catch((error) => {
                setError(true);
                setErrorMessage(error.toString());
                setLoading(false)
            })
        }

        
        getGoals();

        }, [isFocused])


    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}> {"Goals "}</Text>
                    { loading 
                        ? <View style={{marginTop:250, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                            <ActivityIndicator size="large" color = "black"/>
                        </View>
                        : <>
                            
                            
                            {goals.length == 0  
                               ? <View style = {{alignItems:"center",marginTop:30}}>
                                    <Text style = {{fontSize:18}}> You don´t have any Goals yet </Text>
                                 </View>
                               : 
                                <View style={{padding:5,}}>
                                    <FlatList
                                        data={goals}
                                        keyExtractor={(goalItem) => goalItem.id}
                                        ListFooterComponent={<View/>}
                                        renderItem={({item}) => (

                                                <GoalsListItem item={item} user={user} ></GoalsListItem>
                                        )}
                                    />
                                </View>
                            }

                            {error && (
                                <View style = {{alignItems:"center",marginTop:15}}>
                                    <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                                </View>
                            )}
                        </>
                    }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
   
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:20
  },
  favoriteContainer: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 10,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  type: {
    marginTop: 2,
    fontSize: 16,
    marginBottom: 10,
    color:"gray"
  },
  difficulty: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
  },
  starIcon: {
    marginRight: 4,
  }
});

export default GoalsScreen;