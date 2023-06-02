import React, { useState,useEffect } from 'react';
import { FlatList,ActivityIndicator,View, SafeAreaView } from 'react-native';
import FollowItem from './FollowItem';

const FollowList = ({followers,allUsers,myId}) => {
    
    function getFollowers() {
        //let filteredFollowers = []
        return allUsers.filter((user) => {
          return followers.includes(user.id)
          /*
          allUsers.map( user => {

            if (followers.includes(user.id)){
                filteredFollowers.push(user)
            }
          })*/
      });
  }

  return (
    <SafeAreaView  >  
        <FlatList
                data={getFollowers()}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={<View/>}
                horizontal={true}
                renderItem={({ item }) => (
                    <FollowItem user= {item} myId= {myId}></FollowItem>
                )}
            />
       
    </SafeAreaView>
  );
};

export default FollowList
const styles = {
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop:10

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  filtersContainer:{
    backgroundColor: '#91AED4',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom:5,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft:5,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  difficultyInput: {
      flex: 1,
      width: 60,
      height: 30,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 5,
      marginLeft:10,
      marginRight: 10,
      
  },
  distanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:10
  },
  distanceInput: {
      flex: 1,
      height: 30,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 5,
      marginLeft:10,
      marginRight: 10,
  },
  textInput: {
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:5,
  }
};