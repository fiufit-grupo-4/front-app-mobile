

class Mocked {
    getUserInfo(){
        return {
            "age": "22",
            "blocked": false,
            "followers": [
              "64667bb95d7575b0ea8f2615",
              "6465b819665986813cb8c6dc",
              "6466308244bc82a9be0430e0",
              "646646ba44bc82a9be0430e3",
            ],
            "following": [
              "64667bb95d7575b0ea8f2615",
              "6465b819665986813cb8c6dc",
              "6466308244bc82a9be0430e0",
              "646646ba44bc82a9be0430e3"
            ],
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

    responseOk(){
        return {"ok":true,"status":200}
    }


    getUsers(){
      return [
        {
          "age": "20",
          "blocked": false,
          "followers":  [],
          "following": [],
          "id": "6465b819665986813cb8c6dc",
          "image": null,
          "lastname": "name",
          "location": {
            "latitude": 300,
            "longitude": 350,
          },
          "mail": "admin@hotmail.com",
          "name": "user",
          "phone_number": "+5491161637747",
          "role": 1,
          "trainings":  [],
          "verification": {
            "verified": true,
            "video": "https://www.youtube.com/watch?v=UovxS9B1X5g&t=214s&ab_channel=AlbertoMoedano",
          },
        },
        {
          "age": "26",
          "blocked": false,
          "followers": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3",
          ],
          "following": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3"
          ],
          "id": "6466308244bc82a9be0430e0",
          "image": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2F6466308244bc82a9be0430e0%2Favatar%2F1684624386086?alt=media&token=ae6db490-a66d-4c5a-8a03-418526f819d6",
          "lastname": "Trainer",
          "location":  {
            "latitude": -34,
            "longitude": -58,
          },
          "mail": "dantetrainer@hotmail.com",
          "name": "Dante",
          "phone_number": "+5491161637747",
          "role": 2,
          "trainings":  [
            {
              "id_training": "64668fee753b1f385b3c3b39",
            },
          ],
          "verification": {
            "verified": null,
            "video": null,
          },
        },
        {
          "age": "20",
          "blocked": false,
          "followers": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3",
          ],
          "following": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3"
          ],
          "id": "6466443a44bc82a9be0430e1",
          "image": null,
          "lastname": "name",
          "location": null,
          "mail": "username@mail.com",
          "name": "user",
          "phone_number": "+543446570174",
          "role": 3,
          "trainings": [],
          "verification": {
            "verified": true,
            "video": "https://www.youtube.com/watch?v=UovxS9B1X5g&t=214s&ab_channel=AlbertoMoedano",
          },
        },
         {
          "age": "23",
          "blocked": false,
          "followers": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3",
          ],
          "following": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3"
          ],
          "id": "646646ba44bc82a9be0430e3",
          "image": null,
          "lastname": "pepe",
          "location":  {
            "latitude": -34,
            "longitude": -58,
          },
          "mail": "other@fi.uba.ar",
          "name": "papa",
          "phone_number": "+542304347098",
          "role": 3,
          "trainings": [],
          "verification":  {
            "verified": null,
            "video": null,
          },
        },
        {
          "age": "24",
          "blocked": false,
          "followers": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3",
          ],
          "following": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3"
          ],
          "id": "64664f0744bc82a9be0430e6",
          "image": null,
          "lastname": "Waisten",
          "location": null,
          "mail": "waistenlucas@gmail.com",
          "name": "Lucas",
          "phone_number": "3446570174",
          "role": 3,
          "trainings":  [],
          "verification":  {
            "verified": null,
            "video": null,
          },
        },
         {
          "age": "24",
          "blocked": false,
          "followers": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3",
          ],
          "following": [
            "64667bb95d7575b0ea8f2615",
            "6465b819665986813cb8c6dc",
            "6466308244bc82a9be0430e0",
            "646646ba44bc82a9be0430e3"
          ],
          "id": "64666bb444bc82a9be0430e7",
          "image": null,
          "lastname": "Boxeador",
          "location": null,
          "mail": "danteboxeo@hotmail.com",
          "name": "Dante",
          "phone_number": "+5491161637747",
          "role": 2,
          "trainings": [],
          "verification": {
            "verified": null,
            "video": null,
          },
        },
        {
          "age": "24",
          "blocked": false,
          "followers":  [],
          "following": [],
          "id": "64666d6b44bc82a9be0430e9",
          "image": null,
          "lastname": "420",
          "location":  {
            "latitude": -34,
            "longitude": -58,
          },
          "mail": "dante@trainer.com",
          "name": "Dante",
          "phone_number": "+5491161637747",
          "role": 3,
          "trainings":  [],
          "verification": {
            "verified": null,
            "video": null,
          },
        },
        {
          "age": "24",
          "blocked": false,
          "followers":  [],
          "following":  [],
          "id": "64667bb95d7575b0ea8f2615",
          "image": null,
          "lastname": "420",
          "location": null,
          "mail": "t@fi.uba.ar",
          "name": "Dante",
          "phone_number": "+5491159340782",
          "role": 2,
          "trainings":[
             {
              "id_training": "64667bf4753b1f385b3c3b29",
            },
          ],
          "verification": {
            "verified": null,
            "video": null,
          },
        },
       {
          "age": "23",
          "blocked": false,
          "followers":  [],
          "following":  [],
          "id": "6467d68d0bcb69785d06f789",
          "image": null,
          "lastname": "Pach",
          "location": {
            "latitude": -34.4575188,
            "longitude": -58.9030718,
          },
          "mail": "ffedepach@gmail.com",
          "name": "Fede",
          "phone_number": "+5492304347098",
          "role": 2,
          "trainings":  [],
          "verification":  {
            "verified": null,
            "video": null,
          },
        },
        {
          "age": "23",
          "blocked": false,
          "followers":  [],
          "following":  [],
          "id": "646800fa4382451f8b6e22c0",
          "image": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Ffpacheco%40fi.uba.ar%2Favatar%2F1684699666964?alt=media&token=f17cf5ff-48ff-4b59-abd0-f0c630a513b9",
          "lastname": "Pach",
          "location":  {
            "latitude": -34.4575179,
            "longitude": -58.9030727,
          },
          "mail": "fpacheco@fi.uba.ar",
          "name": "Fede",
          "phone_number": "+5492304347098",
          "role": 2,
          "trainings": [
            {
              "id_training": "64667bf4753b1f385b3c3b29",
            },
          ],
          "verification":{
            "verified": true,
            "video": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
        },
         {
          "age": "24",
          "blocked": false,
          "followers":  [],
          "following":  [],
          "id": "64685cf654a702435ad091a4",
          "image": null,
          "lastname": "420",
          "location":  {
            "latitude": -34.6146434,
            "longitude": -58.3826864,
          },
          "mail": "salome@fi.uba.ar",
          "name": "Salo",
          "phone_number": "+5491161637747",
          "role": 2,
          "trainings":  [],
          "verification":  {
            "verified": null,
            "video": null,
          },
        },
       {
          "age": "33",
          "blocked": false,
          "followers":  [],
          "following":  [],
          "id": "646b615e6f9101e0528e5017",
          "image": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Frojasagustin90%40gmail.com%2Favatar%2F1684847433201?alt=media&token=a61e2da4-6de7-416e-88ba-18421ddd963f",
          "lastname": "Rojas",
          "location":  {
            "latitude": -34.6034126,
            "longitude": -58.4311157,
          },
          "mail": "rojasagustin90@gmail.com",
          "name": "Rojas",
          "phone_number": "1112345678",
          "role": 3,
          "trainings":  [],
          "verification":  {
            "verified": null,
            "video": null,
          },
        },
       {
          "age": "20",
          "blocked": false,
          "followers":  [],
          "following": [],
          "id": "646b745fb72555492de5eea4",
          "image": null,
          "lastname": "Waisten",
          "location":  {
            "latitude": -32.6805164,
            "longitude": -58.8871476,
          },
          "mail": "boriswaisten@gmail.com",
          "name": "Lucas",
          "phone_number": "3446570174",
          "role": 3,
          "trainings":  [],
          "verification":  {
            "verified": null,
            "video": null,
          },
        },
         {
          "age": "24",
          "blocked": false,
          "followers":  [],
          "following":  [],
          "id": "646c1a8964e09952a102816e",
          "image": null,
          "lastname": "Jolie",
          "location":  {
            "latitude": -34.598052,
            "longitude": -58.4413428,
          },
          "mail": "svaudagna.gon@gmail.com",
          "name": "Solangelina",
          "phone_number": "+5491130405447",
          "role": 3,
          "trainings":  [],
          "verification": {
            "verified": null,
            "video": null,
          },
        },
        {
          "age": "25",
          "blocked": false,
          "followers":  [],
          "following":  [],
          "id": "646d24887583c1ee838b9f69",
          "image": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fdante%40mail.com%2Favatar%2F1685486776872?alt=media&token=5ded643d-fa18-4378-ac81-4122946afda6",
          "lastname": "Entrenamientos",
          "location":  {
            "latitude": -34.5853453,
            "longitude": -58.4965567,
          },
          "mail": "dante@mail.com",
          "name": "Dante",
          "phone_number": "+5491161637747",
          "role": 2,
          "trainings":  [
             {
              "id_training": "64667bf4753b1f385b3c3b29",
            },
          ],
          "verification": {
            "verified": true,
            "video": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fdante%40mail.com%2Fverification%2F1685397477772?alt=media&token=6eaf5ea3-61ea-434e-af27-118b780b76cd",
          },
        },
       {
          "age": "24",
          "blocked": false,
          "followers":  [],
          "following": [],
          "id": "6471ef1efafe4862e39718ca",
          "image": null,
          "lastname": "Trotti",
          "location":  {
            "latitude": -34.5853391,
            "longitude": -58.496527,
          },
          "mail": "troti@gmail.com",
          "name": "Tomas",
          "phone_number": "+5491123114944",
          "role": 2,
          "trainings":  [],
          "verification":  {
            "verified": null,
            "video": null,
          },
        },
         {
          "age": "24",
          "blocked": false,
          "followers":  [],
          "following":  [],
          "id": "647522ea3993ef83291c22e6",
          "image": null,
          "lastname": "420",
          "location":  {
            "latitude": -34.6624859,
            "longitude": -58.3632939,
          },
          "mail": "to@fi.uba.ar",
          "name": "To",
          "phone_number": "+5491159340782",
          "role": 3,
          "trainings":  [],
          "verification":  {
            "verified": null,
            "video": null,
          },
        },
      ]

    }


    getTrainings(){
      return [
        {
          "id": "64667bf4753b1f385b3c3b29",
          "trainer": {
            "id": "64667bb95d7575b0ea8f2615",
            "name": "Dante",
            "lastname": "420"
          },
          "title": "111",
          "description": "1111",
          "type": "Caminata",
          "difficulty": 2,
          "media": [
            {
              "media_type": "image",
              "url": ""
            }
          ],
          "comments": [
            {
              "id": "64667e5a753b1f385b3c3b2a",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "muy muy bueno loco, lo hago siempre"
            },
            {
              "id": "64668720753b1f385b3c3b2b",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Soy re kpo"
            },
            {
              "id": "64668726753b1f385b3c3b2c",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Soy re kpo"
            },
            {
              "id": "64668726753b1f385b3c3b2d",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Soy re kpo"
            },
            {
              "id": "6466875e753b1f385b3c3b2e",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Soy re kpo"
            },
            {
              "id": "646687c5753b1f385b3c3b2f",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Holaaaaaaaa"
            },
            {
              "id": "646687e3753b1f385b3c3b30",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Piiiiim"
            },
            {
              "id": "64668b22753b1f385b3c3b31",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Same bro"
            },
            {
              "id": "64668b5d753b1f385b3c3b32",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Hi"
            },
            {
              "id": "64668bb5753b1f385b3c3b33",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Lit"
            },
            {
              "id": "64668c0c753b1f385b3c3b34",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Chan NO PUEDE SERR"
            },
            {
              "id": "64668ce4753b1f385b3c3b35",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Auiero comentar"
            },
            {
              "id": "64668cf9753b1f385b3c3b36",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "No me dejo comentar"
            },
            {
              "id": "64668da7753b1f385b3c3b37",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Dale paa"
            },
            {
              "id": "64668dde753b1f385b3c3b38",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Mmmmmmmmmm"
            },
            {
              "id": "6466900a753b1f385b3c3b3a",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Hhhhhh"
            }
          ],
          "scores": [],
          "blocked": false
        },
        {
          "id": "64668fee753b1f385b3c3b39",
          "trainer": {
            "id": "64667bb95d7575b0ea8f2615",
            "name": "Dante",
            "lastname": "420"
          },
          "title": "Jjj",
          "description": "Bbb",
          "type": "Running",
          "difficulty": 5,
          "media": [
            {
              "media_type": "image",
              "url": ""
            }
          ],
          "comments": [
            {
              "id": "6466955b753b1f385b3c3b3b",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Jdjddjjd"
            },
            {
              "id": "6466957a753b1f385b3c3b3c",
              "user": {
                "id": "64667bb95d7575b0ea8f2615",
                "name": "Dante",
                "lastname": "420"
              },
              "detail": "Eiii mo da"
            }
          ],
          "scores": [],
          "blocked": false
        },
        {
          "id": "646d49f838f78ed108c65c38",
          "trainer": {
            "id": "646d24887583c1ee838b9f69",
            "name": "Dante",
            "lastname": "Entrenamientos"
          },
          "title": "Running 100k",
          "description": "Caminas mucho",
          "type": "Running",
          "difficulty": 5,
          "media": [
            {
              "media_type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fdante%40mail.com%2Ftraining%2F1684897420428?alt=media&token=33de1b6b-34f0-4600-acdf-6c66584e3cb1"
            },
            {
              "media_type": "video",
              "url": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fdante%40mail.com%2Ftraining%2F1684942641906?alt=media&token=41f91576-09ac-4058-bda3-d3b1cd462a2f"
            }
          ],
          "comments": [
            {
              "id": "64767b2572883c95820dffb5",
              "user": {
                "id": "646d24887583c1ee838b9f69",
                "name": "Dante",
                "lastname": "Entrenamientos"
              },
              "detail": "hola chabon "
            },
            {
              "id": "64767b3c72883c95820dffb6",
              "user": {
                "id": "646d24887583c1ee838b9f69",
                "name": "Dante",
                "lastname": "Entrenamientos"
              },
              "detail": "Me comento a mi mismo"
            },
            {
              "id": "64769e22937564a96a0d9744",
              "user": {
                "id": "646d24887583c1ee838b9f69",
                "name": "Dante",
                "lastname": "Entrenamientos"
              },
              "detail": "A ver"
            },
            {
              "id": "64769f93937564a96a0d9745",
              "user": {
                "id": "646d24887583c1ee838b9f69",
                "name": "Dante",
                "lastname": "Entrenamientos"
              },
              "detail": "Jajaja"
            }
          ],
          "scores": [
            {
              "user": {
                "id": "646d24887583c1ee838b9f69",
                "name": "Dante",
                "lastname": "Entrenamientos"
              },
              "qualification": 1
            }
          ],
          "blocked": false
        },
        {
          "id": "646d4a3838f78ed108c65c39",
          "trainer": {
            "id": "646d24887583c1ee838b9f69",
            "name": "Dante",
            "lastname": "Entrenamientos"
          },
          "title": "Caminata 8k",
          "description": "Caminas mucho ",
          "type": "Running",
          "difficulty": 3,
          "media": [
            {
              "media_type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fundefined%2Ftraining%2F1684884021158?alt=media&token=445fc135-b3bb-4bbf-83b4-433a79b2ce9e"
            }
          ],
          "comments": [],
          "scores": [],
          "blocked": false
        },
        {
          "id": "646e7a49a5ec7682ddbcfc0f",
          "trainer": {
            "id": "646d24887583c1ee838b9f69",
            "name": "Dante",
            "lastname": "Entrenamientos"
          },
          "title": "Running 32k",
          "description": "Corres mucho",
          "type": "Running",
          "difficulty": 4,
          "media": [
            {
              "media_type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fdante%40mail.com%2Ftraining%2F1684961862231?alt=media&token=846ca836-21aa-4c57-97a9-c13e2dbdf919"
            }
          ],
          "comments": [
            {
              "id": "647694b972883c95820dffb8",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Hola, te comento. Besos. Rosa 🌹 "
            }
          ],
          "scores": [],
          "blocked": false
        },
        {
          "id": "6475238727a6e90fbbc9f4f5",
          "trainer": {
            "id": "647523543993ef83291c22e8",
            "name": "Te",
            "lastname": "De tilo"
          },
          "title": "Pesas",
          "description": "Pesas con peso ",
          "type": "Caminata",
          "difficulty": 4,
          "media": [
            {
              "media_type": "image",
              "url": ""
            }
          ],
          "comments": [
            {
              "id": "6475239827a6e90fbbc9f4f6",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Yo me comento"
            },
            {
              "id": "6475244127a6e90fbbc9f4f7",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Y me auto likeo"
            },
            {
              "id": "6475246e27a6e90fbbc9f4f8",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Solo yo"
            },
            {
              "id": "6475272127a6e90fbbc9f4f9",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Apareceeeew"
            },
            {
              "id": "647527ee27a6e90fbbc9f4fa",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Solo quiero verr comentarios ya"
            },
            {
              "id": "6475290e27a6e90fbbc9f4fb",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "1111"
            },
            {
              "id": "6475293627a6e90fbbc9f4fc",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Euu"
            },
            {
              "id": "64752a3a27a6e90fbbc9f4fd",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Nananan"
            },
            {
              "id": "64752a6327a6e90fbbc9f4fe",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Quiero comentarr"
            },
            {
              "id": "64752ccf27a6e90fbbc9f4ff",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Dejame"
            },
            {
              "id": "64752cf727a6e90fbbc9f500",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Me mato dale"
            },
            {
              "id": "64752d6727a6e90fbbc9f501",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Dale loco"
            },
            {
              "id": "64752d9427a6e90fbbc9f502",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Ningun te me calma"
            },
            {
              "id": "64752de827a6e90fbbc9f503",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Shorare mil malres"
            },
            {
              "id": "64752e3327a6e90fbbc9f504",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Dios, por que odias mis trenes"
            },
            {
              "id": "64752e6c27a6e90fbbc9f505",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Te odio"
            },
            {
              "id": "64752ecb27a6e90fbbc9f506",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Yoyoyiy8y8"
            },
            {
              "id": "64752f2e27a6e90fbbc9f507",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Quiero llorar posta"
            },
            {
              "id": "64752f8027a6e90fbbc9f508",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Dua lipa"
            },
            {
              "id": "6475303127a6e90fbbc9f509",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Por que"
            },
            {
              "id": "647530b727a6e90fbbc9f50a",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "No se sabe"
            },
            {
              "id": "647530da27a6e90fbbc9f50b",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Why"
            },
            {
              "id": "6475312e27a6e90fbbc9f50c",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Vo deci?"
            },
            {
              "id": "647531c427a6e90fbbc9f50d",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Vamo solo aparece el user pero es avance"
            },
            {
              "id": "6475324227a6e90fbbc9f50e",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Waxhij"
            },
            {
              "id": "6475327f27a6e90fbbc9f50f",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Aver"
            },
            {
              "id": "6475328627a6e90fbbc9f510",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "YASS"
            },
            {
              "id": "647533d927a6e90fbbc9f511",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Uma uma"
            },
            {
              "id": "6475342b27a6e90fbbc9f512",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Jiya"
            },
            {
              "id": "6476949b72883c95820dffb7",
              "user": {
                "id": "647523543993ef83291c22e8",
                "name": "Te",
                "lastname": "De tilo"
              },
              "detail": "Jajajaja"
            }
          ],
          "scores": [],
          "blocked": false
        },
        {
          "id": "6477e4dceb40254bbdd9f93f",
          "trainer": {
            "id": "646d24887583c1ee838b9f69",
            "name": "Dante",
            "lastname": "Entrenamientos"
          },
          "title": "Corrido tumbado ",
          "description": "Corres hasta la Patagonia ",
          "type": "Running",
          "difficulty": 5,
          "media": [
            {
              "media_type": "image",
              "url": "https://firebasestorage.googleapis.com/v0/b/react-native-fiufit.appspot.com/o/users%2Fdante%40mail.com%2Ftraining%2F1685578969738?alt=media&token=9b1abdf9-1717-4a0a-9d4f-0b9a60745029"
            }
          ],
          "comments": [],
          "scores": [],
          "blocked": false
        }
      ] 
    }
}

export default new Mocked()