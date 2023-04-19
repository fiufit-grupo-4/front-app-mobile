import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/login/SignInScreen';
import SignUpScreen from '../screens/login/SignUpScreen';
import ConfirmCodeScreen from '../screens/login/ConfirmCodeScreen';
import ConfirmEmailScreen from '../screens/login/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/login/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


class Navigation extends React.Component {
  render() {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="FiuFit" component={HomeScreen} options={
              { headerShown : true,
                headerStyle: {
                  backgroundColor: 'skyblue',
                  height: 70,
                },
                headerTitleStyle: {
                  textAlign: 'center',
                  color:"black",
                  fontWeight:"bold"
                },
                headerLeft:() => (
                  <Image style={{ width: 30, height: 30, margin:10 }} source={require('../../assets/fiufiticon.png')} />
                ),
                headerRight:() => (
                    // TODO: SI HAY FOTO DE PERFIL PONER FOTO SINO PONER UN ICONO DE SILUETA
                    <MaterialCommunityIcons name="account" size={26} />
                ),
              }
            }/>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </Stack.Navigator>
      </NavigationContainer>
      )
  }
}


export default Navigation;
