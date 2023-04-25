import React from 'react'
import {View, Text, Image, ImageBackground, Alert, ToastAndroid} from 'react-native'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {useNavigation} from '@react-navigation/native';import { TouchableOpacity } from 'react-native';
import {StatusBar} from "expo-status-bar";
import {AntDesign} from "@expo/vector-icons";


const CustomDrawer = (props) => {
    const navigation = useNavigation();

    const handleTouchableOpacity = () => {
        navigation.navigate("Profile")
    };

    const handleLogOut = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Log out cancelled'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('User logged out');
                        ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
                        navigation.navigate("SignIn")
                        // Add code to log the user out here
                    }
                }
            ]
        );
    };

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{backgroundColor: '#91AED4'}}>

                <StatusBar backgroundColor="#91AED4" />
                    <ImageBackground

                        source={require('../../assets/images/background.png')}
                        style={{padding: 50, flex:1}}
                        >

                        <TouchableOpacity
                            onPress={
                                handleTouchableOpacity
                            }>
                            <Image
                                source={require('../../assets/images/profilepic.jpeg')}
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                    marginBottom: 10,
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={{color: 'black', fontSize: 20}}>Pepito Boxeador</Text>
                        <Text style={{color: 'black', fontSize: 13}}>32 Seguidores</Text>
                    </ImageBackground>

                <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props} />
                    <DrawerItem label="Log Out" onPress={handleLogOut} />
                    {/*icon:{()=>{<AntDesign name="logout"/>}} />*/}
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawer;