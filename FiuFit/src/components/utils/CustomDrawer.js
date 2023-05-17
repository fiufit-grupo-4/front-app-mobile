import React,{useState,useEffect} from 'react'
import {View, Text, Image, ImageBackground, Alert, ToastAndroid} from 'react-native'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import {StatusBar} from "expo-status-bar";
import {AntDesign} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from '../../utils/constants';

const CustomDrawer = (props) => {
    const navigation = useNavigation();

    const handleTouchableOpacity = () => {
        navigation.navigate("Profile",{reload : false})
    };

    const [userInfo,setUserInfo] = useState({})
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        async function getUser() {
            AsyncStorage.getItem(USER).then( user => {
                console.log(user)
                setUserInfo(JSON.parse(user))          
            }
            ).catch(error => {
                setError(true)
                setErrorMessage(error)
            })
        }
        getUser();
    }, [])

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
                        AsyncStorage.removeItem(USER).then(() => {
                            ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT)
                            navigation.navigate("SignIn")
                        }).catch(() => {
                            navigation.navigate("SignIn")
                        }) 
                    
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

                        source={require('../../../assets/images/background.png')}
                        style={{padding: 50, flex:1}}
                        >

                        <TouchableOpacity
                            onPress={
                                handleTouchableOpacity
                            }>
                            <Image
                                source={require('../../../assets/images/profilepic.jpeg')}
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                    marginBottom: 10,
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                handleTouchableOpacity
                            }>
                        <Text style={{color: 'black', fontSize: 20}}>{userInfo.name + " " + userInfo.lastname}</Text>
                        </TouchableOpacity>

                        <Text style={{color: 'black', fontSize: 13}}>{userInfo.age} Seguidores</Text>
                    </ImageBackground>

                <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props} />
                    <DrawerItem label="Log Out" onPress={handleLogOut}
                                icon={({ focused, color, size }) => (
                                    <AntDesign name="logout" size={12} color={color} />)}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export default CustomDrawer;