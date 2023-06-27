import React, {useState,useEffect} from 'react';
import {View, Text, Switch,StyleSheet,Dimensions,Image,ScrollView,TouchableOpacity,ActivityIndicator,PermissionsAndroid} from 'react-native';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import {useNavigation} from '@react-navigation/native';
import FiuFitLogo from '../../../assets/images/fiticon.png';
import {  getPermissionsAndObserve,disconnectGoogleFit } from '../../utils/googleFit';


const {height} = Dimensions.get("window")

const GooglePermissions = ({ route }) => {
    const {user} = route.params

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
   
    const navigation = useNavigation();

   

    const onAssociatePressed = async () => {
        setError(false)
        let result = await getPermissionsAndObserve()
        if (result) {
            navigation.navigate("Inicio")
        } else {
            await disconnectGoogleFit()
            setError(true)
            setErrorMessage("You must associate with a Google Account")
        }
        
        
    };


    return (

        <View style={signUpStyles.root}>
            

            {loading
                ? <>
                    <Image
                        source={FiuFitLogo}
                        style={ {width: "80%", height: height * 0.2,marginTop:10}}
                        resizeMode="contain"
                    />
                    <View style={signUpStyles.containerLoad}>
                        <Text style={signUpStyles.textLoad} > Loading </Text>
                        <ActivityIndicator size="large" color = "black"/>
                        
                    </View>
                  </>
                : < View style = {signUpStyles.container}>
                    
                { user.picture != null && user.picture != "string" 
                  ? <Image
                        source={{uri:user.picture }}
                        style={ {width: 100,height:100,borderRadius:50,marginTop:80,marginBottom:10}}
                        resizeMode="contain"
                    />
                 :<Image
                        source={require('../../../assets/images/profilepic.jpeg')}
                        style={ {width: 100,height:100,borderRadius:50,marginTop:80,marginBottom:10}}
                        resizeMode="contain"
                    />
            
               }
                
                    
                        
                <Text style={[signUpStyles.title]}>Associate with Google</Text>

                <View style={{width:"90%",marginTop: 5,marginBottom:20, alignItems:"center"}}>
                    <Text style={{fontSize:16}}>To obtain all the benefits from FiuFit app you must associate your account with a Google account</Text>
                </View>
                
                    <CustomIconButton
                        text="Associate "
                        onPress={onAssociatePressed}
                        bgColor="crimson"
                        fgColor="white"
                        icon= "logo-google"
                        iconColor="white"
                        containerWidth="100%"
                    />
       
                    {error && (
                        <Text style = {{fontSize:16,color : "crimson",padding:5,marginTop:10}}> {errorMessage} </Text>
                    )}
           
                </View>
            }
        </View>

    );
};

export default GooglePermissions;


const signUpStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
       
       marginBottom:90,
        
        justifyContent:'center'
    },
    label: {
        fontSize: 15,
        fontWeight:"bold",
    },
    text: {
        fontSize: 15,
        marginRight:10,
        marginLeft:5
    },
    icon: {
        color: "#222831",
        alignItems:"center",
        paddingHorizontal:5
    },

    root : {
      flex:1,
      alignItems: 'center',
      padding: 10,
      backgroundColor:"white",
      justifyContent: "center",
    
      
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
        marginTop:20
        
    },
    containerLoad: {
        alignItems:"center",
        justifyContent: 'center',
      },
      textLoad: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        margin: 25,
      }
});
