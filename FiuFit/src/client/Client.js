import { ATHLETE,TRAINER,API_GATEWAY,USER,MOCK } from '../utils/constants';
import Mocked from './Mocked';
import { getErrorMessage} from '../utils/getters';

class ApiClient {


  async handleDeleteLike(access_token,id){
    let url = API_GATEWAY + 'trainings/' + id + '/score';
    let response = await fetch(url, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token,
      },
      body: JSON.stringify({
        "qualification": 1
      })
    })
    return response
  }


  async handleAddLike(access_token,id){
    let url = API_GATEWAY + 'trainings/' + id + '/score';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token,
      },
      body: JSON.stringify({
        "qualification": 1
      })
    })
    return response
  }

  async handleAddFavorite(access_token,id){
    let url = API_GATEWAY + "users/me/trainings/" + id
    let response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token,
      },
  })
    return response
  }

  async handleDeleteFavorite(access_token,id){
    let url = API_GATEWAY + "users/me/trainings/" + id
    let response = await fetch(url, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token,
      },
  })
    return response
  }


  async handleFollowUser(access_token,id,endpoint){
    const url = API_GATEWAY + 'users/' + id.toString() + endpoint
    let response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token,
      },
    })
    return response
  }

  async getTrainingsById(access_token,id){
    if (MOCK) return Mocked.getTrainings()
    console.log(id)
    const url = API_GATEWAY + 'trainings/' + id.toString()
    let response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token,
      },
    })
    if (!response.ok) {
      console.log(response.status)
      if (response.status == 404) return []
      let errorMessage = getErrorMessage(response.status)     
      throw new Error(errorMessage)
    }
    let json = await response.json()
    return json
  }



    async getMyTrainings(access_token){
      if (MOCK) return Mocked.getTrainings()
      const url = API_GATEWAY + 'trainers/me/trainings?'
      var query = new URLSearchParams({
          limit: 128
      })
      let response = await fetch(url + query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
      })
      if (!response.ok) {
        if (response.status == 404) return []
        let errorMessage = getErrorMessage(response.status)   
        throw new Error(errorMessage)
      }
      let json = await response.json()
      return json
    }

    async getUserById(access_token,id){
      if (MOCK) return Mocked.getUserInfo()
      const url = API_GATEWAY + 'users/' + id
      let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
      })
      if (!response.ok) {
        let errorMessage = getErrorMessage(response.status)
        throw new Error(errorMessage)
      }
      let json = await response.json()
      return json
    }


    async getUsers(access_token){
      if (MOCK) return Mocked.getUsers()
      const url = API_GATEWAY + 'users/'
      let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
      })
      if (!response.ok) {
        console.log(response.status)
        let errorMessage = getErrorMessage(response.status)     
        throw new Error(errorMessage)
      }
      let json = await response.json()
      
      return json
    }


    async getTrainings(access_token){
      if (MOCK) return Mocked.getTrainings()
      const url = API_GATEWAY + 'trainings'
      let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
      })
      if (!response.ok) {
        console.log(response.status)
        let errorMessage = getErrorMessage(response.status)     
        throw new Error(errorMessage)
      }
      let json = await response.json()
      return json
    }

    async getGoals(access_token){
      //if (MOCK) return Mocked.getTrainings()
      const url = API_GATEWAY + 'athletes/me/goals'
      let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
      })
      if (!response.ok) {
        console.log(response.status)
        let errorMessage = getErrorMessage(response.status)     
        throw new Error(errorMessage)
      }
      let json = await response.json()
      return json
    }


    async createNewPost(access_token,title,description,type,difficulty,array){
      let url = API_GATEWAY + "trainers/me/trainings"
      let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: JSON.stringify({       
            "title": title,
            "description": description,
            "type": type,
            "difficulty": difficulty,
            "media": array
        })
      })
      return response
    }

    async createNewGoal(access_token,title,description,metric,quantity,limit_time){
      let url = API_GATEWAY + "athletes/me/goals"
      let date = new Date().toISOString()
      let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            "traning_id": "",       
            "title": title,
            "description": description,
            "metric": metric,
            "quantity": quantity,
            "limit_time": limit_time,
            "date_init": date,
            "state": 1
        })
      })
      return response
    }


    async getMyUserInfo(access_token){
      if (MOCK) return Mocked.getUserInfo()
      const url = API_GATEWAY + 'users/me'
      let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
      })
      if (!response.ok) {
        let errorMessage = getErrorMessage(response.status)
        throw new Error(errorMessage)
      }
      let json = await response.json()
      return json
    }

    async editUserInfo(user,name,lastName,age,image,location){
      let url = API_GATEWAY + "users/" + user.id
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.access_token,
        },
        body: JSON.stringify({
            "name": name,
            "lastname": lastName,
            "age": age ,
            "image" : image,
            "location" : location
        })
      })
      return response
    }

    async editUserPassword(user,password){
      let url = API_GATEWAY + "users/" + user.id
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.access_token,
        },
        body: JSON.stringify({
            "password": password,
        })
    })
      return response
    }



    async signIn(data,role){
      if (MOCK) return Mocked.getUserInfo()
      let url = API_GATEWAY + 'login';
      let response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "mail": data.email,
              "password": data.password,
              "role": role
          })
      })
      if (!response.ok) {
        let errorMessage
        if(response.status == 401) errorMessage ="Invalid username or password"
        else errorMessage =  "Failed to connect with server" 
        throw new Error(errorMessage)
      }
      let json = await response.json()
      return json
    }

    async signUp(data,role,location){
      const url = API_GATEWAY + 'signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            "mail": data.mail,
            "password": data.password,
            "phone_number": data.phone_number,
            "role":role,
            "name": data.name,
            "lastname": data.lastname,
            "age":data.age,
            "location":location
        })
      })
    
      return response
    }


    async googleSignUp(data,role,location,user){
      const url = API_GATEWAY + 'signup/google';
      let password = (+new Date).toString(36)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            "mail": user.mail,
            "password": password,
            "phone_number": data.phone_number,
            "role":role,
            "name": data.name,
            "lastname": data.lastname,
            "age":data.age,
            "location":location,
            "image":user.picture
        })

        /*{
  "mail": "username@mail.com",
  "password": "secure",
  "phone_number": "+543446570174",
  "role": 3,
  "name": "user",
  "lastname": "name",
  "age": "20",
  "location": {
    "latitude": 400,
    "longitude": 350
  },
  "image": "string"
}*/
      })
    
      return response
    }


    async sendEmailToResetPassword(data){
      var url = API_GATEWAY + 'login/forgot_password';
      let response = await fetch(url   , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
          "mail": data.email
        })
      })
      return response
    }

    async resetPassword(data,mail){
      var url = API_GATEWAY + 'login/reset_password/' + data.code;
      let response = await fetch(url   , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
          "mail": mail,
          "new_password":data.repeatPassword,
        })
      })
      return response
    }


    async confirmPhoneNumber(data,phone){
      var url = API_GATEWAY + 'signup/validate_code?';
      var query = new URLSearchParams({
        phone_number: phone,
        verification_code: data.code,
      })
      let response = await fetch(url + query  , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
      })
      return response
    }

    async certify(access_token,uri){
      if( MOCK) return Mocked.responseOk()
      let url = API_GATEWAY + "users/me/verification" 
      let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            "video": uri,
        })
      })
      return response
    } 
}

export default new ApiClient()