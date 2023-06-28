import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {stepsToKilometers,stepsToCalories} from '../../utils/googleFit';

const Charts = ({date, value}) => {
    
   
    const calories = {
      // Aquí debes proporcionar los datos para tus gráficos de línea
      labels: date,
      datasets: [
            {
            data: stepsToCalories(value),
            //data:value,
            color: (opacity = 1) => `rgba(255, 172, 28, ${opacity})`, // optional
            strokeWidth: 2 // optional
            }
        ],
      //legend: ["CALORIES"]
    };

    const steps = {
      // Aquí debes proporcionar los datos para tus gráficos de línea
      labels: date,
      datasets: [
            {
            data: value,
            color: (opacity = 1) => `rgba(255, 172, 28, ${opacity})`, // optional
            strokeWidth: 2 // optional
            }
        ],
      //legend: ["STEPS"]
    };

    const kilometers = {
        // Aquí debes proporcionar los datos para tus gráficos de línea
        labels: date,
        datasets: [
              {
              data: stepsToKilometers(value),
              //data:value,
              color: (opacity = 0) => `rgba(255, 172, 28, ${opacity})`, // optional
              strokeWidth: 2 // optional
              }
          ],
        //legend: ["KILOMETERS"]
      };
  
    return (
        <View>
            <View style={{marginTop:20}}>
                <Text style = {{fontWeight:"bold",fontSize:18,marginLeft:10}}> CALORIES </Text>
            </View>
            <View style={styles.container}>

                <View style={styles.chartContainer}>
                    <LineChart
                        data={calories}
                        width={350}
                        height={200}
                        chartConfig={chartConfig}
                    />
                
                </View>
            </View>
            <View style={{marginTop:20}}>
                <Text style = {{fontWeight:"bold",fontSize:18,marginLeft:10}}> KILOMETERS </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.chartContainer}>
                <LineChart
                    data={kilometers}
                    width={350}
                    height={200}
                    chartConfig={chartConfig}
                />
                
                </View>
            </View>
            {/* 
            <View style={{marginTop:20}}>
                <Text style = {{fontWeight:"bold",fontSize:18,marginLeft:10}}> STEPS </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.chartContainer}>
                <LineChart
                    data={steps}
                    width={320}
                    height={200}
                    chartConfig={chartConfig}
                />
                
                </View>
            </View>*/}
      </View>
    );


  };
  
  const chartConfig = {
    // Configuración del estilo de los gráficos de línea
    // Puedes personalizarlo según tus necesidades
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    xAxisLabelFontSize: 1,
    horizontalLabelRotation: 45,
   
  };
  
  const styles = StyleSheet.create({
    container: {
      marginTop:20,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent:"center",
      marginRight:20
    },
    chartContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
   
  });
  
  export default Charts;