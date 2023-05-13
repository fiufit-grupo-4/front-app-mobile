import {useEffect, useState} from "react";
import UploadImage from "./UploadImage";
import CreateTraining from "./CreateTraining";

const CreateTrainingScreen = ({ navigation, route }) => {
    const [firstStep, setFirstStep] = useState(true);
    const [image, setImage] = useState(null);
    const [configuration, setConfiguration] = useState(true);

    useEffect(() => {
        return navigation.addListener("focus", () => {
            // Reset states when screen is focused
            setFirstStep(true);
            setImage(null);
            setConfiguration(true);
        });
    }, [navigation]);

    const handlePress = () => {
        setConfiguration(false);
        navigation.goBack();
    };


    if (firstStep) {
        return <UploadImage onPress={() => setFirstStep(false)}  setImage={setImage} />;
    } else if (configuration) {
        return <CreateTraining onPress={handlePress}/>;
    }
};

export default CreateTrainingScreen;
