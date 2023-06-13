import React,{useState,useEffect} from 'react'
import {View, Text, Image, ImageBackground, Alert, ToastAndroid} from 'react-native'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import {StatusBar} from "expo-status-bar";
import {AntDesign} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from '../../utils/constants';
import { getRole } from '../../utils/getters';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
    const navigation = useNavigation();

    const handleTouchableOpacity = () => {
        setReload(reload + 1)
        navigation.navigate("Profile",{reload : false})
    };

    const [userInfo,setUserInfo] = useState({})
    const [reload,setReload] = useState(0)
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
    }, [reload])

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
                        style={{padding: 50, flex:1,alignItems:"center"}}
                        >

                        <TouchableOpacity onPress={handleTouchableOpacity }>
                            <View style={styles.header}>
                                
                                
                                <View style={styles.profileInfo}>
                                { userInfo.image  
                                    ? <Image source={{uri:userInfo.image}} 
                                        style={{height: 60,width: 60,borderRadius: 30,marginBottom: 10,}}/>
                                    : <Image source={require('../../../assets/images/profilepic.jpeg')}
                                        style={{height: 60,width: 60,borderRadius: 30,marginBottom: 10,}}/>
                                }  
                            <View style={styles.nameContainer}>
                                <Text style={styles.name}>{userInfo.name + " " +userInfo.lastname + " "} 
                
                                { userInfo.verification?.verified && (
                                    <Ionicons name={"checkmark-done-outline"} size={20} color={"lightskyblue"} />
                                )
                                }
                                </Text>
                                <Text style={styles.role}>{getRole(userInfo.role)}</Text>
                            </View>
                        </View>
                            
                            </View>                        
                        </TouchableOpacity>

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



const styles = {
    
    header: {
      marginTop:5,
      //flexDirection: 'row',
      //alignItems: 'center',
      width:"120%",
    },

    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding:0
    },

    nameContainer: {
      marginLeft: 10,
      //alignItems:"center"
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    role: {
      fontSize: 16,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

  };