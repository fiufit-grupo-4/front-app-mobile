import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const EditProfileScreen = ({ route}) => {
  const { username, bio } = route.params;
  const [newUsername, setNewUsername] = useState(username);
  const [newBio, setNewBio] = useState(bio);
  const navigation = useNavigation();
  
  const handleSaveChanges = () => {
    // Guarda los cambios en tu base de datos o servidor
    // ...

    // Actualiza la pantalla de perfil con la nueva información
    navigation.navigate('Profile', { username: newUsername, bio: newBio });
  };

  return (
    <View style= {styles.container} >
      <Text>Editar perfil</Text>
      <TextInput value={newUsername} onChangeText={setNewUsername} />
      <TextInput value={newBio} onChangeText={setNewBio} />
      <TouchableOpacity onPress={handleSaveChanges}>
        <Text>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
    backgroundColor:"powderblue",
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

export default EditProfileScreen;