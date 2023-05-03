import React from 'react';
import {View, Text, StyleSheet, Pressable,TouchableOpacity} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'

const CustomIconButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor,icon,iconColor,containerWidth}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
        containerWidth ? {width:containerWidth} : {width:"80%"}
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
        <Ionicons name={icon} size={15} color={iconColor} />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 15,
  },

  container_PRIMARY: {
    backgroundColor: 'black',
  },

  container_SECONDARY: {
    backgroundColor: 'white',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontSize:15,
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: 'black',
  },

  text_TERTIARY: {
    color: 'black',
  },
});

export default CustomIconButton;