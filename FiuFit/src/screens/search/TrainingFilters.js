import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import TypeSelector from './TypeSelector';

const TrainingFilters = ({search}) => {
  const [minDifficulty, setMinDifficulty] = useState('1');
  const [maxDifficulty, setMaxDifficulty] = useState('5');
  const [minDistance, setMinDistance] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [type,setType] = useState('');
  const types = ['Running', 'Caminata'];


  const handleMinDifficultyChange = (value) => {
    setMinDifficulty(value);
  };

  const handleMaxDifficultyChange = (value) => {
    setMaxDifficulty(value);
  };

  const handleMinDistanceChange = (value) => {
    setMinDistance(value);
  };

  const handleMaxDistanceChange = (value) => {
    setMaxDistance(value);
  };

  return (
    <View>
        <View style={styles.filtersContainer}>
          <Text style={styles.filterLabel}>Type:</Text>
          <TypeSelector setType={setType} types={types}></TypeSelector>

          <Text style={styles.filterLabel}>Difficulty:</Text>
          <View style={styles.difficultyContainer}>
            <TextInput
              style={styles.difficultyInput}
              keyboardType="numeric"
              placeholder="Min"
              value={minDifficulty}
              onChangeText={handleMinDifficultyChange}
            />
            <TextInput
              style={styles.difficultyInput}
              keyboardType="numeric"
              placeholder="Max"
              value={maxDifficulty}
              onChangeText={handleMaxDifficultyChange}
            />
          </View>

          <Text style={styles.filterLabel}>Distance:</Text>
          <View style={styles.distanceContainer}>
            <TextInput
              style={styles.distanceInput}
              keyboardType="numeric"
              placeholder="Min"
              value={minDistance}
              onChangeText={handleMinDistanceChange}
            />
            <TextInput
              style={styles.distanceInput}
              keyboardType="numeric"
              placeholder="Max"
              value={maxDistance}
              onChangeText={handleMaxDistanceChange}
            />
          </View>
        </View>
    </View>
  );
};

export default TrainingFilters

const styles = {
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop:10

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  filtersContainer:{
    backgroundColor: '#91AED4',
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft:5,
    },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },
    difficultyInput: {
        flex: 1,
        width: 60,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        marginLeft:10,
        marginRight: 10,
        
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:10
    },
    distanceInput: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        marginLeft:10,
        marginRight: 10,
    },
};