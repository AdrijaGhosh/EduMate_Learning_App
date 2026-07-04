import React, { useContext, useState } from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import UserContext from '../../hooks/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Login = ({ navigation }) => {
  const { mail, setMail } = useContext(UserContext)
  const { pw, setPw } = useContext(UserContext)
  const { setUid } = useContext(UserContext)
  const [valid, setValid] = useState(true)
  const [emailError, setEmailError] = useState(false)

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  function handleChange() {
    if (!isValidEmail(mail)) {
      setEmailError(true)
      return
    }
    setEmailError(false)

    axios.get("http://localhost:3000/users").then((resp) => {
      let foundUser = null

      resp.data.map((user) => {
        if (user.email === mail && user.password === pw) {
          foundUser = user
        }
      })

      if (foundUser) {
        setValid(true)
        setUid(foundUser.id)

        axios.get("http://localhost:3000/auth").then((authResp) => {
          const token = authResp.data[0].token
          AsyncStorage.setItem('token', token)
          AsyncStorage.setItem('uid', foundUser.id.toString())
          navigation.navigate("Main")
        })
      } else {
        setValid(false)
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.brandBlock}>
        <Text style={styles.brandName}>Edu<Text style={styles.brandNameAccent}>Mate</Text></Text>
        <Text style={styles.brandTagline}>Learn something new, today.</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.heading}>Log in to continue</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder='you@example.com'
          placeholderTextColor="#94a3b8"
          value={mail}
          onChangeText={(e) => setMail(e)}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder='Enter your password'
          placeholderTextColor="#94a3b8"
          value={pw}
          onChangeText={(e) => setPw(e)}
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.submitButton} onPress={handleChange}>
          <Text style={styles.submitButtonText}>Log In</Text>
        </Pressable>

        {emailError && <Text style={styles.errorText}>Please enter a valid email address</Text>}
        {!valid && <Text style={styles.errorText}>User cannot be matched with provided Email or Password</Text>}

        <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.signupLink}>
          <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupTextBold}>Sign Up</Text></Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  brandName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1d4ed8',
    letterSpacing: 0.5,
  },
  brandNameAccent: {
    color: '#16a34a',
  },
  brandTagline: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#1d4ed8',
    marginBottom: 6,
    marginTop: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  errorText: {
    color: '#dc2626',
    marginTop: 12,
    fontSize: 13,
    textAlign: 'center',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#64748b',
    fontSize: 13,
  },
  signupTextBold: {
    color: '#16a34a',
    fontWeight: '700',
  },
})