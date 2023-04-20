import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/buttons/CustomButton';
import MenuButton from "../../components/buttons/ProfileButton";

const ProfileScreen = ({ navigation }) => {
  const data = [
    { id: 1, image: require('../../../assets/images/post1.png') },
    { id: 2, image: require('../../../assets/images/post2.png') },
    { id: 3, image: require('../../../assets/images/post3.png') },
  ];

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <Image source={require('../../../assets/images/profilepic.jpeg') } style={{ width: 75, height: 75, borderRadius: 37.5 }} />
          <Text style={{ marginLeft: 10, fontSize: 20 }}>PEPITO BOXEADOR</Text>
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
