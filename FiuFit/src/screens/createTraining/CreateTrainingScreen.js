import {useState} from "react";
import UploadImage from "./UploadImage";
import CreateTraining from "./CreateTraining";

const CreateTrainingScreen = () => {
    const [firstStep, setFirstStep] = useState(true);
    const [image, setImage] = useState(null)

    if (firstStep) {return <UploadImage  onPress={() => setFirstStep(false)}  setImage = {setImage} />}
    else {return <CreateTraining />}
}

export default CreateTrainingScreen;