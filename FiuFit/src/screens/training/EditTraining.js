import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
    TouchableWithoutFeedback, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {API_GATEWAY, USER} from "../../utils/constants";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from "@react-native-picker/picker";
import MediaEditableBox from '../../components/media/MediaEditableBox';
import {firebase} from '../../config/firebase'
import GoalCreator from './GoalCreator';

const EditTraining = ({ onPress , route }) => {
    const {post, reload} = route.params;
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [trainingType, setTrainingType] = useState(post.trainingType);
    const [difficulty, setDifficulty] = useState(post.difficulty);
    const [goals, setGoals] = useState(post.goals); //post.goals
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [media1, setMedia1] = useState(post.media ? post.media[0] ? post.media[0].url : "" : "" );
    const [mediaType1, setMediaType1] = useState(post.media ? post.media[0] ? post.media[0].media_type : "" : "" );
    const [media2, setMedia2] = useState(post.media ? post.media[1] ? post.media[1].url : "" : "" );
    const [mediaType2, setMediaType2] = useState(post.media ? post.media[1] ? post.media[1].media_type : "" : "");
    const [media3, setMedia3] = useState(post.media ? post.media[2] ? post.media[2].url : "" : "" );
    const [mediaType3, setMediaType3] = useState(post.media ? post.media[2] ? post.media[2].media_type : "" : "");
    const [media4, setMedia4] = useState( );
    const [mediaType4, setMediaType4] = useState(post.media ? post.media[3] ? post.media[3].media_type : "" : "");

    const navigation = useNavigation();

    const handleDifficulty = (value) => {
        setDifficulty(value);
    };

    const trainingItems = [
        { label: "", value: "" },
        { label: "Walking", value: "Walking" },
        { label: "Running", value: "Running" },
        { label: "Resistance", value: "Resistance" },
        { label: "Flexibility", value: "Flexibility" },
        { label: "Fitness", value: "Fitness" },
        { label: "Calisthenics", value: "Calisthenics" },
        { label: "Balance", value: "Balance" },
        { label: "Yoga", value: "Yoga" },
    ];

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


    const uploadElement = async (user,media,media_type,array,old)=>{
        let old_url = old? old.url : ""
        let old_type = old? old.media_type : ""
        if (old_url == media && old_url != ""){
            let element = {
                "media_type": old_type,
                "url" : old_url
            }
            array.push(element)
        } else if (media){
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
        await uploadElement(user,media1,mediaType1,array,post.media[0])
        await uploadElement(user,media2,mediaType2,array,post.media[1])
        await uploadElement(user,media3,mediaType3,array,post.media[2])
        await uploadElement(user,media4,mediaType4,array,post.media[3])
        return array

    }



    const handleSaveChanges = async () => {
        let url = API_GATEWAY + "trainers/me/trainings/" + post.id
        setLoading(true);
        setError(false)
        
        let item =  await AsyncStorage.getItem(USER)
        let userInfo = JSON.parse(item)
        let array = await handleMedia(userInfo)
        console.log(array)

        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.access_token,
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "type": trainingType,
                "difficulty" : difficulty,
                "media":array
            })
        })

       
        
        if (!response.ok) {
            setError(true);
            setLoading(false);
            if (response.status === 401) {
                setErrorMessage('Unauthorized, not a valid access token');
            } else {
                setErrorMessage('Failed to connect with the server');
            }
        } else {
            let data = await response.json()
            console.log(JSON.stringify(data))
            setLoading(false);
            navigation.goBack()
        }
      
    }



    function handleDelete() {
        let url = API_GATEWAY + "trainers/me/trainings/" + post.id
        setLoading(true);
        setError(false)
        AsyncStorage.getItem(USER).then((item) => {
            let userInfo = JSON.parse(item)
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userInfo.access_token,
                },
            }).then((response) => {
                setLoading(false);
                console.log(JSON.stringify(response))
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
                        navigation.navigate("Profile",{reload:!reload})
                    }).catch((error) => {
                        setError(true);
                        setErrorMessage(error);
                    });
                }})}).catch((error) => {
            setError(true);
            setErrorMessage(error);
        })
    }

    return (
        <View style={{padding: 20, backgroundColor: 'white', flex:1}}>

            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Title</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="md-barbell-outline" size={16} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16, color: '#333', width: '99%'}}
                            placeholder="Enter the title"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Description</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="md-pencil-outline" size={16} color="#A6A6A6" style={styles.icon}/>
                        <TextInput
                            style={{fontSize: 16, color: '#333', width: '99%',}}
                            placeholder="Enter the description"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.text}> Difficulty </Text>
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Ionicons name="ios-stats-chart-outline" size={16} color="#A6A6A6" style={styles.icon}/>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <TouchableWithoutFeedback key={value} onPress={() => handleDifficulty(value)}>
                                    <Icon name={value <= difficulty ? 'star' : 'star-outline'} size={20} color="#FDB813" />
                                </TouchableWithoutFeedback>
                            ))}
                            <Text style={{ marginLeft: 10 }}>{difficulty > 0 ? ' ' + ' ' : ' '}</Text>
                        </View>
                    </View>
                </View>

                <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                    <View style={{padding:1, marginTop:10, paddingTop:10 }}>
                        <Text style={styles.text}>Training Type</Text>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="fitness-outline" size={24} color="#A6A6A6" style={styles.icon}/>
                            <Picker
                                selectedValue={trainingType}
                                style={{ height: 50, width: '99%', marginLeft: -17, marginTop: -12, color: "rgba(53,63,79,0.74)", fontSize: 18, }}
                                onValueChange={(itemValue) =>
                                {setTrainingType(itemValue)}}
                            >
                                {trainingItems.map((item, index) => (
                                    <Picker.Item key={index} label={item.label} value={item.value} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>




            <View style = {{marginTop:10,marginBottom:10}}>

            <ScrollView
                    contentContainerStyle={styles.mediaContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    >
                    <MediaEditableBox setElement = {setMedia1} setMediaElement = {setMediaType1} oldMedia = {post.media[0]}/>
                    <MediaEditableBox setElement = {setMedia2} setMediaElement = {setMediaType2} oldMedia = {post.media[1]}/>
                    <MediaEditableBox setElement = {setMedia3} setMediaElement = {setMediaType3} oldMedia = {post.media[2]}/>
                    <MediaEditableBox setElement = {setMedia4} setMediaElement = {setMediaType4} oldMedia = {post.media[3]}/>
                    
            </ScrollView>
            </View>

            <View style = {{marginBottom:20}}>
            <GoalCreator goals= {goals} setGoals={setGoals}></GoalCreator>
            </View>
            { loading 
                ? <View style={{marginBottom:100, marginHorizontal: 40}}>
                        <ActivityIndicator size="large" color = "black"/>
                    </View>
                : <>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.deleteButtonText}>Delete Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        
                    </View>


                  </>
            }

            {error && (
                    <View style = {{alignItems:"center",marginTop:15}}>
                        <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                    </View>
                )}
            

            
            </ScrollView>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:50
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
        marginTop:20
    },
    icon: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: '#788FAD',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
       
    },
    deleteButtonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold"
    },
    deleteButton: {
        backgroundColor: 'crimson',
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10
    },
    trainingType: {
        height:5,
        maxHeight:10,
        backgroundColor: 'red'
    },
    typeIcon: {
        marginRight: 10,
        marginTop: 5,
        fontSize: 16,
        color: "#A6A6A6"
    }
})


export default EditTraining;
