import React,{useState,useEffect} from 'react';
import {ScrollView,View, Image, Text, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import { ADMIN, ATHLETE, TRAINER } from '../../utils/constants';
import {Ionicons} from 'react-native-vector-icons'
import { getRole,getUser,getErrorMessage } from '../../utils/getters';
import { useIsFocused } from '@react-navigation/native';
import Client from '../../client/Client';
import FollowersContainer from '../../components/followers/FollowersContainer';
import firestore from '@react-native-firebase/firestore';


const UserProfile = ({ navigation,route }) => {
  const {user,id} = route.params;
  const followed = (user) => {
    let followed = false
    user.followers.map( follows => {
      if (id == follows) {
        followed = true 
        return }
    })
    return followed
  }
  const isFocused = useIsFocused();
  const [userInfo, setUser] = useState(user);
  const [isFollowing, setIsFollowing] = useState(followed(user));
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("false");

 
  useEffect(() => {
    setLoading(false)
    setUser(user)
    async function getUsers() {
        let  myUser = await getUser()
        Client.getUserById(myUser.access_token,user.id).then(async data => {

          setIsFollowing(followed(data))
          setUser(data)
         
        })
        .catch(error => {
          setError(true)
          setErrorMessage(error.toString())
        })
    }
    getUsers();
    }, [isFocused,isFollowing,user])
  
  
  const handleFollow = async () => {
    setLoading(true)
    setError(false)
    let myUser = await getUser()
    let endpoint = isFollowing? "/unfollow" : "/follow"
    let response = await Client.handleFollowUser(myUser.access_token,userInfo.id,endpoint) 
    if (!response.ok) { 
      console.log(response.status)
      setError(true)
      setErrorMessage(getErrorMessage(response.status))  
          
    } else {
      let json = await response.json()

      setIsFollowing(!isFollowing);
    }
    setLoading(false)
  };

  const handleMessage = async () => {
    setLoadingMessage(true)
    setError(false)
    let myUser = await getUser()
    const chatsRef = firestore().collection('chats');
    const exist = false
    // Buscar el chat existente entre los usuarios
    const query = chatsRef.where('participants', 'array-contains', myUser.id );
    const snapshot = await query.get();

    if (!snapshot.empty) {
      snapshot.docs.forEach((doc) => {
        const chat = doc.data()
        if (chat.participants.includes(userInfo.id)){
          const chatId = doc.id;
          const newChat = {
            id: chatId,
            participants: chat.participants,
            messages: chat.messages,
            users : chat.users
          }

         
          exist = true
          navigation.navigate("Message Chat", { chat: newChat,myId: myUser.id });
        } 
      })
    } 

    if (!exist) {
      
      const newChat = {
        participants: [myUser.id ,  user.id],
        users: [
          { id: myUser.id , image : myUser.image, lastname: myUser.lastname, name: myUser.name  },
          { id: user.id, image : user.image, lastname: user.lastname, name: user.name },
        ],
        messages: [],
      };

      const docRef = await chatsRef.add(newChat);
      const chatId = docRef.id;

      const chat = {
        id: chatId,
        participants: newChat.participants,
        messages: newChat.messages,
        users : newChat.users
      }


      navigation.navigate("Message Chat", { chat: chat,myId: myUser.id });
    }
    
    setLoadingMessage(false)
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          { userInfo.image && userInfo.image !="string"
            ? <Image source={{uri:userInfo.image}} style={styles.profileImage}/>
            : <Image
                style={styles.profileImage}
                source={require('../../../assets/images/profilepic.jpeg')}
              />
          }  
          
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{userInfo.name + " " +userInfo.lastname + " "} 
            
            { userInfo.verification?.verified && (
                  <Ionicons name={"checkmark-done-outline"} size={20} color={"lightskyblue"} />
              )
            }
            </Text>
            <Text style={styles.role}>{getRole(userInfo.role)}</Text>
            
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
         
          <TouchableOpacity
            style={styles.followButton}
            onPress={handleFollow}
           >
            {loading 
              ? <ActivityIndicator color = "white"></ActivityIndicator>
              :<Text style={styles.followButtonText}>
                {isFollowing ? 'Unfollow' : 'Follow'}
               </Text>
            }
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.messageButton} onPress={handleMessage} >
            {loadingMessage
                ? <ActivityIndicator color = "white"></ActivityIndicator>
                :<Text style={styles.messageButtonText}>Message</Text>
            }
          </TouchableOpacity> 

          
        </View>

        {error && (
            <View style = {{alignItems:"center",marginTop:15}}>
                <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
            </View>
        )}
        
        
        { userInfo.role != ATHLETE && (
          <TouchableOpacity style={styles.trainingButton} onPress={() => navigation.navigate('Trainings',{user : user,myUser:false})}>
            <Text style={styles.buttonText}>View Trainings</Text>
          </TouchableOpacity>
        )}
        

      <FollowersContainer followers={userInfo.followers} following={userInfo.following}></FollowersContainer>
      
      <View style={styles.tableContainer}>
            <View style={styles.table}>
                <Text style={styles.tableHeaderCell}>Phone: {userInfo.phone_number}</Text>
                <Text style={styles.tableHeaderCell}>Email: {userInfo.mail}</Text>
                <Text style={styles.tableHeaderCell}>Age: {userInfo.age}</Text>
            </View>
      </View>
    </View>
  );
};

