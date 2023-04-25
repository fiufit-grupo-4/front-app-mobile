import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation} from "@react-navigation/native";
import EditProfileButton from "../../components/buttons/EditProfileButton";

const MenuProfileScreen = () => {
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [profileName, setProfileName] = useState('PEPITO BOXEADOR');
  const [profileEmail, setProfileEmail] = useState('pepe_campeor@yahoo.com');
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileEmail, setNewProfileEmail] = useState('');

  useEffect(() => {
    // Fetch user data from backend API and set state
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://example.com/userdata');
        const { profilePic, profileName, profileEmail } = response.data;
        setProfilePic(profilePic);
        setProfileName(profileName);
        setProfileEmail(profileEmail);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const navigation = useNavigation();

  const handleEditPress = () => {
    setIsEditing(true);
    setNewProfilePic(profilePic);
    setNewProfileName(profileName);
    setNewProfileEmail(profileEmail);
  };

  const handleCancelPress = () => {
    setIsEditing(false);
  };

  const handleSavePress = async () => {
    try {
      const response = await axios.put('https://example.com/userdata', {
        profilePic: newProfilePic,
        profileName: newProfileName,
        profileEmail: newProfileEmail,
      });
      const { profilePic, profileName, profileEmail } = response.data;
      setProfilePic(profilePic);
      setProfileName(profileName);
      setProfileEmail(profileEmail);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleEditPress}>
            <Image style={styles.profilePic} source={{ uri: profilePic }} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            {isEditing ? (
                <>
                  <TextInput
                      style={styles.editableField}
                      value={newProfileName}
                      onChangeText={setNewProfileName}
                      placeholder="Name"
                  />
                  <TextInput
                      style={styles.editableField}
                      value={newProfileEmail}
                      onChangeText={setNewProfileEmail}
                      placeholder="Email"
                  />
                </>
            ) : (
                <>
                  <Text style={styles.profileName}>{profileName}</Text>
                  <Text style={styles.profileEmail}>{profileEmail}</Text>
                </>
            )}
          </View>
        </View>
        {isEditing ? (
            <View style={styles.editButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
        ) : (
            <View>
              <EditProfileButton text="Edit Profile" onPress={() => {handleEditPress()}} />
            </View>
        )}
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  editableField: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingBottom: 5,
    width: '100%',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#91AED4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#91AED4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MenuProfileScreen;
