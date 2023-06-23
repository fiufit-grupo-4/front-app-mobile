
import { firebase } from '../config/firebase';
import GoogleFit, { Scopes, ActivityType, BucketUnit } from 'react-native-google-fit'
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import 'expo-dev-client';
import { PermissionsAndroid } from 'react-native';
import {getUser } from "./getters"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import {API_GATEWAY} from "./constants"

///////// GOOGLE FIT /////////////
export const OPTIONS = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
    Scopes.FITNESS_BLOOD_PRESSURE_READ,
    Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
    Scopes.FITNESS_BLOOD_GLUCOSE_READ,
    Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
    Scopes.FITNESS_NUTRITION_WRITE,
    Scopes.FITNESS_SLEEP_READ,
  ],
};

//////////// SOLICITAR PERMISOS FIT //////////////

export const requestActivityPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      {
        title: 'Activity Recognition Permission',
        message: 'This app would like to view your activity recognition data.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the activity recognition");
      return true
    } else {
      console.log("Activity recognition permission denied");
      return false
    }
  } catch (err) {
    console.log(err);
    return false
  }
};


export const isGoogleAuthorized = async () => {
    await GoogleFit.checkIsAuthorized()
    return GoogleFit.isAuthorized
}

export const disconnectGoogleFit = async () => {
  GoogleFit.disconnect(); 
}

export const getPermissions = async () => {
  try{
    let permissions = await requestActivityPermission()
    if (!permissions) return false
    let authResult = await GoogleFit.authorize(OPTIONS)  
    if (authResult.success) {
      console.log("AUTH_SUCCESS");
      return true
    } else {
      console.log("AUTH_DENIED", authResult.message)
      return false
    }
  } catch{
    console.log(err);
    return false
  }
}

export const getPermissionsAndObserve = async () => {
  try{
    let permissions = await requestActivityPermission()
    if (!permissions) return false
    let authResult = await GoogleFit.authorize(OPTIONS)  
    if (authResult.success) {
      console.log("AUTH_SUCCESS");
      let user = await getUser()
      startRecordingAndObserveSteps(user.access_token)
      return true
    } else {
      console.log("AUTH_DENIED", authResult.message)
      return false
    }
  } catch{
    console.log(err);
    return false
  }
}





function stepToCalorie(step) {
  const calories = step * 0.04;
  return calories;
}

function stepToKilometer(step) {
  const meters = step * 0.76;
  const kilometers = meters / 1000;
  return kilometers;
}

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

export const startRecordingAndObserveSteps = (access_token) => {

  //requestActivityPermission().then(() => {
    //GoogleFit.authorize(options)
      //.then((res) => {
        GoogleFit.startRecording(
          async data => {
            const steps = await getSteps();
            console.log("Recording Steps: ", steps.steps);
          },
          ["step"]
        );
        
        GoogleFit.observeSteps(async result => {
          const steps = await getSteps();
          console.log("Observe Steps: ", steps.steps);
          if (steps.steps !== 0) {
            const url = API_GATEWAY + "athletes/me/goals/progress_steps"
            let response = await fetch(url, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
              },
              body: JSON.stringify({
                "progress_steps": steps.steps
              })

            })
            console.log("[FETCH-observeSteps] response status: ", response.status);
          }else{
            console.log("No hay cambios en observeSteps");
          }

        });
      //})
      //.catch((err) => {
      //  console.log('android getDailyStepCountSamples error >>> ', err)
      //});
  //});
};
  
  export async function getSteps() {
    const permission = await getPermissions()
    if (!permission) return 
    const start = new Date();
    start.setSeconds(start.getSeconds()- 2)
    console.log("start:",start)
    const end = new Date();
    console.log("end:",end)
    const options = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      bucketUnit: BucketUnit.SECOND, 
      bucketInterval: 1,
    };
    const result = await GoogleFit.getDailyStepCountSamples(options);
    console.log(JSON.stringify(result))
    const data = result.find(
      r => r.source === "com.google.android.gms:estimated_steps"
    );
    const steps = data.steps[0] && data.steps[0].value;
    if (steps) {
      return { steps };
    }
    return { steps: 0 };
  }


  export async function getLastMonthSteps() {
    const permission = await getPermissions()
    if (!permission) return 
    const start = new Date();
    start.setDate(start.getDate() - 30); // Ultimo Mes
    const end = new Date();
    let steps = await getStepsByTime(start,end,BucketUnit.DAY,1)
    return steps
  }



  export async function getLastWeekSteps() {
    const permission = await getPermissions()
    if (!permission) return 
    const start = new Date();
    start.setDate(start.getDate() - 7); // SEMANA ANTERIOR
    const end = new Date();
    let steps = await getStepsByTime(start,end,BucketUnit.DAY,1)
    return steps
  }

  export async function getLastHourSteps() {
    const permission = await getPermissions()
    if (!permission) return 
    const start = new Date();
    start.setHours(start.getHours() - 1); // SEMANA ANTERIOR
    const end = new Date();
    let steps = await getInfoByTime(start,end,BucketUnit.MINUTE,1)
    const data = steps.find(
      r => r.source === "com.google.android.gms:estimated_steps"
    );

    let info =  data.rawSteps.map(obj => ({
      steps: obj.steps,
      date: new Date(obj.startDate).toISOString()
    }));

    return info
  }

  export async function getLastDaySteps() {
    const permission = await getPermissions()
    if (!permission) return 
    const start = new Date();
    start.setHours(start.getHours() - 24); // DIA ANTERIOR
    const end = new Date();
    let steps = await getInfoByTime(start,end,BucketUnit.HOUR,1)
    const data = steps.find(
      r => r.source === "com.google.android.gms:estimated_steps"
    );
    let info =  data.rawSteps.map(obj => ({
      steps: obj.steps,
      date: new Date(obj.startDate).toISOString()
    }));
  
    return info

  }

  export function stepsToCalories(steps ){
    const calories = steps.map(step => stepToCalorie(step));
    return calories
  }

  export function stepsToKilometers(steps ){
    const kilometers = steps.map(step => stepToKilometer(step));
    return kilometers
  }

  async function getStepsByTime(start,end,unit,interval) {
    const options = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      bucketUnit:unit,
      bucketInterval: interval,
    }
    const result = await GoogleFit.getDailyStepCountSamples(options); 
    const data = result.find(
      r => r.source === "com.google.android.gms:estimated_steps"
    );
    
    return data.steps
  }

  async function getInfoByTime(start,end,unit,interval) {
    console.log("start:",start)
    console.log("end:",end)
    const options = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      bucketUnit:unit,
      bucketInterval: interval,
    }
    const result = await GoogleFit.getDailyStepCountSamples(options);  
    return result
  }




  
  
