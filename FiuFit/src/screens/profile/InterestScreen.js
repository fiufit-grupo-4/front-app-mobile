import React, { useState } from 'react';
import { View,SafeAreaView, TouchableOpacity, Text, StyleSheet, Image,ScrollView } from 'react-native';

import Client from '../../client/Client';
import Logo from '../../components/utils/Logo';
import LoadingIndicator from '../../components/utils/LoadingIndicator';
import {useNavigation} from '@react-navigation/native';
import { getErrorMessage } from '../../utils/getters';

const InterestsScreen = ( {route}) => {
  const {user} = route.params;
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
    
  };

  const isInterestSelected = (interest) => selectedInterests.includes(interest);

  const handleOnPress = async () =>{
    if (selectedInterests.length == 0){
      navigation.navigate("Inicio")
    }
    setLoading(true)
    setError(false)
    let response = await Client.setInterests(user.access_token,selectedInterests)
    setLoading(false)
    if (!response.ok){
      setError(true)
      setErrorMessage(getErrorMessage(response.status))
    } else {
      navigation.navigate("Inicio")
    }

  }

  const renderInterest = (interest) => (
    <TouchableOpacity
      style={[
        styles.interest,
        isInterestSelected(interest) && styles.selectedInterest,
      ]}
      onPress={() => handleInterestToggle(interest)}
    >
      <Text style={styles.interestText}>{interest}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Logo/>
      <Text style={styles.title}>Select your Interests</Text> 
            {loading
                ? <LoadingIndicator/>
                : <>
                <View style={styles.row}>
                  <View style={styles.column}>
                    {renderInterest("Running")}
                    {renderInterest("Caminata")}
                    {renderInterest("Yoga")}
                  </View>
                  <View style={styles.column}>
                    {renderInterest("Cardio")}
                    {renderInterest("Boxing")}
                  </View>

                </View>
                
                <TouchableOpacity onPress={handleOnPress} style={styles.button}>
                  <Text style={styles.text}>
                    Continue
                  </Text>
                </TouchableOpacity>

                {error && (
                    <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
                )}
              </>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#91AED4",
    alignContent:"center",
    alignItems:"center",
    paddingHorizontal:15,
    justifyContent:"center"
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  column: {
    flexBasis: '33%',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal:5
  },

  interest: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor:"white",
    width:"95%",
    alignItems:"center",
    marginHorizontal:15
  },
  selectedInterest: {
    backgroundColor: '#F0A500',
    
  },
  interestText: {
    color: '#000',
    fontWeight:"bold",
    fontSize:16
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
    marginBottom:30
    
},
  button: {
    padding: 12,
    marginTop: 20,
    backgroundColor:"black",
    alignItems: 'center',
    borderRadius: 15,
    width:"80%"
  },
  text: {
    fontSize:16,
    fontWeight: 'bold',
    color: 'white',
  },

});

export default InterestsScreen;
