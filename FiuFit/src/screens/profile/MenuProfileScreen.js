import React,{useState,useEffect} from 'react';
import {ScrollView,View, Image, Text, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../utils/constants';
import {Ionicons} from 'react-native-vector-icons'
import { useIsFocused } from '@react-navigation/native';
import { getUser,getRole,updateUser } from '../../utils/getters';
import Client from '../../client/Client';
import { set } from 'react-native-reanimated';

function MenuProfileScreen({ navigation,route }) {
    const {reload} = route.params
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const isFocused = useIsFocused();
    const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };


    useEffect(() => {
        setLoading(false)
        async function getUsers() {
            setLoading(true);
            let userInfo = await getUser()
            setUser(userInfo)
            Client.getMyUserInfo(userInfo.access_token).then(async data => {
              let updatedUser= await updateUser(data,userInfo)
              setUser(updatedUser)
              setLoading(false);
            })
            .catch(error => {
              setLoading(false)
              setError(true)
              setErrorMessage(error.toString())
            })
        }
        getUsers();
        }, [isFocused])



    return (
        <>
        { loading 
            ? <View style={{marginTop:350, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                <ActivityIndicator size="large" color = "black"/>
              </View>
            : <ScrollView style={{ flex: 1}}>
                
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.profileInfo}>
                        { user.image  
                            ? <Image source={{uri:user.image}} style={styles.profileImage}/>
                            : <Image
                                style={styles.profileImage}
                                source={require('../../../assets/images/profilepic.jpeg')}
                            />
                        }  
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{user.name + " " +user.lastname +" "}
                              { user.verified && (
                                <Ionicons name={"checkmark-done-outline"} size={22} color={"lightblue"} />
                              )}
                            </Text>
                            <Text style={styles.role}>{getRole(user.role)}</Text>
                            
                        </View>
                        </View>
                    </View>

                    <View style={styles.followersContainer}>
                        <Text style={styles.followersCount}>Followers: 100</Text>
                        <Text style={styles.followingCount}>Following: 50</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                      
                        <TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate('Edit Profile',{user : user,reload:reload})}>
                            <Text style={ styles.messageButtonText }>Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('Change Password',{user : user,reload:reload})}>
                            <Text style={styles.followButtonText}>Edit Password</Text>
                        </TouchableOpacity>
                    </View>

                    

                    <View style={styles.tableContainer}>
                        
                        <View style={styles.table}>
                            <Text style={styles.tableHeaderCell}>Phone: {user.phone_number}</Text>
                            <Text style={styles.tableHeaderCell}>Email: {user.mail}</Text>
                            <Text style={styles.tableHeaderCell}>Age: {user.age}</Text>
                        </View>
                       
                    </View>

                    <TouchableOpacity style={styles.trainingButton} onPress={() => navigation.navigate('My Trainings',{user : user,reload:reload})}>
                       <Text style={styles.buttonText}>Trainings</Text>
                    </TouchableOpacity>

                </View>

                


          {/* 
                <View style={{ alignItems: 'center', padding: 20,marginVertical:50}}>
                    { user.image  
                        ? <Image source={{uri:user.image}} style={{ width: 200, height: 200, borderRadius: 100 }} />
                        : <Image source={require('../../../assets/images/profilepic.jpeg')} style={{ width: 200, height: 200, borderRadius: 100 }} />
                    }  
                    <Text style={{ fontSize: 18, color: '#172D34', fontWeight: 'bold', marginTop: 20 }}>
                        {user.name + " " + user.lastname + " "}
                        { user.verified && (
                            <Ionicons name={"checkmark-done-outline"} size={22} color={"lightblue"} />
                        )
                        }
                        
                        
                    </Text>
                    <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20, alignItems: 'flex-start'}}>Age: {user.age}</Text>
                    <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20, alignItems: 'flex-start'}}>Email: {user.mail}</Text>
                    <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20,  alignItems: 'flex-start' }}>Number: {user.phone_number}</Text>
                </View>


                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('My Trainings',{user : user,reload:reload})}>
                    <Text style={styles.buttonText}>Trainings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Profile',{user : user,reload:reload})}>
                    <Text style={ styles.buttonText }>Edit Profile</Text>
                    
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Change Password',{user : user,reload:reload})}>
                    <Text style={styles.buttonText}>Create New Password</Text>
                </TouchableOpacity>*/}

                {error && (
                    <View style = {{alignItems:"center",marginTop:15}}>
                        <Text style = {{fontSize:18,color : "crimson"}}> {errorMessage} </Text>
                    </View>
                )}
            </ScrollView>
          }
          </>
        
    );
}
export default MenuProfileScreen;


const styles = StyleSheet.create({
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
        marginHorizontal: 40
    },container: {
        flex: 1,
        padding: 10,
        backgroundColor:"white",
        margin:10,
       
        borderRadius:15,
        marginTop:25
      },
      header: {
        marginTop:5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding:10,
        borderRadius:15,
        backgroundColor: '#DEE9F8FF',
       
      },
      trainingButton:{
        borderRadius: 10,
        marginTop:10,
        marginBottom:10,
        paddingVertical: 8,
        backgroundColor: '#DEE9F8FF',
        borderRadius: 5,
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
      followButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: 'black',
        borderRadius: 5,
        marginRight: 10,
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
        marginRight: 10,
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
        marginBottom:5
      },
      followersCount: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 100,
      },
      followingCount: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      tableContainer: {
        //flex: 1,
        
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
      },
      tableHeaderCell: {
        fontWeight: 'bold',
        paddingLeft:10,
        fontSize:14,
        marginBottom:5
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
})