import React from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from 'react-native-vector-icons'
import Logo from '../components/utils/Logo';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileScreen from "./profile/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {HomeTab} from "./HomeTab";
import {SearchScreen} from "./Search/SearchScreen";


const Tab = createBottomTabNavigator();


const HomeScreen = () => {
  const navigation = useNavigation();

  return (
        <Tab.Navigator  screenOptions={{ headerShown: false , tabBarActiveBackgroundColor: "whitesmoke" }}>
          <Tab.Screen
              name="Home" component={HomeTab}
              options={{
                  tabBarLabel:({ focused,color })=>(<Text style={{color:focused?"#91AED4":"grey"}}>Home</Text>),
                  tabBarIcon: () => (
                    <MaterialCommunityIcons name="home" color='#91AED4' size={26} />
                ),
              }}
              />

            <Tab.Screen
                name="Search" component={SearchScreen}
                options={{
                    tabBarLabel:({ focused,color })=>(<Text style={{color:focused?"#91AED4":"grey"}}>Search</Text>),
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="magnify" color="#91AED4" size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel:({ focused,color })=>(<Text style={{color:focused?"#91AED4":"grey"}}>Profile</Text>),
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account-circle" color="#91AED4" size={26} />
                    ),
                }}
            />

        </Tab.Navigator>


  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
    backgroundColor:"lightsteelblue",
    justifyContent: "center",
    borderWidth:0
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    margin: 10,
    marginBottom:20
  },
});

export default HomeScreen;
