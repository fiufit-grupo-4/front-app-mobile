import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

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
    
  },
  typeContainer: {
    backgroundColor: '#788FAD',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginLeft:10,
  },
  selectedTypeContainer: {
    backgroundColor: 'orange',
    borderWidth:1
  },
  typeText: {
    fontSize: 16,
    color: 'black',
    fontWeight:"bold"
  },
  selectedTypeText: {
    color: 'black',
  },
};

export default TypeSelector;



