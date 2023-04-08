import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',

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

export default CustomButton;
