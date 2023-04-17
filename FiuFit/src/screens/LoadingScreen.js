import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Logo from "../components/utils/Logo"

const LoadingScreen = () => {
  const navigation = useNavigation();

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.root}>
      <Logo/>

      <LoadingIndicator/>
      
      <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
    />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex:1,
    padding: 20,
    backgroundColor:"skyblue",
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    margin: 10,
    marginBottom:20
  },
});

export default LoadingScreen;