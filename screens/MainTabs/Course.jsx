import React from 'react'
import CourseDetails from '../CourseStack/CourseDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseList from '../CourseStack/CourseList';
import LessonList from '../CourseStack/LessonList';
import Lesson from '../CourseStack/Lesson';

const Stack = createNativeStackNavigator();

const Course = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen name="LessonList" component={LessonList} />
      <Stack.Screen name="Lesson" component={Lesson} />
    </Stack.Navigator>
  )
}

export default Course