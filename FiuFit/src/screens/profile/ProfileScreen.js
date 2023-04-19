import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/buttons/CustomButton';

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
    backgroundColor:"orange",
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

export default ProfileScreen;