import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import UserContext from '../../hooks/UserContext'

const Profile = ({ navigation }) => {
  const { setMail, setPw, setUid } = useContext(UserContext)

  function handlePress() {
    setMail("")
    setPw("")
    setUid("")
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