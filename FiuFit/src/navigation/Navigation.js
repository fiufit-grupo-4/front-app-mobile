import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeTab} from "../screens/home/HomeTab";
import DrawerComponent from "./DrawerNavigation";
import SignUpScreen from '../screens/login/SignUpScreen';
import SignInScreen from '../screens/login/SignInScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import TrainingScreen from '../screens/training/TrainingScreen';
import NewPasswordScreen from '../screens/login/NewPasswordScreen';
import ConfirmCodeScreen from '../screens/login/ConfirmCodeScreen';
import ConfirmEmailScreen from '../screens/login/ConfirmEmailScreen';
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import MenuProfileScreen from '../screens/profile/MenuProfileScreen';
import EditTrainingScreen from "../screens/training/EditTrainingScreen";
import CodeValidationScreen from "../screens/login/ValidateNumberScreen";
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangePasswordScreen from "../screens/profile/ChangePasswordScreen";


const Stack = createNativeStackNavigator();

class Navigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Inicio" component={DrawerComponent}  options={{ headerShown: false }}/>

                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="CodeValidation" component={CodeValidationScreen} options={{ headerShown: false }}/>
                    
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }}/>
                    
                    <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }}/>
                    <Stack.Screen name="Profile" component={MenuProfileScreen} />
                    <Stack.Screen name="Edit Profile" component={EditProfileScreen}  />
                    <Stack.Screen name="Change Password" component={ChangePasswordScreen}  />

                    <Stack.Screen name="EditTrainingScreen" component={EditTrainingScreen}  />
                    <Stack.Screen name="Training" component={TrainingScreen}  />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}



export default Navigation;

