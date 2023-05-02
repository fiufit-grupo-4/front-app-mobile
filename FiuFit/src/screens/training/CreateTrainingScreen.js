import {useEffect, useState} from "react";
import UploadImage from "./UploadImage";
import CreateTraining from "./CreateTraining";
import ProfileScreen from "../profile/ProfileScreen";

const CreateTrainingScreen = ({ navigation }) => {
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

    if (firstStep) {
        return <UploadImage onPress={() => setFirstStep(false)} setImage={setImage} />;
    } else if (configuration) {
        return <CreateTraining onPress={() => setConfiguration(false)} />;
    } else {
        return <ProfileScreen />;
    }
};

export default CreateTrainingScreen;
