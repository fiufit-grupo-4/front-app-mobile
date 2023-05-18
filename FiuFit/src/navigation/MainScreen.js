import React from 'react';
import {AntDesign} from "@expo/vector-icons";
import {HomeTab} from "../screens/home/HomeTab";
import {SearchScreen} from "../screens/search/SearchScreen";
import MenuProfileScreen from "../screens/profile/MenuProfileScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

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
                            size={22}
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
                            size={22}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile" component={MenuProfileScreen}
                options={{
                   //tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? "#91AED4" : "grey" }}>Profile</Text>),
                    tabBarLabelStyle: { color: 'transparent' },
                    tabBarIcon: ({ color, size, focused }) => (
                        <AntDesign
                            name="user"
                            color={focused ? '#91AED4' : 'grey'}
                            size={22}
                        />
                    )
                }}
            />

        </Tab.Navigator>
    );
};

export default MainScreen;