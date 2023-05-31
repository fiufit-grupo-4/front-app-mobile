
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ATHLETE,TRAINER,API_GATEWAY,USER } from '../../utils/constants';


export async function getUser(){
    let data = await AsyncStorage.getItem(USER)
    return JSON.parse(data)
}


export function getErrorMessage(status){
    if(status == 401) "Invalid username or password"
    else {
        return "Failed to connect with server"
    }
}