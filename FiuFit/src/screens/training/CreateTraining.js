import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TrainingType from "../../components/trainings/ListType";
import {firebase} from '../../config/firebase'
import MediaBox from '../../components/media/MediaBox';
import { getUser,getErrorMessage } from '../../utils/getters';
import Client from '../../client/Client';
import ListType from "../../components/trainings/ListType";

export const CreateTraining = ({ navigation }) => {
    const [imageUri, setImageUri] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [difficulty, setDifficulty] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const [media1, setMedia1] = useState("");
    const [mediaType1, setMediaType1] = useState("");
    const [media2, setMedia2] = useState("");
    const [mediaType2, setMediaType2] = useState("");
    const [media3, setMedia3] = useState("");
    const [mediaType3, setMediaType3] = useState("");
    const [media4, setMedia4] = useState("");
    const [mediaType4, setMediaType4] = useState("");


    const trainingItems = [
        { label: " ", value: " " },
        { label: "Caminata", value: "Caminata" },
        { label: "Running", value: "Running" },
    ];


    const handleDifficulty = (value) => {
        setDifficulty(value);
    };


    const uploadMedia = async (video,user) => {
        setLoading(true);
        const response = await fetch(video);
        const blob = await response.blob();
        let date = new Date().getTime()
        await firebase.storage().ref().child(`users/${user.mail}/training/${date}`).put(blob)
        const uri = await firebase.storage().ref().child(`users/${user.mail}/training/${date}`).getDownloadURL()   
        setLoading(false) 
        return uri   
    }


    const uploadElement = async (user,media,media_type,array)=>{
         if (media){
            let uri = await uploadMedia(media,user)
            let element = {
                "media_type": media_type,
                "url" : uri
            }
            array.push(element)
        }
    }
    const handleMedia = async (user)=> {
        let array = []
        await uploadElement(user,media1,mediaType1,array)
        await uploadElement(user,media2,mediaType2,array)
        await uploadElement(user,media3,mediaType3,array)
        await uploadElement(user,media4,mediaType4,array)
        return array

    }

    const resetStates =  ()=> {
        setImageUri('');
        setTitle('');
        setDescription('');
        setType('');
        setDifficulty(0);
        setLoading(false);
        setError(false);
        setErrorMessage("");
        setMedia1("");
        setMediaType1("")
        setMedia2("");
        setMediaType2("")
        setMedia3("");
        setMediaType3("")
        setMedia4("");
        setMediaType4("")
    }




    const createPost = async () => {
        console.log(type)
        if (!title || !description  || !type || !difficulty) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (title.trim() === '' || description.trim() === '' || type.trim() === '' || !difficulty) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        let user = await getUser()
        let array = await handleMedia(user)
        setLoading(true)
        setError(false)  
        let response = await Client.createNewPost(user.access_token,title,description,type,difficulty,array)
        setLoading(false)
        if (!response.ok) {
            setError(true);
            setErrorMessage(getErrorMessage(response.status))
        } else {
            let data = await response.json()
            console.log(JSON.stringify(data))
            ToastAndroid.show('Post created succesfully!', ToastAndroid.SHORT)                
            navigation.goBack();
        }

        /*
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.access_token,
            },
            body: JSON.stringify({       
                "title": title,
                "description": description,
                "type": type,
                "difficulty": difficulty,
                "media": array
            })
        })
        setLoading(false)
        if (!response.ok) {
            setError(true);
            if (response.status === 401) {
                setErrorMessage('Unauthorized, not a valid access token');
            } else {
                setErrorMessage('Failed to connect with the server');
            }
        } else {
            let data = await response.json()
            console.log(JSON.stringify(data))                
            navigation.goBack();
        }*/
        resetStates()
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.botton}>NEW POST</Text>
        <View>

        </View>
            <ScrollView style={{margin:10}}>
                <View style={styles.boxContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="md-barbell-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="md-pencil-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            multiline={true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="ios-stats-chart-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                        <Text style={styles.difficultyInput}> Difficulty:  </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <TouchableWithoutFeedback key={value} onPress={() => handleDifficulty(value)}>
                                        <Icon name={value <= difficulty ? 'star' : 'star-outline'} size={20} color="#FDB813" />
                                    </TouchableWithoutFeedback>
                                ))}
                        <Text style={{ marginLeft: 10 }}>{difficulty > 0 ? ' ' + ' ' : ' '}</Text>
                        </View>
                    </View>

                <ListType listItem = {trainingItems} icon={"fitness-outline"}  setType={setType} styles={styles}/>

                </View>

                <ScrollView
                    contentContainerStyle={styles.mediaContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    >
                    <MediaBox setElement = {setMedia1} setMediaElement = {setMediaType1}/>
                    <MediaBox setElement = {setMedia2} setMediaElement = {setMediaType2} />
                    <MediaBox setElement = {setMedia3} setMediaElement = {setMediaType3} />
                    <MediaBox setElement = {setMedia4} setMediaElement = {setMediaType4}/>
                    
                </ScrollView>


                { loading 
                ? <View style={{marginTop:50, marginHorizontal: 40}}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                : <TouchableOpacity style={styles.button} onPress={createPost}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                }

                {error && (
                    <View style = {{alignItems:"center",marginTop:15}}>
                        <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                    </View>
                )}

                </ScrollView>
            </View>
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
        marginTop:0,
        flex:1,
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
        color: 'rgba(23,29,52,0.93)',
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: '#F0A500',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop:50,
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

export default CreateTraining;

/*
import { ScrollView } from 'react-native';
import MediaBox from './MediaBox';

const YourScreen = () => {
  return (
    
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
};

export default YourScreen;

*/