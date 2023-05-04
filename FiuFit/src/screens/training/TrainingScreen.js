import {FlatList, TouchableOpacity, View, StyleSheet} from "react-native";
import {useState} from "react";
import Training from "../../components/trainings/Training";
import {useNavigation} from '@react-navigation/native';

const TrainingScreen = ( {route} ) => {
    const {item} = route.params
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1,padding: 1,  }}>
            <Training item =  {item} canEdit={true}> </Training>
                       
        </View>
     )
}

const styles = StyleSheet.create({

});

export default TrainingScreen;