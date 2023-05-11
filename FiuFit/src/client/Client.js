

class ApiClient {
    
    curl(url, method, headers,body,setError,setErrorMessage){
        fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
          })
        .then(response => {
            
            return response
        })
        .catch(error => {
            console.log(error)
            setError(true)
            setErrorMessage(error)
            return
        })

    }

    validateResponse(){

    }

    /*
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "mail": data.email,
        "password": data.password,
        "role": getRole()
      })
    })
    .then(response => {
      setLoading(false)
      if (!response.ok) {
        setError(true)
        if(response.status == 401){
          setErrorMessage("Invalid username or password")
        } else {
          setErrorMessage("Failed to connect with server")
        }
      } else {
        response.json().then(json => {
          const accesToken = json.access_token
          console.log(json.access_token)
          AsyncStorage.setItem('accesToken', accesToken).then(
            navigation.navigate("Inicio")
          ).catch(error => {
            setError(true)
            setErrorMessage(error)
          })
          ;
        }).catch(error => {
          setError(true)
          setErrorMessage(error)
        })
        
      }
    })
    .catch(error => {
      setError(true)
      setErrorMessage(error)
    })
    
    */
}

export default ApiClient