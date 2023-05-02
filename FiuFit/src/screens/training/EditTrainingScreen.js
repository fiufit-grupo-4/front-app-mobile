import {useEffect, useState} from "react";
import EditTraining from "./EditTraining";
import ProfileScreen from "../profile/ProfileScreen";
import { useNavigation } from '@react-navigation/native';



const EditTrainingScreen = ({ route }) => {
    const [edit, setEdit] = useState(true);
    const navigation = useNavigation();

    const handlePress = () => {
        setEdit(false);
        navigation.goBack();
    };

    if (edit) {
        return <EditTraining onPress={handlePress} route={route} />;
    } else {
        return <ProfileScreen />;
    }
};

export default EditTrainingScreen;
