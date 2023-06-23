import React, { useCallback, useState } from 'react'
import { View, TextInput } from 'react-native'

import { firebaseService } from '../../services'

import Button from '../common/Button'
import Loader from '../common/Loader'

import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Input ({ uid }) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

const handlePress = useCallback(
    function () {
        if (message.trim() !== '') {
            setIsLoading(true)
            firebaseService
              .createMessage({ message, uid : uid })
              .then(function () {
                setIsLoading(false)
                setMessage('')
              })
        }
    },
    [message]
  )


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={message} onChangeText={setMessage} placeholder="Escribí tu mensaje" />
      </View>

      <Button text="Enviar" onPress={handlePress} disabled={isLoading} />

      {isLoading && <Loader />}
    </View>
  )
}
