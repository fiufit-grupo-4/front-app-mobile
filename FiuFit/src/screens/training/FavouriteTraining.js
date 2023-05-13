import {TouchableWithoutFeedback, View} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import React from "react";


export function favouriteTraining(handleFavoritePress, isFavorite) {
    return <TouchableWithoutFeedback onPress={handleFavoritePress}>
        <View>
            <Ionicons
                name={isFavorite ? 'md-star-sharp' : 'md-star-outline'}
                style={{fontSize: 24, padding: 7, alignItems: 'center'}}
            />
        </View>
    </TouchableWithoutFeedback>;
}