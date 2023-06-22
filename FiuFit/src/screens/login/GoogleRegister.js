import React, {useState,useEffect} from 'react';
import {View, Text, Switch,StyleSheet,Dimensions,Image,ScrollView,TouchableOpacity,ActivityIndicator,PermissionsAndroid} from 'react-native';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import LoadingIndicator from '../../components/utils/LoadingIndicator';
import {Ionicons} from 'react-native-vector-icons'
import FiuFitLogo from '../../../assets/images/fiticon.png';
import {ATHLETE,TRAINER, USER } from '../../utils/constants';
import ApiClient from "../../client/Client"
import { getLocation } from '../../utils/locations';
import {GoogleSignin,} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startRecordingAndObserveSteps } from '../../utils/googleFit';

const {height} = Dimensions.get("window")
const validator = require('validator');

const GoogleRegister = ({ route }) => {
    const {user} = route.params

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isAthlete, setIsAthlete] = useState(true); 
    const navigation = useNavigation();

    const toggleSwitch = () => {
        setIsAthlete(previousState => !previousState); 
    };

    function getRole(){
        return isAthlete ? ATHLETE : TRAINER
    }

    const onRegisterPressed = async (data) => {
        let res = await getLocation()
        console.log(res)
        console.log(data)
        console.log(user)
        setLoading(true)
        setError(false)
        let response = await ApiClient.googleSignUp(data,getRole(),res,user)
        if (!response.ok) {
            setLoading(false)
            console.log(response.status)
            setError(true)
            if (response.status ==  409)  setErrorMessage("User email already in use")
            else setErrorMessage("Failed to connect with server")  
        } else {
            let json = await response.json()
            startRecordingAndObserveSteps(json.access_token)
            const user_info = JSON.stringify(json)
            await AsyncStorage.setItem(USER,user_info)
            setLoading(false)
            navigation.navigate("Inicio")
        }      
    };

    const onSignInPress = async () => {
        await GoogleSignin.signOut();
        navigation.navigate('SignIn');
    };

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            phone_number: "+5491161637747",
            name:user.name,
            lastname: user.lastname,
            age: "27"
        }
    });


    const validateNumber = (number) => {
        return validator.isInt(number,{min:0})
    };

    const validatePhoneNumber = (phoneNumber) => {
        return validator.isMobilePhone(phoneNumber)
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
                : <>
                    
                <Image
                    source={{uri:user.picture}}
                    style={ {width: 100,height:100,borderRadius:50,marginTop:80,marginBottom:10}}
                    resizeMode="contain"
                />
                    
                        
                <Text style={[signUpStyles.title]}>Register with Google</Text>

                <View style={{width:"90%",marginTop: 5,marginBottom:15, alignItems:"center"}}>
                    <Text style={{fontSize:16}}>This is the first time you log in with this Account, please complete this fields:</Text>
                </View>
                
                <ScrollView >
                    <View style={{alignItems:"center",padding:5}}>

                    <CustomInput
                        name= "name"
                        placeholder="Name"
                        control={control}
                        icon={"person-outline"}
                        bgColor={"#F9F6EE"}
                        rules = {{required:"This field is Required"}}
                        otherError={error}
                        width={"100%"}
                    />

                    <CustomInput
                        name= "lastname"
                        placeholder="Last Name"
                        control={control}
                        bgColor={"#F9F6EE"}
                        icon={"person-outline"}
                        rules = {{required:"This field is Required"}}
                        otherError={error}
                        width={"100%"}
                    />

                    <CustomInput
                        name= "age"
                        placeholder="Age"
                        control={control}
                        bgColor={"#F9F6EE"}
                        icon={"fitness"}
                        rules = {{
                            required:"This field is Required",
                            validate: value => validateNumber(value) || "Not a valid number"
                        }}
                        otherError={error}
                        width={"100%"}
                        keyboardType='numeric'
                    />

                    <CustomInput
                        name= "phone_number"
                        placeholder="Phone number"
                        control={control}
                        icon={"call-outline"}
                        bgColor={"#F9F6EE"}
                        width={"100%"}
                        rules = {{
                            required:"This field is Required",
                            validate: value => validatePhoneNumber(value) || "Not a valid phone number"}}
                            otherError={error}
                    />
                    
                    <View style={[signUpStyles.container, isAthlete ? {} : {backgroundColor:"#FFF5EE"} ]}>
                        <Ionicons name={isAthlete ? 'basketball' : 'bicycle'} style= {signUpStyles.icon} size ={25}/>
                        < Text style={[signUpStyles.text,isAthlete ? {} : {color:"black"}]}  >
                            Choose your role:
                        </Text>
                        < Text style={signUpStyles.label}  >
                            {isAthlete ? 'Athlete' : 'Trainer'}
                        </Text>
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isAthlete}
                            thumbColor={isAthlete ? '#ffffff' : '#000000'}
                            trackColor={{ true: '#000000', false: '#ffffff' }}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                        />
                    </View>

                    <CustomIconButton
                        text="Register "
                        onPress={handleSubmit(onRegisterPressed)}
                        bgColor="crimson"
                        fgColor="white"
                        icon= "logo-google"
                        iconColor="white"
                        containerWidth="100%"
                    />
                    
                    
                    
                    {error && (
                        <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
                    )}

                    <CustomButton
                        text="Have an account? Sign in"
                        onPress={onSignInPress}
                        type="TERTIARY"
                    />
                    </View>
                </ScrollView>


                   
                </>
            }
        </View>

    );
};

export default GoogleRegister;


const signUpStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:"#F9F6EE",
        width: '100%',
        borderRadius: 15,
        padding:5,
        margin:5,
        height:45
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
