import {ScrollView, View} from "react-native";
import React from "react";
import Goal from "../../components/goals/Goal";


function GoalProfile({route} ) {
    const {item, user, canEdit} = route.params

    return (
        <View style={{ padding: 5, marginHorizontal:10,marginTop:10  }}>
            <ScrollView>
                <Goal item = {item} user={user} canEdit={canEdit}> </Goal>
            </ScrollView>

        </View>
    )
}


export default GoalProfile;