/*
  console.log("GoogleFit.eventListeners.length >>> ", GoogleFit.eventListeners.length);
  GoogleFit.unsubscribeListeners();
  console.log("GoogleFit.eventListeners.length >>> ", GoogleFit.eventListeners.length);
  startRecordingAndObserveSteps();
 */

  /*
  ///////////////// TEMA PARA BACKGROUND FETCH ///////////////////////
  
  const TIME_TASK_FETCH_SECS = 15; // in seconds
  const BACKGROUND_FETCH_TASK = 'getStepsAndroid';
  BackgroundFetch.setMinimumIntervalAsync(TIME_TASK_FETCH_SECS);
  
  // 1. Define the task by providing a name and the function that should be executed
  // Note: This needs to be called in the global scope (e.g outside of your React components)
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();
    console.log('****************************************');
    console.log('****************************************');
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
    console.log('****************************************');
    console.log('****************************************');
    if (GoogleFit.eventListeners.length === 0) {
      startRecordingAndObserveSteps();
    }
  
    const steps = await getSteps();
    console.log("Observe Steps: ", steps);
  
    if (steps.steps === Number(await AsyncStorage.getItem('steps'))) {
      console.log("No hay nuevos pasos");
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }
  
    const url = "https://api-gateway-fiufit.herokuapp.com/" + steps.steps
  
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await AsyncStorage.setItem('steps', String(steps.steps));
    console.log("[FETCH-TASK-BACKEND] response status: ", response.status);
  
    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });
  
  // 2. Register the task at some point in your app by providing the same name,
  // and some configuration options for how the background fetch should behave
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: TIME_TASK_FETCH_SECS, // in seconds
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }
  
  // 3. (Optional) Unregister tasks by specifying the task name
  // This will cancel any future background fetch calls that match the given name
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }
  
  TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK).then((isRegistered) => {
    console.log('TaskManager isTaskRegisteredAsync >>> ', isRegistered);
    if (isRegistered) {
      console.log('[isRegistered] isRegistered >>> ');
    } else {
      registerBackgroundFetchAsync().then((res) => {
        console.log('[NOT isRegistered] registerBackgroundFetchAsync >>> ');
      }
      );
    }
  });
  
  TaskManager.getRegisteredTasksAsync().then((res) => {
    console.log('[TAREAS TaskManager ACTIVAS] >>> ', res);
  });*/


//////////// PEDOMETER //////////////
/*
Pedometer.watchStepCount(result => {
  console.log('[Pedometer].watchStepCount >>> ', result);
});


Pedometer.isAvailableAsync().then(
  result => {
    console.log('[Pedometer].isAvailableAsync >>> ', result);
  },

  error => {
    console.log('[Pedometer].isAvailableAsync >>> ', error);
  }
);
const start = new Date();
start.setHours(0, 0, 0, 0);
start.setDate(start.getDate() - 1); // DIA ANTERIOR
const end = new Date();
Pedometer.getStepCountAsync(start, end).then(
  result => {
    console.log('[Pedometer].getStepCountAsync >>> ', result);
  },
  error => {
    console.log('[Pedometer].getStepCountAsync >>> ', error);
  }
).catch(error => {
  console.log('[Pedometer].getStepCountAsync >>> ', error);
});*/


