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
            <View style={styles.difficultycontainer}>
            <View style={styles.inputContainer}>
                <Ionicons name="ios-stats-chart-outline" color={"black"} style={{marginLeft: 9, marginRight:-5}}/>
                <Text style={{color:"gray"}}>      Difficulty</Text>
                <SelectList
                    selectedTextStyle={{left:-10}}
                    dropdownTextStyles={{left:-10, width:"66%"}}
                    boxStyles={{borderWidth: 0, width:"44%"}}
                    setSelected={(val) => setSelected(val)}
                    dropdownStyles={{borderWidth: 0, width:"69%", left:10}}
                    arrowicon={<FontAwesome name="home"  size={0}/>}
                    defaultOption={{ key:'1', value:'1' }}

                    data={data}
                    search={false}
                    save="value"
                    placeholder={" "}
                />
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: 'lightsteelblue',
        marginHorizontal:10,
        zIndex:0,
        padding: 15,
        borderRadius: 10,
    },
    difficultycontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#91AED4',
        borderRadius: 10,
        marginVertical: 13,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#91AED4',
        borderRadius: 10,
        marginVertical: 13,
    },
    input: {
        fontSize: 15,
        width: '100%',
        backgroundColor: '#91AED4',
        paddingHorizontal: 5,
        height: 30,
        borderRadius: 6,
        flex:1,
        elevation:0

    },
    nextButton: {
        backgroundColor: '#DEE9F8FF',
        alignItems: 'center',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 5,
        marginBottom:1,
        marginTop:20,
        width: 90
    },
    icon: {
        paddingHorizontal: 5,
        color: "rgba(34,40,49,0.74)",
        alignItems:"center",
        fontSize: 15,
        marginVertical:8
    },
});
