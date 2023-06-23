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
