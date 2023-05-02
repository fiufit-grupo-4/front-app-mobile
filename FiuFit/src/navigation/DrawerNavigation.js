import CustomDrawer from "../components/utils/CustomDrawer";
import {Image} from "react-native";
import HomeScreen from "../screens/MainScreen";
import {AntDesign} from "@expo/vector-icons";
import MenuProfileScreen from "../screens/profile/MenuProfileScreen";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CreateTraining from "../screens/training/CreateTraining";
import UploadImage from "../screens/training/UploadImage";
import CreateTrainingScreen from "../screens/training/CreateTrainingScreen";

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
                        <AntDesign name="home"

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


    </Drawer.Navigator>
    );
}



export default DrawerComponent;
