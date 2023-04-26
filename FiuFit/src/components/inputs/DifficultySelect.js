import React from "react";
import {StyleSheet, View} from "react-native";
import {SelectList} from "react-native-dropdown-select-list/index";
import CreateTraining from "../../screens/Search/CreateTraining/CreatreTraining";
import {Ionicons} from "react-native-vector-icons";

export function DifficultyList() {
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
            <Ionicons name="ios-stats-chart-outline" color={"black"} style={{marginHorizontal: 7}}/>
            <SelectList
                selectedTextProps={{
                    style: {
                        fontSize: 20,
                        color: 'blue',
                    },
                }}
                boxStyles={{borderWidth: 0, width:"50%"}}
                setSelected={(val) => setSelected(val)}
                data={data}
                search={false}
                baseColor="rgba(255, 255, 255, 1)"
                style = {{color: 'white'}}
                save="value"
                fontColor={"lightgrey"}
                placeholder={"Difficulty"}
                //defaultOption={{ key:'1', value:'Difficulty: 1' }}
            />
        </View>
    );
}

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

    }
});

export default DifficultyList;