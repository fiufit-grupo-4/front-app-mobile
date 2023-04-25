import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import { TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StatusBar} from "expo-status-bar";


const CustomDrawer = (props) => {
    const navigation = useNavigation();

    const handleTouchableOpacity = () => {
        navigation.navigate("Profile")
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
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawer;