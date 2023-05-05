import React from "react";
import {Image} from "react-native";
import HomeScreen from "./MainScreen";
import {AntDesign} from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from "../components/utils/CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuProfileScreen from "../screens/profile/MenuProfileScreen";
import CreateTrainingScreen from "../screens/training/CreateTrainingScreen";
import FavoriteTrainingScreen from "../screens/training/FavoriteTrainingScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import CertifyScreen from "../screens/certify/CertifyScreen";

const Drawer = createDrawerNavigator();

function DrawerComponent() {
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
            />


        <Drawer.Screen
            name="         New Post"
            color="#F0A500"
            component={CreateTrainingScreen}
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


    </Drawer.Navigator>
    );
}



export default DrawerComponent;
