import {useEffect, useState} from "react";
import EditTraining from "./EditTraining";


const EditTrainingScreen = ({ navigation, route }) => {
    const [edit, setEdit] = useState(true);
    //const navigation = useNavigation();

    const handlePress = () => {
        setEdit(false);
        navigation.goBack();
    };

    if (edit) {
        return <EditTraining onPress={handlePress} route={route} />;
    } //else {
        //return <ProfileScreen />;
    //}
};

export default EditTrainingScreen;
