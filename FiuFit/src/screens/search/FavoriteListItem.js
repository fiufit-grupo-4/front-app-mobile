import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FavoriteListItem = ({ favorite }) => {
  const navigation = useNavigation();
  
  function handlePressItem(id) {
    navigation.navigate("Favorite Profile", {id:id})
  }

  const renderStars = (dificultad) => {
    const maxStars = 5;
    const filledStars = Math.min(dificultad, maxStars);

    return Array(maxStars)
      .fill()
      .map((_, index) => (
        <Icon
          key={index}
          name={index < filledStars ? 'star' : 'star-outline'}
          size={18}
          color="#FDB813"
        />
      ));
  };

  return (
    
    <View style={styles.container}>
        <TouchableOpacity onPress={() => {handlePressItem(favorite.id_training)}}>
            <View key = {favorite.id_training} style={newstyles.container}>                         
                    <View style={newstyles.header}>
                        <Text style={newstyles.titulo}>{favorite.title}</Text>
                        <Text style={newstyles.dificultad}>{renderStars(parseInt(favorite.difficulty))}</Text>
                    </View>
                    <Text style={newstyles.tipo}>{favorite.type}</Text>
                    <Text style={newstyles.descripcion}>{"Description: " + favorite.description}</Text>                         
            </View>
        </TouchableOpacity>            
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  
});



const newstyles = {
    container: {
      backgroundColor: '#ffffff',
      padding: 15,
      marginBottom: 10,
      borderRadius:10,
      
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    dificultad: {
      flexDirection: 'row',
    },
    tipo: {
      marginTop: 5,
      fontSize: 16,
      color:"gray"
    },
    descripcion: {
      marginTop: 10,
      fontSize: 14,
    },
  };
  


export default FavoriteListItem;