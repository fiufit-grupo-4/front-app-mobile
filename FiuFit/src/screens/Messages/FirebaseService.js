import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class FirebaseService {
  auth = auth()

  firestore = firestore()

  messageRef = this.firestore.collection('messages').doc('yo');

  async signIn () {
    try {
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
    await this.signIn()
    console.log(await this.fetchMessages())
    await this.messageRef.add({
      message: 'pepe',
      user_id: 'uid',
      created_at: new Date()
    })
  }
}
