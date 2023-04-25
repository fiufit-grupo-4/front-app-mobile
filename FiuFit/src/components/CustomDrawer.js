import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import { TouchableOpacity } from 'react-native';
import navigation from "../navigation/Navigation";
import ProfileScreen from "../screens/profile/ProfileScreen";



const handleTouchableOpacity = () => {
    navigation.navigate(ProfileScreen)
};



const CustomDrawer = (props) => {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{backgroundColor: '#fffff'}}>
                <TouchableOpacity
                    onPress={() => {
                       //handleTouchableOpacity()
                        //TODO: QUE VAYA AL PERFIL
                    }}>
                    <ImageBackground
                        source={require('../../assets/images/background.png')}
                        style={{padding: 40, marginBottom: 10, elevation: 100}}>
                        <Image
                            source={require('../../assets/images/profilepic.jpeg')}
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                                marginBottom: 10,
                            }}
                        />
                        <Text style={{color: 'black', fontSize: 20}}>Pepito Boxeador</Text>
                        <Text style={{color: 'black', fontSize: 13}}>32 Seguidores</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawer;