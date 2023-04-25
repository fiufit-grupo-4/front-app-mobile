import React from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/login/SignInScreen';
import SignUpScreen from '../screens/login/SignUpScreen';
import ConfirmCodeScreen from '../screens/login/ConfirmCodeScreen';
import ConfirmEmailScreen from '../screens/login/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/login/NewPasswordScreen';
import HomeScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MenuProfileScreen from '../screens/profile/MenuProfileScreen';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import CustomDrawer from  "../components/CustomDrawer"
import {AntDesign} from "@expo/vector-icons";
import drawerItem from "react-native-paper/src/components/Drawer/DrawerItem";
import SearchScreen from "../screens/Search/SearchScreen";


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function DrawerComponent() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {... props} />}

            screenOptions={{
                headerStyle: {
                    backgroundColor: '#91AED4'
                },
                headerShown: false,
                headerTitle: " ",
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: 'lightsteelblue',
                drawerInactiveTintColor: 'grey',
                drawerLabelStyle:{
                    marginLeft: -25,
                    fontSize: 15
                },
                headerTitleStyle: {
                    textAlign: "center",
                    color: "#2C3137",
                    fontWeight: "bold",
                },
                headerRight: () => (
                    <Image
                        style={{ width: 50, height: 50, margin: 12 }}
                        source={require("../../assets/images/logo-fiufit.png")}
                    />
                )}
            }>


            <Drawer.Screen
                name="Home"
                color="#F0A500"
                component={HomeScreen}
                options={({ navigation }) => ({
                    drawerIcon: () => (
                        <AntDesign name="home"

                        />
                    ),
                    headerShown: true,
                })}/>

            <Drawer.Screen
                name="Settings"
                color="#F0A500"
                component={MenuProfileScreen}
                options={({ navigation }) => ({
                    drawerIcon: () => (
                        <AntDesign
                            name="setting"
                        />
                    ),
                    headerShown: true,
                })}
            />

            <Drawer.Screen
                name="Log Out"
                color="#F0A500"
                component={SignInScreen}
                options={({ navigation }) => ({
                    drawerIcon: () => (
                        <AntDesign
                            name="logout"
                        />
                    ),
                    headerShown: false})}
            />
        </Drawer.Navigator>
    );
}




class Navigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Inicio"
                        component={DrawerComponent}
                        options={{ headerShown: false }}
                    />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="MenuProfile" component={MenuProfileScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}



export default Navigation;

