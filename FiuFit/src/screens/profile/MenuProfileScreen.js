import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';


const MenuProfileScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
      <View style={styles.container}>
        {/* Button to open/close slide bar */}
        <TouchableOpacity onPress={toggleDrawer} style={styles.button}>
          <Ionicons name="md-menu" size={32} color="white" />
        </TouchableOpacity>

        {/* Slide bar */}
        <Animated.View syle={[styles.drawer, { transform: [{ translateX: isOpen ? 0 : -300 }] }]}>
          {/* Edit profile button */}
          <TouchableOpacity style={styles.drawerItem}>
            <Ionicons name="md-person" size={32} color="black" />
            <Text style={styles.drawerItemText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Log out button */}
          <TouchableOpacity style={styles.drawerItem}>
            <Ionicons name="md-log-out" size={32} color="black" />
            <Text style={styles.drawerItemText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  drawerItemText: {
    marginLeft: 10,
    fontSize: 20,
  },
});


/*import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

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
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
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
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#4caf50',
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
*/