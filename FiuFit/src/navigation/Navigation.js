import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from 'react-native-vector-icons'
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/login/SignInScreen';
import SignUpScreen from '../screens/login/SignUpScreen';
import ConfirmCodeScreen from '../screens/login/ConfirmCodeScreen';
import ConfirmEmailScreen from '../screens/login/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/login/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MenuProfileScreen from '../screens/profile/MenuProfileScreen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MenuButton from "../components/buttons/ProfileButton";
import {DefaultTheme} from "react-native-paper";


const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

class Navigation extends React.Component {

  render() {
      return (
        <NavigationContainer >
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="FiuFit" color='#2C3137' component={HomeScreen} options={({navigation}) =>
              {return { headerShown : true,
                headerStyle: {
                  backgroundColor: 'lightsteelblue',
                  height: 60,
                },
                headerTitleStyle: {
                  textAlign: 'center',
                  color:"#2C3137",
                  fontWeight:"bold"
                },
                headerLeft:() => (
                  <Image style={{ width: 30, height: 30, margin:10 }} source={require('../../assets/fiufiticon.png')} />
                ),
                headerRight:() => (
                    <View style={{ flex: 1}}>
                      <MenuButton onPress={() => navigation.navigate("MenuProfile")} />
                    </View>

                ),
              }}
            }/>
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
      )
  }
}


export default Navigation;
