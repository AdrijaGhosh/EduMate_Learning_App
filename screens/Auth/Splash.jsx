import React, { useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from '../../hooks/UserContext'

const Splash = ({ navigation }) => {
  const { setUid } = useContext(UserContext)

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      AsyncStorage.getItem('uid').then((uid) => {
        if (token && uid) {
          setUid(Number(uid))
          navigation.replace('Main')
        } else {
          navigation.replace('Login')
        }
      })
    })
  }, [])

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

export default Splash