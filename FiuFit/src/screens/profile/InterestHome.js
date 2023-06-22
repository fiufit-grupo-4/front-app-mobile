import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator,ToastAndroid } from 'react-native';
import Client from '../../client/Client';
import {useNavigation} from '@react-navigation/native';
import { getErrorMessage,getUser } from '../../utils/getters';

const InterestHome = ( {route}) => {
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
    setLoading(true)
    setError(false)
    let user = await getUser()
    let response = await Client.setInterests(user.access_token,selectedInterests)
    setLoading(false)
    if (!response.ok){
      setError(true)
      setErrorMessage(getErrorMessage(response.status))
    } else {
        ToastAndroid.show('Interest saved succesfully!', ToastAndroid.SHORT)
      navigation.navigate("Home")
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
     
      <Text style={styles.title}>Select your Interests</Text> 
            {loading
                ? <View style={{marginTop:250, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                <ActivityIndicator size="large" color = "black"/>
            </View>
                : <>
                <View style={styles.row}>
                <View style={styles.column}>
                    {renderInterest("Balance")}
                    {renderInterest("Fitness")}
                    {renderInterest("Resistance")}
                    {renderInterest("Yoga")}
                  </View>
                  <View style={styles.column}>
                    {renderInterest("Calisthenics")}
                    {renderInterest("Flexibility")}
                    {renderInterest("Running")}
                    {renderInterest("Walking")}
                  </View>

                </View>
                
                <TouchableOpacity onPress={handleOnPress} style={styles.button}>
                  <Text style={styles.text}>
                    Save
                  </Text>
                </TouchableOpacity>

                {error && (
                    <Text style = {{fontSize:15,color : "crimson",padding:10}}> {errorMessage} </Text>
                )}
              </>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:"center",
    alignItems:"center",
    paddingHorizontal:15,
    paddingTop: 20,
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
    marginHorizontal:10
  },

  interest: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor:"white",
    width:"105%",
    alignItems:"center",
    marginHorizontal:25
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
    fontSize: 24,
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
    borderRadius: 10,
    width:"60%"
  },
  text: {
    fontSize:16,
    fontWeight: 'bold',
    color: 'white',
  },

});

export default InterestHome;