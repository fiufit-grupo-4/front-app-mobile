import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config/firebase';


export const pickImage = async (setImage) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.canceled) {
        setImage(result.assets[0].uri);
        //console.log(result.assets[0].uri)
    }
};

export const uploadImage = async (picture,setUri, name) => {
    //setLoading(true);
    //const response = await fetch(profilePicture);
    const response = await fetch(picture);
    const blob = await response.blob();
    //let date = new Date().getTime()
    const storageRef = firebase.storage().ref()
    //const imageRef = storageRef.child(`users/${user.id}/avatar/${date}`)
    const imageRef = storageRef.child(name)
    await imageRef.put(blob)
    //const res = await firebase.storage().ref().child(`users/${user.id}/avatar/${date}`).put(blob)
    //const uri = await firebase.storage().ref().child(`users/${user.id}/avatar/${date}`).getDownloadURL()   
    //console.log(uri)
    const uri = await imageRef.getDownloadURL() 
    setUri(uri)
    //setLoading(false)   
}

