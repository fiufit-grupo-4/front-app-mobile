import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import {useNavigation} from '@react-navigation/native';


const ProfileButton = () => {
    const navigation = useNavigation();

    const handleProfilePress = () => {
      navigation.navigate('Profile');
    };
  
    return (
    <TouchableOpacity style={styles.profileIconContainer} onPress={handleProfilePress}>
        {/* <Image style={styles.profileIcon} source={require('ruta/a/tu/imagen/profile.png')} /> */}
        <Ionicons name= "person-outline" size={15} color="black"/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    profileIconContainer: {
        borderRadius: 20,
        borderColor:"black",
        borderWidth:1.5,
        backgroundColor: 'powderblue',
        padding:9,
      },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

export default ProfileButton;