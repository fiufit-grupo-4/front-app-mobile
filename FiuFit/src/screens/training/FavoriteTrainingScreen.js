import {FlatList, TouchableOpacity, View, StyleSheet} from "react-native";
import {useState} from "react";
import Training from "../../components/trainings/Training";
import { StatusBar } from 'expo-status-bar';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/buttons/CustomButton';

const FavoriteTrainingScreen = ( ) => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Fuerza de brazos',
            place: 'AreaX',
            description: 'Lorem ipsum dolor sit amet.',
            trainingType: 'Dolor',
            difficulty: 3,
            image: require('../../../assets/images/post1.png')
        },
        {
            id: 2,
            title: 'GAP',
            place: 'Gimnasio de aca la vueltitta',
            description: 'Sed ut perspiciatis unde omnis iste natus error, con un texto bien largo para ver como queda el espacio entre las cosas.',
            trainingType: 'Localizada',
            difficulty: 5,
            image: require('../../../assets/images/post2.png')
        },
        {
            id: 3,
            title: 'Sentadillas',
            place: 'Parque LasHeras',
            description: 'Excepteur sint occaecat cupidatat non proident.',
            trainingType: 'Cola',
            difficulty: 1,
            image: require('../../../assets/images/post3.png')
        },
    ]);

    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        const onPress = () => navigation.navigate("Training", { item });
        return (
            <>
                <Training item = {item}></Training>
                <CustomButton onPress = {onPress} text={"Ver Entrenamiento"} containerWidth={"100%"}></CustomButton>
            </>
        );
      };

    return (
        <View style={{ flex: 1,padding: 1 }}>
            <StatusBar style="auto" />
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}/>
        </View>
     )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileName: {
        marginLeft: 10,
        fontSize: 20,
        color:'rgba(23,29,52,0.93)'
    },
    profileBar: {
        flexDirection: 'row',
        alignItems: 'center',padding:9,
        backgroundColor:'white'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.64)',
    },
    enlargedProfileImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    profileFollow: {
        marginLeft: 10,
        fontSize: 15,
        color:'rgba(23,29,52,0.93)'
    }
});

export default FavoriteTrainingScreen;