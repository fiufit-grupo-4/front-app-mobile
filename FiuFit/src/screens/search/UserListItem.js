import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const UserListItem = ({ user }) => {
  const navigation = useNavigation();
  function handleOnPress() {
    navigation.navigate("User Profile", {user:user})
  }
  return (
    <TouchableOpacity onPress={handleOnPress}>
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* <Image source={{ uri: user.image }} style={styles.avatar} />*/}
        <Image source={ require('../../../assets/images/profilepic.jpeg') } style={styles.avatar} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name + " " + user.lastname}</Text>
        <Text style={styles.role}>{user.mail}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
});

export default UserListItem;