import React from 'react';
import { View, Text, FlatList, Image, ScrollView, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const ImageTraining = (media) => {

  const renderMediaItem = (item) => {
    console.log(item)
    console.log("hola")
    if (item.media_type == 'image') {
      return <Image source={{ uri: item.url }} style={styles.image} />;
    } else if (item.media_type == 'video') {
      return <Video source={{ uri: item.url }} style={styles.video} />;
    }
    return null;
  };

  const renderPostItem = ({ item }) => {
    
    return (
      <View style={styles.postContainer}>
        <ScrollView horizontal>
          {item.media.map((mediaItem) => (
            <View key={mediaItem.id} style={styles.mediaContainer}>
              {renderMediaItem(mediaItem)}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <>  
        <Text> {JSON.stringify(media)} GO </Text>
        <FlatList
        data={media}
        keyExtractor={(item, index) => 'key'+index}
        renderItem={({item}) => (
            <View style={styles.postContainer}>
                
                <ScrollView horizontal>
                    <View style={styles.mediaContainer}>
                    {renderMediaItem(mediaItem)}
                    </View>
                </ScrollView>
        </View>
        )}
        />
    </>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  postDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  mediaContainer: {
    marginRight: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  video: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default ImageTraining;