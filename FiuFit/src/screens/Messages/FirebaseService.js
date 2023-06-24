import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default class FirebaseService {
  auth = auth()

  firestore = firestore()

  messageRef = this.firestore.collection("messages");

  async signIn () {
    try {
      console.log("SIGN IN :D")
      const response = await this.auth.signInAnonymously()
      return { user: response.user }
    } catch (error) {
      return { error }
    }
  }

  async fetchMessages () {
    const messages = await this.messageRef
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()

    return messages.docs
  }

  async createMessage ({ message, uid }) {
    res = await this.messageRef.add({
      message,
      sender_id: uid,
      receiver_id: "123",
      created_at: new Date()
    })

  }
}


/*
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class FirebaseService {
  auth = auth()

  firestore = firestore()

  messageRef = this.firestore.collection('messages');

  async signIn () {
    console.log("SIGN IN :D")
    try {
      const response = await this.auth.signInAnonymously()
      return { user: response.user }
    } catch (error) {
      return { error }
    }
  }

  async fetchMessages () {
    const messages = await this.messageRef
      .orderBy('timestamp', 'desc')
      .limit(100)
      .get()

    return messages.docs
  }

  async createMessage ({ message, senderId, receiverId }) {
    console.log("------------ START FETCH MESSAGES ------------")
    console.log(await this.fetchMessages())
    console.log("------------ END FETCH MESSAGES ------------")
    console.log("------------ START ADD MESSAGE ------------")
    console.log("meesage: ", message)
    console.log("uid: ", senderId)
      //         "id": 1,
      //         "senderId": 1,
      //         "receiverId": 2,
      //         "content": "Hey Jane, how are you?",
      //         "timestamp": "2023-06-19T12:30:45Z"
      //     },
    await this.messageRef.add({
      content: message,
      senderId: senderId,
      receiverId: receiverId,
      timestamp: new Date()
    })
  }
}*/