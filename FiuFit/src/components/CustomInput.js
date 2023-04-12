import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
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
    width: '80%',
    
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    alignContent:"center",
    paddingHorizontal: 15,
    marginVertical: 5,
    textDecorationColor:"black"
  },
});

export default CustomInput;
