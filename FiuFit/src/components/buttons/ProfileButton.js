import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MenuButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: 1, right: 1 }}>
            <MaterialCommunityIcons name="menu" size={20}  color = '#2C3137' style={{ width: 20, height: 40}}  />
        </TouchableOpacity>
    );
};

export default MenuButton;
