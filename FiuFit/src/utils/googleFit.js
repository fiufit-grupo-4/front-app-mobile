
import { firebase } from '../config/firebase';
import GoogleFit, { Scopes, ActivityType, BucketUnit } from 'react-native-google-fit'
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import 'expo-dev-client';
import { PermissionsAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


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

const requestActivityPermission = async () => {
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
      startRecordingAndObserveSteps()
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



// Detener la suscripción a los datos de pasos o calorías
export const stopTracking = async () => {
  try {
    GoogleFit.unsubscribeListeners();
    console.log('Suscripción detenida');
  } catch (error) {
    console.log('Error al detener la suscripción:', error);
  }
};

// Obtener los datos de pasos o calorías actualizados
export const getUpdatedData = async () => {
  try {
    const data = await GoogleFit.getDailyStepCountSamples(); // Obtener los datos de pasos actualizados
    // const data = await GoogleFit.getDailyCalorieSamples(); // Obtener los datos de calorías actualizados

    console.log('Datos actualizados:', data);
    // Aquí puedes enviar los datos al backend o realizar otras acciones con ellos
  } catch (error) {
    console.log('Error al obtener los datos actualizados:', error);
  }
};

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
};


export const startRecordingAndObserveSteps = () => {

  console.log('----------- startRecordingAndObserveSteps() -----------')
  requestActivityPermission().then(() => {
    GoogleFit.authorize(options)
      .then((res) => {
        GoogleFit.startRecording(
          async data => {
            console.log('startRecording:data >>>', data)
            const steps = await getSteps();
            console.log("Recording Steps: ", steps.steps);
            console.log("AsyncStorage Steps: ", (await AsyncStorage.getItem('steps')));
            if (steps.steps != Number(await AsyncStorage.getItem('steps'))) {
              await AsyncStorage.setItem('steps', String(steps.steps));
              const url = "https://api-gateway-fiufit.herokuapp.com/xd/" + steps.steps

              let response = await fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              console.log("[FETCH-startRecording] response status: ", response.status);

            }
          },
          ["step"]
        );
        // esto se llama siempre, en cada reload de la app creo.. si ya tenia un Observer, no haria fallta llamarlo de nuevo??
        GoogleFit.observeSteps(async result => {
          console.log('observeSteps:result >>>', result)
          const steps = await getSteps();
          console.log("Observe Steps: ", steps);

          if (steps.steps !== Number(await AsyncStorage.getItem('steps'))) {
            await AsyncStorage.setItem('steps', String(steps.steps));
            const url = "https://api-gateway-fiufit.herokuapp.com/xd/" + steps.steps

            let response = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            console.log("[FETCH-observeSteps] response status: ", response.status);
          }else{
            console.log("No hay cambios en observeSteps");
          }

        });
      })
      .catch((err) => {
        console.log('android getDailyStepCountSamples error >>> ', err)
      });
  });
};
  
  export async function getSteps() {
    //const permission = await getPermissions()
    //if (!permission) return 
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 7); // SEMANA ANTERIOR
    console.log("start:",start)
    const end = new Date();
    console.log("end:",end)
    const options = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      bucketUnit: BucketUnit.DAY, // NOSE QUE ES, JUGAR CON ESTO
      //bucketInterval: 15, // JUGAR CON ESOOO
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


  export async function getCalories() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 7); // SEMANA ANTERIOR
    console.log("start:",start)
    const end = new Date();
    console.log("end:",end)
    const options = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      bucketUnit: BucketUnit.DAY, // NOSE QUE ES, JUGAR CON ESTO
      //bucketInterval: 15, // JUGAR CON ESOOO
    };
    const result = await GoogleFit.getDailyCalorieSamples(options);
    console.log(JSON.stringify(result))
    const data = result.find(
      r => r.source === "com.google.android.gms:estimated_steps"
    );
    
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


