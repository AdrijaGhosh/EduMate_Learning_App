import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import UserContext from '../../hooks/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({ navigation }) => {
  const { setMail, setPw, setUid } = useContext(UserContext)

  function handlePress() {
    setMail("")
    setPw("")
    setUid("")
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('uid')
    navigation.getParent()?.navigate('Login')
  }

  return (
    <View>
      <Text>PROFILE SCREEN</Text>
      <Button title="Logout" onPress={handlePress} />
    </View>
  )
}

export default Profile