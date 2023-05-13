import {FlatList, TouchableOpacity, View, StyleSheet} from "react-native";
import Training from "../../components/trainings/Training";


const TrainingScreen = ( {route} ) => {
    const {item} = route.params
    return (
        <View style={{ flex: 1,padding: 1,  }}>
            <Training item =  {item} canEdit={true}> </Training>
        </View>
     )
}

export default TrainingScreen;