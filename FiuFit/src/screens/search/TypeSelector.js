import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

const TypeSelector = ({setType,types}) => {
 
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    if (selectedType == type) {
      setType("")
      setSelectedType("");
    } else {
      setType(type)
      setSelectedType(type);
    }
    
  };

  return (
    <ScrollView horizontal>
      
      <View style={styles.container}>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeContainer,
              selectedType === type && styles.selectedTypeContainer,
            ]}
            onPress={() => handleTypeSelection(type)}
          >
            <Text
              style={[
                styles.typeText,
                selectedType === type && styles.selectedTypeText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    marginTop:10,
    marginBottom:5
    
  },
  typeContainer: {
    backgroundColor: '#788FAD',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    marginLeft:10,
    height:30
  },
  selectedTypeContainer: {
    backgroundColor: 'orange',
    borderWidth:1
  },
  typeText: {
    fontSize: 12,
    color: 'black',
    fontWeight:"bold"
  },
  selectedTypeText: {
    color: 'black',
  },
};

export default TypeSelector;



