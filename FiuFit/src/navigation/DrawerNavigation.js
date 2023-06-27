import React,{useState,useEffect} from "react";
import {Image} from "react-native";
import HomeScreen from "./MainScreen";
import {AntDesign} from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from "../components/utils/CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {SearchScreen} from "../screens/search/SearchScreen";
import FavoriteTrainingScreen from "../screens/training/FavoriteTrainingScreen";
import CertifyScreen from "../screens/certify/CertifyScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ATHLETE,TRAINER,USER} from '../utils/constants';
import CreateTraining from "../screens/training/CreateTraining";
import MessagesScreen from "../screens/Messages/MessagesScreen";
import FollowersScreen from "../screens/Followers/FollowersScreen";
import CreateGoal from "../screens/Goal/CreateGoal";

import NotificationScreen from "../screens/Notificaciones/NotificationScreen";

import GoalsScreen from "../screens/Goal/GoalsScreen";
import TrainingsHome from "../screens/training/TrainingsHome";
import { useIsFocused } from "@react-navigation/native";
import Progress from "../screens/progress/Progress";
import InterestHome from "../screens/profile/InterestHome";


const Drawer = createDrawerNavigator();

function DrawerComponent() {
    const [userInfo,setUserInfo] = useState({})
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const isFocused = useIsFocused();
    useEffect(() => {
        async function getUser() {
          
            AsyncStorage.getItem(USER).then( user => {

                setUserInfo(JSON.parse(user))          
            }
            ).catch(error => {
                setError(true)
                setErrorMessage(error)
            })
        }
        getUser();
    }, [isFocused])


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
                        source={require("../../assets/images/fiticon.png")}
                    />
                )}
            }>


            <Drawer.Screen
                name="        Home"
                color="#F0A500"
                component={HomeScreen}
                options={() => ({
                    drawerIcon: () => (
                        <Ionicons name="barbell-outline"
                            style={{color:'#2C302E'}}
                            size={14}
                        />
                    ),
                    headerShown: true,
                })}/>

            <Drawer.Screen
                name="        Search"
                color="#F0A500"
                component={SearchScreen}
                options={() => ({
                    drawerIcon: () => (
                        <AntDesign
                            name="search1"
                            size={14}
                        />
                    ),
                    headerShown: true,
                })}/>


        <Drawer.Screen
            name="        Favorites"
            color="#F0A500"
            component={FavoriteTrainingScreen}
            options={() => ({
                drawerIcon: () => (
                    <AntDesign
                        name="staro"
                        size={14}
                    />
                ),
                headerShown: true,
            })}
        />

 

        { userInfo.role != TRAINER &&(
            <>

                <Drawer.Screen
                    name="        Progress"
                    color="#F0A500"
                    component={Progress}
                    options={() => ({
                        drawerIcon: () => (
                            <Ionicons name="fitness-outline"
                                style={{color:'#2C302E'}}
                                size={14}
                            />
                        ),
                        headerShown: true,
                    })}
                />
                <Drawer.Screen
                name="        Goals"
                color="#F0A500"
                component={GoalsScreen}
                options={() => ({
                    drawerIcon: () => (
                        <Ionicons name="ribbon-outline"
                            style={{color:'#2C302E'}}
                            size={14}
                        />
                    ),
                    headerShown: true,
                })}
                />

                <Drawer.Screen
                    name="        New Goal"
                    color="#F0A500"
                    component={CreateGoal}
                    options={() => ({
                        drawerIcon: () => (
                            <AntDesign
                                name="plus"
                                size={14}
                            />
                        ),
                        headerShown: true,
                    })}
                />
        </>
        )}


            

            

        { userInfo.role != ATHLETE &&(
            <>
            
            <Drawer.Screen
            name="        Trainings"
            color="#F0A500"
            component={TrainingsHome}
            options={() => ({
                drawerIcon: () => (
                    <Ionicons name="flash-outline"
                    size={14}
                    />
                ),
                headerShown: true,
            })}
            />

            <Drawer.Screen

                name="         Notifications"
                color="#F0A500"
                component={NotificationScreen}
                options={() => ({
                    drawerIcon: () => (
                        <AntDesign
                            name="bells"
                        />
                    ),
                    headerShown: true,
                })}
            />


            <Drawer.Screen
                name="         Messages"

            name="        New Post"
            color="#F0A500"
            component={CreateTraining}
            options={() => ({
                drawerIcon: () => (
                    <AntDesign
                        name="plus"
                        size={14}
                    />
                ),
                headerShown: true,
            })}
            />
            </>
        )}  

        <Drawer.Screen
            name="        Interests"
            color="#F0A500"
            component={InterestHome}
            initialParams={ {user: userInfo} }
            options={() => ({
                drawerIcon: () => (
                    <Ionicons name="basketball-outline"
                    size={14}
                    />
                ),
                headerShown: true,
            })}
        />


        <Drawer.Screen
            name="        Notifications"
            color="#F0A500"
            component={FollowersScreen}
            initialParams={ {user: userInfo} }
            options={() => ({
                drawerIcon: () => (
                    <Ionicons name="notifications-outline"
                    size={14}
                    />
                ),
                headerShown: true,
            })}
        />
    

        <Drawer.Screen
                name="        Messages"

                color="#F0A500"
                component={MessagesScreen}
                options={() => ({
                    drawerIcon: () => (
                        <Ionicons name="chatbubble-ellipses-outline"
                        size={14}
                        />
                    ),
                    headerShown: true,
                })}
            />


        { userInfo.role != ATHLETE &&(
            <Drawer.Screen
                name="        Verify"
                color="#F0A500"
                component={CertifyScreen}
                options={() => ({
                    drawerIcon: () => (
                        <AntDesign
                            name="checkcircleo"
                            size={14}
                        />
                        
                    ),
                    headerShown: true,
                })}
            />    
            
        )}


            

            



        </Drawer.Navigator>
    );
}



export default DrawerComponent;
