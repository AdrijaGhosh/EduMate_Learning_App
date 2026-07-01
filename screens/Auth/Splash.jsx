import React from 'react'
import { View ,Text, Pressable} from 'react-native'

const Splash = ({navigation}) => {
  return (
    <View><Text>Splash </Text>
    <Pressable onPress={()=>navigation.navigate('Login')}><Text>GO TO LOGIN</Text></Pressable>
    <Pressable onPress={()=>navigation.navigate('SignUp')}><Text>GO TO SIGNUP</Text></Pressable>
    </View>
    
  )
}

export default Splash
