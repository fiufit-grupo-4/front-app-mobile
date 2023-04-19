import React from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from 'react-native-vector-icons'
import Logo from '../components/utils/Logo';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileScreen from "./profile/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const Tab = createBottomTabNavigator();


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const onLogOutPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
              name="Perfil" component={ProfileScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
              />

          <Tab.Screen
              options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="magnify" color={color} size={26} />
              )
            }}
              name="Busqueda" >{() => <Text>Busqueda</Text>}</Tab.Screen>

        </Tab.Navigator>


  );
};

// <Text style={styles.title}>Buen día Grupo</Text>
//
// <CustomButton
//     text="Log Out"
//     onPress={onLogOutPressed}
//     type="PRIMARY"
// />

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
    backgroundColor:"powderblue",
    justifyContent: "center",
    borderWidth:0
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    margin: 10,
    marginBottom:20
  },
});


/*
const HomeScreen = () => {
  const navigation = useNavigation();

  const onLogOutPressed = () => {
    // validate user
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Buen día Grupo</Text>

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
});*/

export default HomeScreen;
