import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {SelectList} from "react-native-dropdown-select-list/index";
import {Ionicons} from "react-native-vector-icons";
import {FontAwesome} from "@expo/vector-icons";

export function DifficultyList() {
    const [selected, setSelected] = React.useState("");

    const data = [
        {key:'1', value:'1'},
        {key:'2', value:'2'},
        {key:'3', value:'3'},
        {key:'4', value:'4'},
        {key:'5', value:'5'}
    ]

    return (
        <View style={styles.difficultycontainer}>
            <Ionicons name="ios-stats-chart-outline" color={"black"} style={{marginLeft: 9, marginRight:-5}}/>
            <Text style={{color:"dimgray"}}>      Difficulty</Text>
            <SelectList
                selectedTextStyle={{left:-10}}
                dropdownTextStyles={{left:-10, width:"66%"}}
                boxStyles={{borderWidth: 0, width:"44%"}}
                setSelected={(val) => setSelected(val)}
                dropdownStyles={{borderWidth: 0, width:"69%", left:10}}
                arrowicon={<FontAwesome name="home"  size={0}/>}

                data={data}
                search={false}
                save="value"
                placeholder={" "}
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
        margin:5,
        marginBottom:5,
    }
});
