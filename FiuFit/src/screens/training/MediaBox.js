import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const MediaBox = ({setElement,setMediaElement}) => {
  const [media, setMedia] = useState("");

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
      let element = result.assets[0].uri
      let mediaType=  result.assets[0].type
      setMedia(element)
      setElement(element)
      setMediaElement(mediaType)
    }
  };

  const handleMediaRemoval = () => {
    setMedia("")
    setElement("")
    setMediaElement("")
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

export default MediaBox;