import React from 'react';
import {
  Text,
  View,Dimensions
} from 'react-native';
const {width,height} = Dimensions.get("window")
import {Ionicons} from "react-native-vector-icons";


//import FiuFitLogo from '../../../assets/images/fiticon.png';

const Errors = ({icon,message, marginTop}) => {
    return (
        <View style = {{alignItems:"center",marginTop: marginTop? marginTop : 250}}>
            <Ionicons name={icon}  size ={80} color = {"gray"}/>
            <Text style = {{fontSize:18,fontWeight:"bold",marginTop:20,color:"gray"}}>{message} </Text>
        </View>
    );
};

export default Errors