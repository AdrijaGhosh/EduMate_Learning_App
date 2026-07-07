import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from '../../hooks/UserContext'

const Profile = ({ navigation }) => {
  const { mail, setMail, setPw, setUid, name, profileImage } =
    useContext(UserContext)

  async function logout() {
    setMail("")
    setPw("")
    setUid("")
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('uid')
    navigation.getParent()?.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            profileImage ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{mail}</Text>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    paddingTop: 40,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#2563eb",
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  email: {
    color: "#64748b",
    marginBottom: 25,
  },
  logout: {
    marginTop: 30,
    backgroundColor: "#ef4444",
    width: "90%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
})