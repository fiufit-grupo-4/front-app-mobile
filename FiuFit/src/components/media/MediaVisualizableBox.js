import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Video from '../../components/utils/Video';
import { DEFAULT_IMAGE } from '../../utils/constants';
const MediaVisualizableBox = ({media}) => {
    if (!media){<></>} 
    else {
        return (
        <View style={styles.mediaBox}>
            {
                media.media_type == "image" 
                ? media.url 
                    ? <Image source={{ uri: media.url }} style={styles.image} />
                    : <Image source={{ uri: DEFAULT_IMAGE }} style={styles.image} /> 
                    : media.media_type == "video"
                        ? <Video uri ={media.url} />
                        : <Image source={{ uri: DEFAULT_IMAGE }} style={styles.image} /> 
            }
        </View>
  )
};
}


const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaBox: {
    width: 300,
    height: 300,
    margin: 10,
    borderRadius:10
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
    borderRadius:10
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:5,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
};

export default MediaVisualizableBox;