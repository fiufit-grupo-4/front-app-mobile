import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Training from "../../components/trainings/Training";
import CustomButton from '../../components/buttons/CustomButton';

const TrainingListItem = ({ item, user }) => {
  const navigation = useNavigation();
  
  function handleOnPress() {
    navigation.navigate("Training Profile", {item:item, user:user})
  }
  return (
    
    <View style={styles.container}>
        <TouchableOpacity onPress={handleOnPress}>
            <Training item={item} user={user} canEdit={false} />
        </TouchableOpacity>   
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
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

export default TrainingListItem;