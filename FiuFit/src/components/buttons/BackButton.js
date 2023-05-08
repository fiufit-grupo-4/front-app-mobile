import React from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const BackButton = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9AC4F8",
                },
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}