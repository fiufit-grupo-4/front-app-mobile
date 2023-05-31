import React, { useState } from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Ionicons} from "react-native-vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Rating = ({ onRate }) => {
    const [rating, setRating] = useState(0);

    const handleRate = (value) => {
        setRating(value);
        onRate(value);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            {[1, 2, 3, 4, 5].map((value) => (
                <TouchableWithoutFeedback key={value} onPress={() => handleRate(value)}>
                    <Icon name={value <= rating ? 'heart' : 'heart-outline'} size={18} color="red" />
                </TouchableWithoutFeedback>
            ))}
            <Text style={{ marginLeft: 10 }}>{rating > 0 ? ' ' + ' ' : ' '}</Text>
        </View>
    );
};

export function likeTraining(handleFavoritePress, isLiked) {
    return <TouchableWithoutFeedback onPress={handleFavoritePress}>
        <View>
            <Ionicons
                name={isLiked ? 'md-heart-sharp' : 'md-heart-outline'}
                style={{fontSize: 24, padding: 7, alignItems: 'center'}}
            />
        </View>
    </TouchableWithoutFeedback>;
}

export function getCalification(handleHeartPress, handleNewRate, item) {
    return <>
        {/* Calificacion */}
        <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback onPress={handleHeartPress}>
                <Ionicons name={"md-ribbon-outline"} style={styles.qualifyIcon}/>
            </TouchableWithoutFeedback>
            <likeTraining onRate={handleNewRate}/>
            {/*<Text style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                color: 'rgba(23,29,52,0.71)'
            }}>{'Average:  ' + item.likes.length}</Text>
            */}
        </View>
    </>;
}

const styles = StyleSheet.create({
    qualifyIcon :{
        fontSize: 12,
        marginRight: 10,
        padding:8,
        marginTop:12,
        color: 'rgba(32,38,70,0.7)'
    }
});

