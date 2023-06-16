
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER,ADMIN,ATHLETE,TRAINER } from './constants';


export async function getUser(){
    let data = await AsyncStorage.getItem(USER)
    return JSON.parse(data)
}


export function getErrorMessage(status){
    if(status == 401) return "Unauthorized"
    else return "Failed to connect with server"
}


export function getRole(role){
    if (role == ADMIN){
        return "Admin"
    } else if (role == TRAINER){
        return "Trainer"
    } else if (role == ATHLETE){
        return "Athlete"
    } else {
        return "Undefined"
    }
}


export async function updateUser(newData,oldData){
    const updateUser = {
        "name":newData.name,
        "lastname":newData.lastname,
        "age":newData.age,
        "mail":newData.mail,
        "role":newData.role,
        "image":newData.image,
        "blocked":newData.blocked,
        "phone_number":newData.phone_number,
        "trainings":newData.trainings,
        "location":newData.location,
        "access_token":oldData.access_token,
        "token_type":oldData.token_type,
        "id": newData.id,
        "verified": newData.verification.verified,
        "followers": newData.followers,
        "following":newData.following
    }
    await AsyncStorage.setItem(USER,JSON.stringify(updateUser))
    return updateUser
}