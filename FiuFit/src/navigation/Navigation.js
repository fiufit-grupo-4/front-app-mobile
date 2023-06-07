import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeTab} from "../screens/home/HomeTab";
import DrawerComponent from "./DrawerNavigation";
import SignUpScreen from '../screens/login/SignUpScreen';
import SignInScreen from '../screens/login/SignInScreen';
import TrainingScreen from '../screens/training/TrainingScreen';
import NewPasswordScreen from '../screens/login/NewPasswordScreen';
import ConfirmCodeScreen from '../screens/login/ConfirmCodeScreen';
import ConfirmPhoneScreen from '../screens/login/ConfirmPhoneScreen';
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import MenuProfileScreen from '../screens/profile/MenuProfileScreen';
import EditTrainingScreen from "../screens/training/EditTrainingScreen";
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangePasswordScreen from "../screens/profile/ChangePasswordScreen";
import UserProfile from '../screens/search/UserProfile';
import TrainingProfile from '../screens/search/TrainingProfile';
import ViewTrainings from "../screens/training/ViewTrainings";
import Prueba from "../screens/login/Prueba";
import FavoriteTrainingScreen from "../screens/training/FavoriteTrainingScreen";
import FavoriteTrainingProfile from '../screens/search/FavoriteTrainingProfile';
import ViewGoal from "../screens/Goal/ViewGoal";
import GoalProfile from "../screens/Goal/GoalProfile";


const Stack = createNativeStackNavigator();

class Navigation extends React.Component {


    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {/*<Stack.Screen name="Prueba" component={Prueba} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
                    
                    <Stack.Screen name="ConfirmPhone" component={ConfirmPhoneScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }}/>
                
                    <Stack.Screen name="Inicio" component={DrawerComponent}  options={{ headerShown: false }}/>
                    <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }}/>
                    <Stack.Screen name="Profile" component={MenuProfileScreen} />
                    <Stack.Screen name="Edit Profile" component={EditProfileScreen}  />
                    <Stack.Screen name="Change Password" component={ChangePasswordScreen}  />
                    <Stack.Screen name="User Profile" component={UserProfile}  />
                    <Stack.Screen name="Edit Training" component={EditTrainingScreen}  />
                    <Stack.Screen name="Training" component={TrainingScreen}  />
                    <Stack.Screen name="Training Profile" component={TrainingProfile}  />
                    <Stack.Screen name="Favorite Profile" component={FavoriteTrainingProfile}  />
                    <Stack.Screen name="Trainings" component={ViewTrainings}  />

                    <Stack.Screen name="ViewGoal" component={ViewGoal}  />
                    <Stack.Screen name="Goal Profile" component={GoalProfile}  />

                    <Stack.Screen name="FavoriteTraining" component={FavoriteTrainingScreen}  />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}



export default Navigation;

