import React, { useEffect, useReducer, useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

import { firebaseService } from '../../services'

import Input from '../Input'
import Message from '../Message'

import { messagesReducer } from './reducers'
import { chatRoomStyles as styles } from '../../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HooksExample () {
  const [uid, setUid] = useState('');
  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  useEffect(
    function () {
      AsyncStorage.getItem("USER").then((userString) => {
        const user = JSON.parse(userString);
        setUid(user.id);
        console.log("USE EFFECT FOR USER.ID " + user.id + " WITH USER.NAME " + user.name);
        return firebaseService.messageRef
        .orderBy('created_at', 'desc')
        .onSnapshot(function (snapshot) {
          dispatchMessages({ type: 'add', payload: snapshot.docs })
        })
      });
    },
    []
  )



  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function (item) {
            return item.id
          }}
          renderItem={function ({ item }) {
            const data = item.data()
            const side = data.sender_id === uid ? 'right' : 'left'

            return (
              <Message side={side} message={data.message} />
            )
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input uid={uid} />
      </View>
    </SafeAreaView>
  )
}
