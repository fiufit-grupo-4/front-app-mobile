import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeTab} from "../screens/home/HomeTab";
import DrawerComponent from "./DrawerNavigation";
import SignUpScreen from '../screens/login/SignUpScreen';
import SignInScreen from '../screens/login/SignInScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ConfirmCodeScreen from '../screens/login/ConfirmCodeScreen';
import NewPasswordScreen from '../screens/login/NewPasswordScreen';
import ConfirmEmailScreen from '../screens/login/ConfirmEmailScreen';
import MenuProfileScreen from '../screens/profile/MenuProfileScreen';
import EditTrainingScreen from "../screens/training/EditTrainingScreen";
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
                    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                    <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }}/>
                    <Stack.Screen name="MenuProfile" component={MenuProfileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="EditTrainingScreen" component={EditTrainingScreen}  />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}



export default Navigation;

