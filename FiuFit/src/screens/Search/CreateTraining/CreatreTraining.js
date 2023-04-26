import React, { useState } from 'react';
import {View, Button, Image, Text, StyleSheet, error} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import TitleInput from "../../../components/inputs/TitleInput";
import {useForm} from "react-hook-form";
import DescriptionInput from "../../../components/inputs/DescriptionInput";
import isNumeric from "validator/es/lib/isNumeric";
import DropDownPicker from 'react-native-dropdown-picker';
import {SelectList} from "react-native-dropdown-select-list/index";
import {Ionicons} from "react-native-vector-icons";
import icon from "react-native-paper/src/components/Icon";
import {AntDesign} from "@expo/vector-icons";

function DifficultyList() {
    const [selected, setSelected] = React.useState("");

    const data = [
        {key:'1', value:'Difficulty: 1'},
        {key:'2', value:'Difficulty: 2'},
        {key:'3', value:'Difficulty: 3'},
        {key:'4', value:'Difficulty: 4'},
        {key:'5', value:'Difficulty: 5'}
    ]

    return (
        <View style={styles.difficultycontainer}>
            <Ionicons
                name="ios-stats-chart-outline"
            />
        <SelectList
            boxStyles={{borderWidth: 0, width:"70%"}}
            setSelected={(val) => setSelected(val)}
            data={data}
            search={false}
            save="value"
            placeholder={"Pick a difficulty"}
            defaultOption={{ key:'1', value:'Difficulty: 1' }}
        />
        </View>
    );
}

const CreateTraining = () => {
    const [imageUri, setImageUri] = useState('');
    const [t_title, setTitle] = useState('');
    const [t_description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [place, setPlace] = useState('');

    const { control} = useForm({
        defaultValues: {
            email: 'sofia@fi.uba.ar',
            password: '123456e'
        }
    });

    const pickImage = () => {
        ImagePicker.launchImageLibrary( response => {
            if (response.uri) {
                setImageUri(response.uri);
            }
        });
    };
        const createPost = async () => {
        const formData = new FormData();
        formData.append('image', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
        formData.append('description', t_description);

        try {
            const response = await axios.post('https://yourapi.com/posts', formData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{padding: 10, color: 'grey', fontSize: 20, paddingRight:280}}>New Post</Text>

            <View style={styles.boxContainer}>

                <TitleInput
                    name= "title"
                    placeholder="Title"
                    control={control}
                    icon={"md-barbell-outline"}
                    rules = {{
                        required:"Title is Required",
                    }}
                    value={t_title}
                    onChangeText={setTitle}
                />


                <DescriptionInput
                    name= "description"
                    placeholder="Description"
                    control={control}
                    icon={"md-pencil-outline"}
                    rules = {{
                        required:"Description is Required",
                    }}
                    value={t_description}
                    onChangeText={setDescription}
                />


                {/*<Button title="Pick a difficulty" onPress={DifficultyButton} />*/}
                <DescriptionInput
                    name= "difficulty"
                    placeholder="Difficulty [1-5]"
                    control={control}
                    icon={"ios-stats-chart-outline"}
                    rules = {{
                        required:"Pick a difficulty between 1 and 5",
                        validate: value => isNumeric(value) || "Not a valid difficulty",
                    }}
                    otherError={error}
                    value={difficulty}
                    onChangeText={setDifficulty}
                />

                {error && (
                    <Text style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </Text>
                )}

                <DescriptionInput
                    name= "place"
                    placeholder="Place"
                    control={control}
                    icon={"md-pin-outline"}
                    rules = {{
                        required:"Place",
                    }}
                    value={place}
                    onChangeText={setPlace}
                />

                <DifficultyList />

                <Button title="Pick the content" onPress={pickImage} />
                <Button title="Create post" onPress={createPost} />




            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:0,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxContainer: {
        backgroundColor: 'lightsteelblue',
        marginHorizontal:10,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    },
    difficultycontainer: {
        backgroundColor: '#DEE9F8',
        marginTop:1,
        width: '97%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding:5,
        margin:5,
        marginBottom:10

    },

    difficultyinput: {
        fontSize: 15,
        width: '97%',
        backgroundColor: '#DEE9F8',
        paddingHorizontal: 5,
        height: 20,
        borderRadius: 15,
    }
});


export default CreateTraining;