import {useState} from "react";
import EditChallenge from "./EditChallengeScreen";


const EditChallengeScreen = ({ navigation, route }) => {
    const [edit, setEdit] = useState(true);
    //const navigation = useNavigation();
    const handlePress = () => {
        setEdit(false);
        navigation.goBack();
    };

    if (edit) {return <EditChallenge onPress={handlePress} route={route} />;}
};

export default EditChallengeScreen;
