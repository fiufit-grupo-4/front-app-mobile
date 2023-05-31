

class Mocked {
    getUserInfo(){
        return {
            "age": "22",
            "blocked": false,
            "followers": [],
            "following": [],
            "id": "646d24887583c1ee838b9f69",
            "image": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fdante%40mail.com%2Favatar%2F1685486776872?alt=media&token=5ded643d-fa18-4378-ac81-4122946afda6",
            "lastname": "Junior",
            "location": {
              "latitude": -32.5853453,
              "longitude": -58.4665567,
            },
            "mail": "dante@mail.com",
            "name": "Mocko",
            "phone_number": "+5491161637747",
            "role": 2,
            "trainings":[
              {
                "description": "Corres hasta mexico",
                "difficulty": "5",
                "id_trainer": "64667bb95d7575b0ea8f2615",
                "id_training": "64668fee753b1f385b3c3b39",
                "title": "Corrida Tumbada",
                "type": "Running",
              },
              {
                "description": "Caminas mucho",
                "difficulty": "5",
                "id_trainer": "646d24887583c1ee838b9f69",
                "id_training": "646d49f838f78ed108c65c38",
                "title": "Running 100k",
                "type": "Running",
              },
            ],
            "verification": {
              "verified": true,
              "video": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fdante%40mail.com%2Fverification%2F1685397477772?alt=media&token=6eaf5ea3-61ea-434e-af27-118b780b76cd",
            },
          }
          
    }
}

export default new Mocked()