import {ScrollView, View} from "react-native";
import React from "react";
import Metric from "../../components/metrics/Metric";

function MetricProfile( {route} ) {
    const {item, user, canEdit} = route.params

    return (
        <View style={{ padding: 5, marginHorizontal:10,marginTop:10  }}>
            <ScrollView>
                <Metric item = {item} user={user} canEdit={canEdit}> </Metric>
            </ScrollView>

        </View>
    )
}


export default MetricProfile;