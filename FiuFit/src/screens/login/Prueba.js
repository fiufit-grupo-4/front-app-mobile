import React, { useEffect,useState } from 'react';
import { View, Button,Image,Dimensions,Platform,Text } from 'react-native';
import CustomIconButton from '../../components/buttons/CustomIconButton';;
import styles from '../../styles/styles';
import FiuFitLogo from '../../../assets/images/fiticon.png';
import {  getPermissionsAndObserve , getLastHourSteps, getLastDaySteps,getLastWeekSteps,getLastMonthSteps,disconnectGoogleFit,isGoogleAuthorized} from '../../utils/googleFit';
const {height} = Dimensions.get("window")

export default function App() { 

  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [fitness,setFitness] = useState(null)

  
  const handleSignOut = async () => {
    setUser(null)
    setFitness(null)
  };

  


  return (
    <View style={styles.root}>

        <Image
            source={FiuFitLogo}
            style={ {width: "80%", height: height * 0.2,marginTop:10}}
            resizeMode="contain"
        />

        <CustomIconButton
            text="Authorize Google Fit "
            onPress={async () => {
              let result = await getPermissionsAndObserve()
              console.log(result)
            }}
            bgColor="crimson"
            fgColor="white"
            icon= "logo-google"
            iconColor="white"
        />

          

        <CustomIconButton
            text="Get Steps "
            onPress={async () => {
              console.log("----- Last Day -----")
              await getLastDaySteps()
              console.log("----- Last Month -----")
              await getLastMonthSteps()
              console.log("----- Last Week -----")
              await getLastWeekSteps()
              console.log("----- Last Hour -----")
              await getLastHourSteps()
            }}
            bgColor="orange"
            fgColor="white"
            icon= "logo-google"
            iconColor="white"
        />
{/*
        <CustomIconButton
            text="Start observe tracking "
            onPress={async () => {
              await startRecordingAndObserveSteps()
            }}
            bgColor="white"
            fgColor="black"
            icon= "logo-google"
            iconColor="black"
        />


        <CustomIconButton
            text="Stop tracking "
            onPress={async () => {
              await stopTracking()
            }}
            bgColor="black"
            fgColor="white"
            icon= "logo-google"
            iconColor="white"
        />*/}

        <CustomIconButton
            text="is authorized? "
            onPress={async () => {
              let r = await isGoogleAuthorized( )
              console.log("Is auth? ",r)
            }}
            bgColor="lightblue"
            fgColor="white"
            icon= "logo-google"
            iconColor="white"
        />


        <CustomIconButton
            text="Get Data "
            onPress={async () => {
              await getLastMonthSteps()
            }}
            bgColor="purple"
            fgColor="white"
            icon= "logo-google"
            iconColor="white"
        />

        <CustomIconButton
            text="Log Out "
            onPress={async ()=>{await disconnectGoogleFit()}}
            bgColor="powderblue"
            fgColor="white"
            icon= "logo-google"
            iconColor="white"
        />
     

    </View>
  )

}

