import React from 'react';
import {View,Text, TextInput, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'

const CustomPassword = ({value, setValue, placeholder, passwordVisibility,handlePasswordVisibility,rightIcon}) => {
  return (
      <View style={styles.inputContainer}>
        <TouchableWithoutFeedback onPress={handlePasswordVisibility}>
          <Ionicons name={rightIcon} style= {styles.icon} size ={25}/>
        </TouchableWithoutFeedback>

        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          secureTextEntry={passwordVisibility}
          value={value}
          enablesReturnKeyAutomatically
          onChangeText={setValue}
          
        />
        
      </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'powderblue',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height:45,
    padding:5,
    margin:5,
  },
  inputField: {
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
    alignItems:"center",
    color: "#222831",
  },
});

export default CustomPassword;
