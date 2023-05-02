import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/login/SignInScreen';
import SignUpScreen from '../screens/login/SignUpScreen';
import ConfirmCodeScreen from '../screens/login/ConfirmCodeScreen';
import ConfirmEmailScreen from '../screens/login/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/login/NewPasswordScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MenuProfileScreen from '../screens/profile/MenuProfileScreen';
import DrawerComponent from "./DrawerNavigation";
import {HomeTab} from "../screens/home/HomeTab";
import EditTraining from "../screens/training/EditTraining";

const Stack = createNativeStackNavigator();

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
                    <Stack.Screen name="Profile" component={ProfileScreen}  />
                    <Stack.Screen name="HomeTab" component={HomeTab}  />
                    <Stack.Screen name="MenuProfile" component={MenuProfileScreen} />
                    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                    <Stack.Screen name="EditTraining" component={EditTraining} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}



export default Navigation;

