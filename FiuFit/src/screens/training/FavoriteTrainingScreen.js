import {FlatList, View, StyleSheet, Text,ActivityIndicator,ScrollView,TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from '@react-navigation/native';
import {API_GATEWAY, USER} from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavTraining from "../../components/trainings/favTrainings";
import { useIsFocused } from '@react-navigation/native';
import FavoriteListItem from "../search/FavoriteListItem";

const FavoriteTrainingScreen = () => {
    const isFocused = useIsFocused();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();
    
    

    const favorites = [
        { title: 'Running 32k', type: 'Running', difficulty: '1', description: 'Debes correr por una pradera muchoo sadasdas asdsad ' },
        { title: 'Caminata 2k', type: 'Caminata', difficulty: '2', description: 'Descripción 2' },
        { title: 'Yoga 30 min', type: 'Yoga', difficulty: '3', description: 'Descripción 3' },
        // ... más elementos de la lista de favoritos
      ];


    
      
    useEffect(() => {
        const url = API_GATEWAY + 'users/me'
        async function getUsers() {
            setLoading(true);
            setError(false)
            let storage = await AsyncStorage.getItem(USER)
            let userInfo = JSON.parse(storage)
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
            })
            setLoading(false);

            if (!response.ok) {
                setError(true);
                console.log("RESPONSE: ", response.status);
                if (response.status === 401) {
                    setErrorMessage('Unauthorized, not a valid access token');
                } else {
                    setErrorMessage('Failed to connect with the server');
                }
            } else {
                let data = await response.json()
                console.log(data)
                setUser(data)
                setPosts(data.trainings);
                //await handleSetUser(data,user)
            }
        }
        getUsers();
    }, [isFocused])


    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}> {"Favoritos "}
                    
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