import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const MediaBox = (setElement) => {
  const [media, setMedia] = useState(null);

  const handleMediaSelection = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality:1,
    });
    if (!result.canceled) {
     //setMedia(result.assets[0].uri);
      let element = {
        "media_type": result.assets[0].type,
        "url": result.assets[0].uri
        }
    //setVideo(result.assets[0].uri);
      setMedia(element)
      setElement(element)
    }
  };

  const handleMediaRemoval = () => {
    setMedia(null);
    setElement(null)
  };

  return (
    <View style={styles.mediaBox}>
      {media ? (
        <TouchableOpacity onPress={handleMediaRemoval} style={styles.imageContainer}>
          <Image source={{ uri: media }} style={styles.image} />
          <View style={styles.removeButton}>
            <AntDesign name="closecircle" size={24} color="red" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleMediaSelection} style={styles.placeholderContainer}>
          <View style={styles.placeholder}>
            <AntDesign name="plus" size={24} color="black" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const App = (setElement) => {
  return (
   
      <MediaBox setElement= {setElement} />
     
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaBox: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderStyle: 'dashed',
    margin: 10,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
};

export default App;