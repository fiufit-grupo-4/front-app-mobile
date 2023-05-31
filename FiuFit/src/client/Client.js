import { ATHLETE,TRAINER,API_GATEWAY,USER,MOCK } from '../utils/constants';
import Mocked from './Mocked';

class ApiClient {
    
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
}

export default new ApiClient()