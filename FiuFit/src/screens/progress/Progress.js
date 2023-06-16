import React, { useState,useEffect } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet,ScrollView } from 'react-native';
import { getUser } from '../../utils/getters';
import Client from '../../client/Client';
import { useIsFocused } from '@react-navigation/native';
import {getLastDaySteps,getLastMonthSteps, getLastWeekSteps,getSteps,stepsToCalories,stepsToKilometers} from '../../utils/googleFit';
import Charts from './Charts';

export const Progress = () => {
    const isFocused = useIsFocused();
    const [filter, setFilter] = useState('month');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [goals, setGoals] = useState({});
    const [goalsCompleted, setCompleteGoals] = useState([1]);
    const [timeUsed, setTimeUsed] = useState([""]);
    const [steps, setSteps] = useState([1]);
    const [time, setTime] = useState([""]);
    const handleFilter = (filterValue) => {
        // Set the selected filter
        setFilter(filterValue);
    };

    const lastMonthSteps = async() => {
        setFilter("month");
        let data = await getLastMonthSteps()

        setSteps(data.map(item => item.value))
        setTime(data.map(item =>  item.date.slice(5)))

    };

    const lastWeekSteps = async() => {
        setFilter("week");
        console.log("---------- LAST WEEK ---------")
        
        let data = await getLastWeekSteps()
        console.log(data)
        setSteps(data.map(item => item.value))
        setTime(data.map(item => item.date.slice(5)))
    };

    const lastDaySteps = async() => {
        setFilter("day");
        console.log("---------- LAST DAY ---------")
       
        let data = await getLastDaySteps()
        console.log(data)
        setSteps(data.map(item => item.value))
        setTime(data.map(item =>  item.date.slice(5)))
    };

    useEffect(() => {
        async function getGoals() {
            setLoading(true)
            setError(false)
            let userInfo = await getUser()
            Client.getGoals(userInfo.access_token).then((data) => {
                setGoals(data)
                console.log(data)
                setLoading(false)
            }).catch((error) => {
                setError(true);
                setErrorMessage(error.toString());
                setLoading(false)
            })
        }

        async function getMetrics() {
            let data = await getLastMonthSteps()
            
            setSteps(data.map(item => item.value))
            setTime(data.map(item => item.date.slice(5)))
            
        }
        getMetrics()
        getGoals();

        }, [isFocused])

    return (
        <View style={styles.container}>
            <Text style={{fontWeight:"bold",fontSize:28,textAlign:"center",marginTop:5}}>
                Progress
            </Text>
            <View style={styles.searchContainer}>
            
                <View style={styles.filterButtons}>
                    <TouchableOpacity onPress={async () => { await lastMonthSteps()}}>
                        <Text style={filter === 'month' ? styles.activeFilterText : styles.filterText}>
                            Last Month
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => await lastWeekSteps()}>
                        <Text style={filter === 'week' ? styles.activeFilterText : styles.filterText}>
                            Last Week
                        </Text>
                    </TouchableOpacity>

                    {/* 
                    <TouchableOpacity onPress={async () => await lastDaySteps()}>
                        <Text style={filter === 'day' ? styles.activeFilterText : styles.filterText}>
                            Last Day
                        </Text>
                    </TouchableOpacity>*/}

                    
                </View>

            </View>

            { loading 
                ? <View style={{marginTop:250, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}>
                <ActivityIndicator size="large" color = "black"/>
            </View>
                : <ScrollView>
                    

                    { steps.length == 0 
                        ? <View style = {{alignItems:"center",marginTop:30}}>
                            <Text style = {{fontSize:18}}> You don´t have any Metrics yet </Text>
                        </View>
                        : <> 
                            <Charts date={time} value={steps}></Charts>
                            <View style={{}}>
                                
                                <Text style = {{fontWeight:"bold",fontSize:18,marginLeft:15,marginBottom:5}}> Time used: </Text>
                                <Text style = {{fontWeight:"bold",fontSize:18,marginLeft:15}}> Goals Completed: </Text>                            
                            </View>
                        </>
                    }
                </ScrollView>
            }
            
            

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginTop:10,
        marginHorizontal: 15,
        backgroundColor:"white",
        paddingHorizontal: 5,
        paddingVertical: 5,
        flex: 1,
        marginBottom:10
        
    },
    searchContainer: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        backgroundColor:'white',
        height:50,
        justifyContent:"center",
        borderBottomWidth:1,
        borderColor:"orange",

    },
    
    searchInput: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
        flex: 1,
        marginLeft: 10,
    },
    clearButton: {
        marginLeft: 10,
    },
    filterButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    filterText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
        marginLeft: 10,
    },
    activeFilterText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
    },
});

export default Progress;
