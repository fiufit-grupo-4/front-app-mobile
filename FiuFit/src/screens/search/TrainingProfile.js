import {FlatList, TouchableOpacity, View, StyleSheet} from "react-native";
import Training from "../../components/trainings/Training";


const TrainingProfile = ( {route} ) => {
    const {item} = route.params
    return (
        <View style={{ flex: 1,padding: 1, marginHorizontal:10,marginTop:10  }}>
            <Training item =  {item} canEdit={false}> </Training>
        </View>
     )
}

export default TrainingProfile;