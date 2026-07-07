import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Course from './MainTabs/Course'
import Dashboard from './MainTabs/Dashboard'
import Profile from './MainTabs/Profile'

import About from './DrawerTabs/About'
import StudyCenters from './DrawerTabs/StudyCenters'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const Main = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={Tabs} options={{ title: 'Home' }} />
      
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="StudyCenters" component={StudyCenters} />
    </Drawer.Navigator>
  )
}

export default Main