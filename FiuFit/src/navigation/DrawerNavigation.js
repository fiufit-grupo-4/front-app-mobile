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

const Drawer = createDrawerNavigator();

function DrawerComponent() {
    const [userInfo,setUserInfo] = useState({})
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
    }, [])



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
                name="         Home"
                color="#F0A500"
                component={HomeScreen}
                options={() => ({
                    drawerIcon: () => (
                        <Ionicons name="md-barbell-outline"
                            style={{color:'#2C302E'}}
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
                            style={{color:'#2C302E'}}
                        />
                    ),
                    headerShown: true,
                })}/>

            {/* 
            <Drawer.Screen
                name="         Settings"
                color="#F0A500"
                component={MenuProfileScreen}
                options={() => ({
                    drawerIcon: () => (
                        <AntDesign
                            name="setting"
                        />
                    ),
                    headerShown: true,
                })}
            />*/} 


        <Drawer.Screen
            name="         Favorites"
            color="#F0A500"
            component={FavoriteTrainingScreen}
            options={() => ({
                drawerIcon: () => (
                    <AntDesign
                        name="staro"
                    />
                ),
                headerShown: true,
            })}
        />

        { userInfo.role != ATHLETE &&(
            <>
                <Drawer.Screen
                name="         New Post"
                color="#F0A500"
                component={CreateTraining}
                options={() => ({
                    drawerIcon: () => (
                        <AntDesign
                            name="plus"
                        />
                    ),
                    headerShown: true,
                })}
                />

                <Drawer.Screen
                    name="         Verify"
                    color="#F0A500"
                    component={CertifyScreen}
                    options={() => ({
                        drawerIcon: () => (
                            <AntDesign
                                name="checkcircleo"
                            />
                            
                        ),
                        headerShown: true,
                    })}
                />    
            </>
        )}

        
        


    </Drawer.Navigator>
    );
}



export default DrawerComponent;
