import {FlatList, SafeAreaView, View} from "react-native";
import FollowItem from "../../components/followers/FollowItem";
import React from "react";

const NewFollowList = ({followers,myId}) => {

    function getFollowers() {
        //let filteredFollowers = []
        return followers.filter((user) => {
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

export default NewFollowList;