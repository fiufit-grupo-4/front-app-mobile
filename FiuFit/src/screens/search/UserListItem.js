import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { distance} from '../../utils/locations';
import {Ionicons} from 'react-native-vector-icons'

const UserListItem = ({ user, myDistance }) => {
  const navigation = useNavigation();
  function handleOnPress() {
    navigation.navigate("User Profile", {user:user})
  }

  function distancia (){
    if (user.location == null || myDistance == null){
      return 0
    } else {
      return distance( myDistance, user.location)
    }
  }
  function showDistance(){
    return myDistance !=null &&  user.location !=null
  }

  return (
    <TouchableOpacity onPress={handleOnPress}>
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
         { user.image  
            ? <Image source={{uri:user.image}} style={styles.avatar}/>
            : <Image source={ require('../../../assets/images/profilepic.jpeg') } style={styles.avatar} />
          }  
        
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name + " " + user.lastname + " "}
          { user.verification?.verified && (
                <Ionicons name={"checkmark-done-outline"} size={18} color={"lightblue"} />
            )
          }
        </Text>
        <Text style={styles.role}>{user.mail}</Text>
      </View>
      {showDistance() && (
        <View style={styles.distanceInfo}>
          <Text style={styles.role}> {distancia()} km</Text>
        </View>
      )}
      
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
   
    backgroundColor:"white",
    padding:12,
    borderRadius:20,
    //borderWidth:0.5
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: 'gray',
  },
  distanceInfo: {
    justifyContent:"flex-end",
    marginRight:10
  },
});

export default UserListItem;