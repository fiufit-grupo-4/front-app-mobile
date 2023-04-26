import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {Ionicons} from "react-native-vector-icons";

const DescriptionInput = ({control,name, placeholder, secureTextEntry,icon,rules={}, otherError}) => {

    return (
        <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value },fieldState: {error} }) => (
                <>
                    <View
                        style={[
                            styles.container,
                            {borderColor: error || otherError ? "sandybrown":"sandybrown"},
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
        backgroundColor: '#DEE9F8',
        marginTop:1,
        width: '97%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        height:45,
        padding:5,
        margin:5,
        zIndex:0,
        elevation:0
    },

    input: {
        fontSize: 15,
        width: '100%',
        backgroundColor: '#DEE9F8',
        paddingHorizontal: 5,
        height: 20,
        borderRadius: 15,
        flex:1,
        zIndex:0,
        elevation:0
    },
    icon: {
        paddingHorizontal: 5,
        color: "#222831",
        alignItems:"center",
        fontSize: 13
    },
});

export default DescriptionInput;
