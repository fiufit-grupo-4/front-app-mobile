import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import {Controller} from 'react-hook-form';

const CustomInput = ({control,name, placeholder, secureTextEntry,icon,rules={}, otherError}) => {

  return (
      <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value },fieldState: {error} }) => (
            <>
              <View 
                style={[
                  styles.container, 
                  {borderColor: error || otherError ? "crimson":"powderblue"},
                  {borderWidth: error || otherError ? 1.5:0}
                ]}
              >
                <Ionicons name={icon} style= {
                  [styles.icon,{color: error || otherError ? "crimson":"#222831"} ]
                } size ={25}/>
                <TextInput
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={[
                    styles.input, 

                  ]}
                  secureTextEntry={secureTextEntry}
                />
              </View>
              { error && (
                <Text style = {{fontSize:14,color : "crimson",padding:5}}> {error.message}</Text>
              )
              }
            </>   
          )}

          name={name}
        />  
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AFC5E3',
    width: '80%',
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
    paddingHorizontal: 5,
    height: 20,
    borderRadius: 15,
    flex:1,
  },
  icon: {
    paddingHorizontal: 5,
    color: "#222831",
    alignItems:"center",
  },
});

export default CustomInput;
