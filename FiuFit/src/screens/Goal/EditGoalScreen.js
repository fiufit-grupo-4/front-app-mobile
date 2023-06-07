import {useState} from "react";
import EditGoal from "./EditGoal";


const EditGoalScreen = ({ navigation, route }) => {
    const [edit, setEdit] = useState(true);
    //const navigation = useNavigation();
    const handlePress = () => {
        setEdit(false);
        navigation.goBack();
    };

    if (edit) {return <EditGoal onPress={handlePress} route={route} />;}
};

export default EditGoalScreen;
