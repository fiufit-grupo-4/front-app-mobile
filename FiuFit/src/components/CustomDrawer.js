import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle= {{backgroundColor: '#fffff'}}>
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={{padding:40}}>
                <Image
                    source={require('../../assets/images/profilepic.jpeg')}
                    style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
                />
                <Text style={{ color: 'black', fontSize: 18 }}>Pepito Boxeador</Text>
                <Text style={{ color: 'black', fontSize: 13 }}>32 Seguidores</Text>
                </ImageBackground>
                <View style= {{flex:1, backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props}/>
                </View>
                </DrawerContentScrollView>
            <View>
        </View>
        </View>
    );
}

export default CustomDrawer;