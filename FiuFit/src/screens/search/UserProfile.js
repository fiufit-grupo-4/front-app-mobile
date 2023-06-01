import React,{useState,useEffect} from 'react';
import {ScrollView,View, Image, Text, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import { ADMIN, ATHLETE, TRAINER } from '../../utils/constants';
import {Ionicons} from 'react-native-vector-icons'
import { getRole } from '../../utils/getters';



const UserProfile = ({ navigation,route }) => {
  const {user} = route.params
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };


  return (
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
            <Text style={styles.name}>{user.name + " " +user.lastname + " "} 
            
            { user.verification?.verified && (
                  <Ionicons name={"checkmark-done-outline"} size={20} color={"lightskyblue"} />
              )
            }
            </Text>
            <Text style={styles.role}>{getRole(user.role)}</Text>
            
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.followButton}
            onPress={handleFollow}
           >
            <Text style={styles.followButtonText}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity> 

          
        </View>
        
        { user.role != ATHLETE && (
          <TouchableOpacity style={styles.trainingButton} onPress={() => navigation.navigate('Trainings',{user : user,myUser:false})}>
            <Text style={styles.buttonText}>View Trainings</Text>
          </TouchableOpacity>
        )}
        


      <View style={styles.followersContainer}>
        <Text style={styles.followersCount}>Followers: 100</Text>
        <Text style={styles.followingCount}>Following: 50</Text>
      </View>
      <View style={styles.tableContainer}>
            <View style={styles.table}>
                <Text style={styles.tableHeaderCell}>Phone: {user.phone_number}</Text>
                <Text style={styles.tableHeaderCell}>Email: {user.mail}</Text>
                <Text style={styles.tableHeaderCell}>Age: {user.age}</Text>
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



