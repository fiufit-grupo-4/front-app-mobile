import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Logo from '../../components/utils/Logo';
import CustomButton from '../../components/buttons/CustomButton';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/styles';

const validator = require('validator');

const IndexScreen = () => {
  const navigation = useNavigation();

  const onTrainerPressed = () => {
    navigation.navigate('SignIn',{role:"Trainer",bgColor:"#F0A500",acces: 2});
  };

  const onAthletePressed = () => {
    navigation.navigate('SignIn',{role:"Athlete",access: 3});
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };


  return (
      <View style={styles.root}>
        <Logo/>
        <Text style={styles.title} > Welcome to FiuFit </Text>
         
        <View style={{ flexDirection: 'row', justifyContent: 'center',width:"80%",marginTop:10}}>
            <CustomIconButton
                text="Athlete Login "
                onPress={onAthletePressed}
                containerWidth={"55%"}
                icon={"basketball"}
            />
            <Text>{"  "}</Text>
            <CustomIconButton
                    text="Trainer Login "
                    onPress={onTrainerPressed}
                    bgColor={"orange"}
                    containerWidth={"55%"}
                    icon={"bicycle"}
                    
                /> 
               
        </View>  
        {/* 

        <CustomIconButton
                text="Athlete Login "
                onPress={onAthletePressed}
                containerWidth={"70%"}
                icon={"basketball"}
            />
            <CustomIconButton
                    text="Trainer Login "
                    onPress={onTrainerPressed}
                    bgColor={"orange"}
                    containerWidth={"70%"}
                    
                    icon={"bicycle"}
                    
                />  */} 
        <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
            />   

      </View>
  );
};

export default IndexScreen;
