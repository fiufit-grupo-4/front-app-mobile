import {FlatList, View, StyleSheet, Text,ActivityIndicator,ScrollView,TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from '@react-navigation/native';
import {API_GATEWAY, USER} from "../../utils/constants";
import GoalsListItem from "./GoalsListItem";
import { useIsFocused } from '@react-navigation/native';
import { getUser} from "../../utils/getters";
import Client from "../../client/Client";

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
                                <View style={{paddingBottom:20,paddingHorizontal:5,maxHeight:"100%"}}>
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