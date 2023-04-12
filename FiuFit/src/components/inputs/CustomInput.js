import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'

const CustomInput = ({value, setValue, placeholder, secureTextEntry,icon}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} style= {styles.icon} size ={25}/>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'powderblue',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height:45,
    padding:5,
    margin:5,
  },

  input: {
    padding: 14,
    fontSize: 15,
    width: '90%',
    backgroundColor: 'powderblue',
    borderRadius: 15,
    paddingHorizontal: 5,
    height: 45,
    outlineStyle: 'none',
    placeholderTextColor:"#222831"
  },
  icon: {
    paddingHorizontal: 5,
    color: "#222831",
    alignItems:"center",
  },
});

export default CustomInput;
