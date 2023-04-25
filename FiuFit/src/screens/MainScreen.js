import React, {useEffect, useState} from 'react';
import {Text,StyleSheet} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileScreen from "./profile/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {HomeTab} from "./HomeTab";
import {SearchScreen} from "./Search/SearchScreen";
import {AntDesign} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveBackgroundColor: "whitesmoke" }}>

            <Tab.Screen
                name="Home"
                component={HomeTab}
                options={{
                    tabBarLabelStyle: { color: 'transparent' },
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign
                            name="home"
                            color={focused ? '#91AED4' : 'grey'}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Search" component={SearchScreen}
                options={{
                    //tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? "#91AED4" : "grey" }}>Search</Text>),
                    tabBarLabelStyle: { color: 'transparent' },
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign
                            name="search1"
                            color={focused ? '#91AED4' : 'grey'}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile" component={ProfileScreen}
                options={{
                   //tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? "#91AED4" : "grey" }}>Profile</Text>),
                    tabBarLabelStyle: { color: 'transparent' },
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign
                            name="user"
                            color={focused ? '#91AED4' : 'grey'}
                            size={size}
                        />
                    )
                }}
            />

        </Tab.Navigator>
    );
};

export default MainScreen;