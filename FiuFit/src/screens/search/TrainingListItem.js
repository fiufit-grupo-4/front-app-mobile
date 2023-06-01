import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Training from "../../components/trainings/Training";
import CustomButton from '../../components/buttons/CustomButton';

const TrainingListItem = ({ item, user,canEdit }) => {
  const navigation = useNavigation();
  
  function handleOnPress() {
    navigation.navigate("Training Profile", {item:item, user:user})
  }
  return (
    
    <View style={styles.container}>
        <TouchableOpacity onPress={handleOnPress}>
            <Training item={item} user={user} canEdit={canEdit} />
        </TouchableOpacity>   
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default TrainingListItem;