import {FlatList, View, StyleSheet, Text,ActivityIndicator,ScrollView,TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from '@react-navigation/native';
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavTraining from "../../components/trainings/favTrainings";
import { useIsFocused } from '@react-navigation/native';
import FavoriteListItem from "../search/FavoriteListItem";
import { getErrorMessage,getUser, updateUser } from "../../utils/getters";

const FavoriteTrainingScreen = () => {
    const isFocused = useIsFocused();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();

      
    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
        async function getUsers() {
            setLoading(true);
            setError(false)
            let userInfo = await getUser()
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
            })
            if (!response.ok) {
                setError(true);
                console.log("RESPONSE: ", response.status);
                setErrorMessage(getErrorMessage(response.status))
                setLoading(false);
            } else {
                let data = await response.json()
                setPosts(data.trainings);
                let updatedUser = await updateUser(data,userInfo)
                setUser(updatedUser)
                setLoading(false);
            }
        }
        getUsers();
    }, [isFocused])


    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}> {"Favorites "}
                    
                </Text>
                    { loading 
                        ? <View style={{marginTop:250, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                            <ActivityIndicator size="large" color = "black"/>
                        </View>
                        : <>
                            
                            
                            {posts.length == 0  
                               ? <View style = {{alignItems:"center",marginTop:30}}>
                                    <Text style = {{fontSize:18}}> You don´t have any favorites yet </Text>
                                 </View>
                               : <ScrollView style={styles.scrollView}>
                                    {posts.map((favorite, index) => (
                                        <FavoriteListItem key = {index} favorite = {favorite}></FavoriteListItem> 
                                    ))}
                                </ScrollView>
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
    backgroundColor: 'white',
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

export default FavoriteTrainingScreen;