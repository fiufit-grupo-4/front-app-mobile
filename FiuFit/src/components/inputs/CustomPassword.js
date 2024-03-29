import React from 'react';
import {View,TextInput, StyleSheet, TouchableWithoutFeedback,Text} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import {Controller} from 'react-hook-form';

const CustomPassword = ({control,name, placeholder, passwordVisibility,handlePasswordVisibility,rightIcon,rules= {},otherError,width}) => {
  return (
        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value },fieldState: {error} }) => (
            <>
            <View style={[
                  styles.container, 
                  {borderColor: error || otherError ? "crimson":"powderblue"},
                  {borderWidth: error || otherError ? 1.5:0},
                  {width: width ? width : '80%'}
              ]}>

              <TouchableWithoutFeedback onPress={handlePasswordVisibility}>
                  <Ionicons name={rightIcon} style= {[styles.icon,{color: error || otherError ? "crimson":"#222831"}]} size ={25}/>
              </TouchableWithoutFeedback>

              <TextInput
                style={styles.input}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={passwordVisibility}
                
              />
            </View>
            { error && (
              <Text style = {{fontSize:14,color : "crimson",padding:5}}> {error.message} </Text>
            )}
            
            </>
          )}
          name={name}
        />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AFC5E3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height:45,
    padding:5,
    margin:5,
  },
  input: {
    fontSize: 15,
    width: '100%',
    backgroundColor: '#AFC5E3',
    borderRadius: 15,
    paddingHorizontal: 5,
    height: 20,
    flex:1,
  },

  icon: {
    paddingHorizontal: 5,
    alignItems:"center",
    color: "#222831",
  },
});

export default CustomPassword;
