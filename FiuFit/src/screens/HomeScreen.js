import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const onLogOutPressed = () => {
    // validate user
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Home, sweet home</Text>

      <CustomButton
          text="Log Out"
          onPress={onLogOutPressed}
          type="PRIMARY"
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

export default HomeScreen;
