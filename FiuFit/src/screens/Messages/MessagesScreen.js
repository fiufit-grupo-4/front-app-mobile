import {useState} from "react";


const MessagesScreen = ( ) => {
    const [edit, setEdit] = useState(true);
    //const navigation = useNavigation();
    const handlePress = () => {
        setEdit(false);
        navigation.goBack();
    };

    //if (edit) {return <EditTraining onPress={handlePress} route={route} />;}
};

export default MessagesScreen;
