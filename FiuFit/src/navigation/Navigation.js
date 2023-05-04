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
import TrainingScreen from '../screens/training/TrainingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfileScreen from "../screens/profile/EditProfileScreen";


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
                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }}/>
                    <Stack.Screen name="MenuProfile" component={MenuProfileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="EditTrainingScreen" component={EditTrainingScreen}  />
                    <Stack.Screen name="Training" component={TrainingScreen}  />
                    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}  />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}



export default Navigation;

