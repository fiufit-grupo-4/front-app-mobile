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
import MenuButton from "../components/buttons/ProfileButton";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from  "../components/CustomDrawer"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {AntDesign} from "@expo/vector-icons";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Menu() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {... props} />}
            drawerContentContainerStyle={{
                flex: 9,
                justifyContent: 'space-between',
                paddingBottom: 20,
            }}
        >
            <Drawer.Screen
                name="Home"
                color="#F0A500"
                component={HomeScreen}
                options={({ navigation }) => ({
                    drawerIcon: () => (
                        <AntDesign
                            name="home"

                        />
                    ),
                    headerShown: true,
                })}
            />

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
                    headerShown: true,
                })}
            />
        </Drawer.Navigator>
    );
}


class Navigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                 <Stack.Navigator screenOptions={{ headerShown: false }}>
                         <Stack.Screen
                        name="FiuFit"
                        color="#F0A500"
                        component={Menu}
                        options={({ navigation }) => ({
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: "lightsteelblue",
                                height: 60,
                            },
                            headerTitleStyle: {
                                textAlign: "center",
                                color: "#2C3137",
                                fontWeight: "bold",
                            },
                            headerLeft: () => (
                                <Image
                                    style={{ width: 30, height: 30, margin: 10 }}
                                    source={require("../../assets/images/logo-fiufit.png")}
                                />
                            ),

                        })}
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

