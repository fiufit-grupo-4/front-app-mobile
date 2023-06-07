import {ScrollView, View} from "react-native";
import React from "react";
import Challenge from "../../components/challenge/Challenge";



function ChallengeProfile({route} ) {
    const {item, user, canEdit} = route.params

    return (
        <View style={{ padding: 5, marginHorizontal:10,marginTop:10  }}>
            <ScrollView>
                <Challenge item = {item} user={user} canEdit={canEdit}> </Challenge>
            </ScrollView>

        </View>
    )
}


export default ChallengeProfile;