const styles = {
  buttonText: {
    fontSize: 16,
    color: 'rgba(23,29,52,0.93)',
    textAlign: 'center',
    fontWeight:"bold"
},
button: {
    backgroundColor: '#DEE9F8FF',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop:20,
    marginHorizontal: 40,
    textAlign:"center",
    width:"60%"
},container: {
    flex: 1,
    padding: 10,
    backgroundColor:"white",
    margin:10,
    height:720,
    borderRadius:15,
    marginTop:20
  },
  header: {
    marginTop:5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding:10,
    borderRadius:15,
    backgroundColor: '#DEE9F8FF',
    borderWidth:1
  },
  trainingButton:{
    borderRadius: 10,
    marginTop:10,
    marginBottom:10,
    paddingVertical: 8,
    backgroundColor: '#DEE9F8FF',
    width:"100%",
    textAlign:"center"
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
  },
  buttonsContainer: {
    justifyContent: "center",
    flexDirection: 'row',
    padding: 5,
    marginBottom:10,
    marginTop:10
  },
  followButtonContainer: {

    backgroundColor: 'black',

  },
  followButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'black',
    borderRadius: 5,
    marginRight:5,
    alignItems:"center",
    width:"50%"
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:"center"
  },
  messageButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#788FAD',
    borderRadius: 5,
    marginLeft:5,
    width:"50%",
    alignItems:"center",
  },

  payButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#DEE9F8FF',
    borderRadius: 5,
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    
    fontWeight: 'bold',
  },
  followersContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    backgroundColor: '#DEE9F8FF',
    borderTopWidth:1,
    borderBottomWidth:1,
    padding:8,
    marginBottom:5,
    marginTop:20,
    borderColor:"rgba(23,29,52,0.93)"
  },
  followersCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 100,
    color:"rgba(23,29,52,0.93)"
  },
  followingCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"rgba(23,29,52,0.93)"
  },
  tableContainer: {
    marginTop:20
    
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#DEE9F8FF',
    paddingVertical: 10,
    borderTopWidth:1,
    borderBottomWidth:1,
    marginTop:5,
    marginBottom:5
  },
  table: {
    backgroundColor: '#DEE9F8FF',
    paddingVertical: 10,
    borderTopWidth:1,
    borderBottomWidth:1,
    marginTop:5,
    marginBottom:5,
    borderColor:"rgba(23,29,52,0.93)"
  },
  tableHeaderCell: {
    borderColor:"rgba(23,29,52,0.93)",
    paddingLeft:10,
    fontSize:18,
    marginBottom:10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
};

export default UserProfile;



