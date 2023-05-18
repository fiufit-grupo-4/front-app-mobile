import React,{useState,useEffect} from 'react';
import {ScrollView,View, Image, Text, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import { ADMIN, ATHLETE, TRAINER } from '../../utils/constants';

const UserProfile = ({ route }) => {
  const {user} = route.params
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  const renderTableRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.value}</Text>
    </View>
  );

  function getRole(role){
    if (role == ADMIN){
        return "Admin"
    } else if (role == TRAINER){
        return "Trainer"
    } else if (role == ATHLETE){
        return "Athlete"
    } else {
        return "Undefined"
    }
   }

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
            <Text style={styles.name}>{user.name + " " +user.lastname}</Text>
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
      <View style={styles.followersContainer}>
        <Text style={styles.followersCount}>Followers: 100</Text>
        <Text style={styles.followingCount}>Following: 50</Text>
      </View>
      <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Phone: {user.phone_number}</Text>
            </View>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Email: {user.mail}</Text>
            </View>
        </View>

        
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#91AED4",
    
  },
  header: {
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom:10
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
    backgroundColor: '#788FAD',
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
    backgroundColor: '#788FAD',
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
    flex: 1,
    
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#788FAD',
    paddingVertical: 10,
    borderTopWidth:1,
    borderBottomWidth:1,
    marginTop:5,
    marginBottom:5
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    paddingLeft:10
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

/*
import React from 'react';
import { View, Text, FlatList } from 'react-native';

const UserProfile = () => {
  // Datos de la tabla
  const tableData = [
    { id: 1, name: 'Row 1', value: 10 },
    { id: 2, name: 'Row 2', value: 20 },
    { id: 3, name: 'Row 3', value: 30 },
  ];

  // Renderización de cada fila de la tabla
  const renderTableRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Name</Text>
          <Text style={styles.tableHeaderCell}>Value</Text>
        </View>
        <FlatList
          data={tableData}
          renderItem={renderTableRow}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

// Estilos
const styles = {
  // Resto de tus estilos

 
};

export default UserProfile;
*/

