import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native'
import Adrija from '../../assets/Adrija.jpeg'
import Sumit from '../../assets/Sumit.jpeg'

const About = () => {
  const openGithub = () => {
    Linking.openURL('https://github.com/AdrijaGhosh')
  }

  const openSumitGithub = () => {
    Linking.openURL('https://github.com/sumitxsan')
  }

  return (
    <ScrollView style={s.box} contentContainerStyle={s.content}>
      <Image source={Adrija} style={s.img} />
      <Text style={s.name}>Adrija Ghosh</Text>
      <Text style={s.role}>Frontend Developer</Text>

      <Text style={s.label}>Contribution</Text>
      <View style={s.list}>
  <Text style={s.bullet}>• Designed the complete application flow and user experience architecture</Text>
  <Text style={s.bullet}>• Built and structured the JSON database powering the app</Text>
  <Text style={s.bullet}>• Developed the Login and Sign Up modules using AsyncStorage</Text>
  <Text style={s.bullet}>• Implemented nested navigation architecture using Stack, Tab, and Drawer navigators</Text>
  <Text style={s.bullet}>• Developed the complete Course Tab and Lesson List modules</Text>
</View>

      <TouchableOpacity onPress={openGithub}>
        <Text style={s.link}>Github: https://github.com/AdrijaGhosh</Text>
      </TouchableOpacity>

      <Image source={Sumit} style={s.img} />
      <Text style={s.name}>Sumit</Text>
      <Text style={s.role}>Frontend Developer</Text>

      <Text style={s.label}>Contribution</Text>
      <View style={s.list}>
  <Text style={s.bullet}>• Developed the Dashboard tab with progress summary and stats</Text>
  <Text style={s.bullet}>• Built the Profile tab</Text>
  <Text style={s.bullet}>• Implemented the Study Centers map feature</Text>
</View>

      <TouchableOpacity onPress={openSumitGithub}>
        <Text style={s.link}>Github: https://github.com/sumitxsan</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default About

const s = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#1d4ed8', // blue hint
    marginTop: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a', // green hint
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1d4ed8', // blue hint
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 20,
  },
  link: {
    fontSize: 14,
    color: '#1d4ed8',
    textDecorationLine: 'underline',
  },
  list: {
  alignSelf: 'stretch',
  marginBottom: 20,
},
bullet: {
  fontSize: 14,
  color: '#475569',
  marginBottom: 6,
  lineHeight: 20,
},
})