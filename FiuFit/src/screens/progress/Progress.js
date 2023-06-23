import React, { useState,useEffect } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet,ScrollView } from 'react-native';
import { getUser } from '../../utils/getters';
import Client from '../../client/Client';
import { useIsFocused } from '@react-navigation/native';
import {getLastDaySteps,getLastMonthSteps, getLastWeekSteps,getLastHourSteps} from '../../utils/googleFit';
import Charts from './Charts';

export const Progress = () => {
    const isFocused = useIsFocused();
    const [filter, setFilter] = useState('month');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [goals, setGoals] = useState({});
    const [goalsCompleted, setCompleteGoals] = useState(0);
    const [timeUsed, setTimeUsed] = useState("0 minutes");
    const [steps, setSteps] = useState([1]);
    const [time, setTime] = useState([""]);
    const handleFilter = (filterValue) => {
        // Set the selected filter
        setFilter(filterValue);
    };

    const lastMonthSteps = async() => {
        setFilter("month");
        let data = await getLastMonthSteps()
        const date = new Date();
        date.setDate(date.getDate() - 30);
        setSteps(data.map(item => item.value))
        setTime(data.map(item =>  item.date.slice(5)))
        setCompleteGoals(completedGoals(date))
        setTimeUsed(getTimeUsed(date))
    };

    const lastWeekSteps = async() => {
        setFilter("week");
        let data = await getLastWeekSteps()
        const date = new Date();
        date.setDate(date.getDate() - 7);
        
        setSteps(data.map(item => item.value))
        setTime(data.map(item => item.date.slice(5)))
        setCompleteGoals(completedGoals(date))
        setTimeUsed(getTimeUsed(date))
    };

    const lastDaySteps = async() => {
        setFilter("day");
        let data = await getLastDaySteps()
        const date = new Date();
        date.setHours(date.getHours() - 24)
        
        setSteps(data.map(item => item.steps))
        setTime(data.map(item =>  item.date.slice(12,16)))
        setCompleteGoals(completedGoals(date))
        setTimeUsed(getTimeUsed(date))
    };

    const lastHourSteps = async() => {
        setFilter("hour");
        let data = await getLastHourSteps()
        const date = new Date();
        date.setHours(date.getHours() - 1)
        
        setSteps(data.map(item => item.steps))
        setTime(data.map(item =>  item.date.slice(13,16)))
        setCompleteGoals(completedGoals(date))
        setTimeUsed(getTimeUsed(date))
    };


    function completedGoals(date) {
        const completedGoals = goals.filter(goal => {
          return goal.date_complete && new Date(goal.date_complete) >= date;
        });
        return completedGoals.length;
    }

    function getTimeUsed(date) {
        let {min,max} = getMinMaxDates(date)
        console.log("MIN: ",min)
        console.log("MAX: ",max)
        if (!min && !max) return "0 minutes"
        let diff
        if (!min) diff = max.getTime() - date.getTime();
        else if (!max) diff = new Date().getTime() - min.getTime();
        else  diff = max.getTime() - min.getTime();
        console.log(diff)
        return formatTimeDiff(diff);
    }


    function getMinMaxDates(fromDate) {
        let minDateInit = null;
        let maxDateInit = null;
        let minDate = null;
        let maxDate = null;
      
        goals.forEach((goal) => {
          if (goal.date_init && new Date(goal.date_init) > fromDate) {
            const dateInit = new Date(goal.date_init);
      
            if (!minDateInit || dateInit < minDateInit) {
              minDateInit = dateInit;
            }
      
            if (!maxDateInit || dateInit > maxDateInit) {
              maxDateInit = dateInit;
            }
          }
      
          if (goal.date_complete && new Date(goal.date_complete) > fromDate) {
            const dateComplete = new Date(goal.date_complete);
      
            if (!minDate || dateComplete < minDate) {
              minDate = dateComplete;
            }
      
            if (!maxDate || dateComplete > maxDate) {
              maxDate = dateComplete;
            }
          }
        });
        console.log(minDate)
        console.log(minDateInit)
        console.log(maxDate)
        console.log(maxDateInit)
        let min = minDateInit > minDate ? fromDate : minDateInit
        let max = maxDateInit >= maxDate ? maxDateInit : maxDate
        return {min,max};
      }

    function formatTimeDiff(diff) {
        // Calcula el número de horas, minutos y segundos
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        console.log(minutes)
        console.log(seconds)
        // Construye la cadena de tiempo formateada
        let formattedTimeDiff = "";
      
        if (hours > 0) {
          formattedTimeDiff += `${hours} hora${hours > 1 ? "s" : ""}, `;
        }
        if (minutes > 0) {
          formattedTimeDiff += `${minutes} minuto${minutes > 1 ? "s" : ""}, `;
        }
        if (seconds > 0) {
          formattedTimeDiff += `${seconds} segundo${seconds > 1 ? "s" : ""}, `;
        }
      
        // Elimina la coma y el espacio final
        formattedTimeDiff = formattedTimeDiff.slice(0, -2);
      
        return formattedTimeDiff;
      }

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

                    {/* 
                    <TouchableOpacity onPress={async () => await lastWeekSteps()}>
                        <Text style={filter === 'week' ? styles.activeFilterText : styles.filterText}>
                            Last Week
                        </Text>
                    </TouchableOpacity>*/}

                    
                    <TouchableOpacity onPress={async () => await lastDaySteps()}>
                        <Text style={filter === 'day' ? styles.activeFilterText : styles.filterText}>
                            Last Day
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={async () => await lastHourSteps()}>
                        <Text style={filter === 'hour' ? styles.activeFilterText : styles.filterText}>
                            Last Hour
                        </Text>
                    </TouchableOpacity>

                    
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
                            <Text style = {{fontWeight:"bold",fontSize:18,marginLeft:15,marginBottom:5}}> Goals Completed :</Text>
                            <Text style = {{fontSize:18,marginLeft:15,marginBottom:8,alignSelf:"center"}}>  {`${goalsCompleted} goal${goalsCompleted > 1 ? "s" : ""} ` }</Text>                            
                                <Text style = {{fontWeight:"bold",fontSize:18,marginLeft:15,marginBottom:5}}> Total Time used :</Text>
                                <Text style = {{fontSize:18,marginLeft:15,marginBottom:8,alignSelf:"center"}}> {timeUsed}</Text>
                               
                                
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
        marginHorizontal: 10,
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
