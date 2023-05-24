import {ScrollView, TouchableOpacity, View, StyleSheet} from "react-native";
import Training from "../../components/trainings/Training";


const TrainingProfile = ( {route} ) => {
    const {item} = route.params
    return (

        <View style={{ padding: 1, marginHorizontal:10,marginTop:10  }}>
            <ScrollView>
                 <Training item =  {item} canEdit={false}> </Training>
            </ScrollView>
            
        </View>
     )
}

export default TrainingProfile;