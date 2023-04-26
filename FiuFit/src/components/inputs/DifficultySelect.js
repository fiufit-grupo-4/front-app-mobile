import React from "react";
import {StyleSheet, View} from "react-native";
import {SelectList} from "react-native-dropdown-select-list/index";
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
            <Ionicons name="ios-stats-chart-outline" color={"black"} style={{marginLeft: 9, marginRight:-5}}/>
            <SelectList
                selectedTextProps={{style: {}}}

                selectedTextStyle={{fontSize: 13, left:-20, color: 'red'}}
                dropdownStyles={{borderWidth: 0, width:"66%", left:10}}
                boxStyles={{borderWidth: 0, width:"67%"}}
                dropdownTextStyles={{left:-20, width:"66%"}}
                setSelected={(val) => setSelected(val)}

                data={data}
                search={false}
                save="value"
                placeholder={"Difficulty"}
                //defaultOption={{ key:'1', value:'Difficulty: 1' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    difficultycontainer: {
        backgroundColor: '#DEE9F8',
        marginTop:1,
        width: '97%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        //padding:5,
        margin:5,
        marginBottom:5,
    }
});

export default DifficultyList;