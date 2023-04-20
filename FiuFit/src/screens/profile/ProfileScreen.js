import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/buttons/CustomButton';

const ProfileScreen = ({ navigation }) => {
  const data = [
    { id: 1, image: require('../../../assets/images/post1.png') },
    { id: 2, image: require('../../../assets/images/post2.png') },
    { id: 3, image: require('../../../assets/images/post3.png') },
    //{ id: 4, image: require('./images/post4.png') },
    //{ id: 5, image: require('./images/post5.png') },
  ];

  return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <Image source={require('../../../assets/images/profilepic.jpeg') } style={{ width: 75, height: 75, borderRadius: 37.5 }} />
          <Text style={{ marginLeft: 10, fontSize: 20 }}>Your Name</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={{ marginLeft: 'auto' }}>
            <Text style={{ fontSize: 18, color: 'blue' }}>Settings</Text>
          </TouchableOpacity>
        </View>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Image source={item.image} style={{ width: '100%', height: 300, marginBottom: 10 }} />}
        />
      </View>
  );
};

export default ProfileScreen;


/*
const ProfileScreen = () => {
  const [username, setUsername] = useState('Sofia');
  const [bio, setBio] = useState('Locura Mix');
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { username, bio });
  };

  return (
    <View style= {styles.container}>
      <Text style= {styles.title}> {username} </Text>
      <Text>{bio}</Text>

      <CustomButton
        text={"Edit Profile"}
        onPress={handleEditProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
    backgroundColor:"white",
    justifyContent: "center",
    borderWidth:0
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    margin: 10,
    marginBottom:20
  },
});
*/
