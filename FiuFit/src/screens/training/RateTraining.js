import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Rating = ({ onRate }) => {
    const [rating, setRating] = useState(0);

    const handleRate = (value) => {
        setRating(value);
        onRate(value);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((value) => (
                <TouchableWithoutFeedback key={value} onPress={() => handleRate(value)}>
                    <Icon name={value <= rating ? 'star' : 'star-outline'} size={20} color="#FDB813" />
                </TouchableWithoutFeedback>
            ))}
            <Text style={{ marginLeft: 10 }}>{rating > 0 ? ' ' + ' ' : ' '}</Text>
        </View>
    );
};

export default Rating;