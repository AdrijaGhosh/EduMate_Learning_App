import React, { useContext, useState } from 'react'
import { View, Text, Image, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addProgress } from '../../store/progressSlice'
import UserContext from '../../hooks/UserContext'

const CourseDetails = ({ route, navigation }) => {
  const { courseId } = route.params
  const { uid } = useContext(UserContext)
  const dispatch = useDispatch()
  const [enrolling, setEnrolling] = useState(false)

  const { list: courses } = useSelector((state) => state.courses)

  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return <Text>Course not found</Text>
  }

  async function handleEnroll() {
    setEnrolling(true)
    try {
      await dispatch(addProgress({ userId: Number(uid), courseId: course.id })).unwrap()
      navigation.navigate('LessonList', { courseId: course.id })
    } catch (err) {
      console.log('Enroll failed:', err)
      alert('Could not enroll: ' + (err.message || JSON.stringify(err)))
    } finally {
      setEnrolling(false)
    }
  }

  return (
    <View>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Image source={{ uri: course.thumbnail }} style={{ width: 200, height: 100 }} />
      <Text>{course.title}</Text>
      <Text>{course.description}</Text>
      <Text>Instructor: {course.instructor}</Text>
      <Text>Category: {course.category}</Text>
      <Text>Level: {course.level}</Text>
      <Text>Duration: {course.duration}</Text>
      <Text>Rating: {course.rating} ({course.reviews} reviews)</Text>
      <Text>Price: ${course.price}</Text>
      <Button
        title={enrolling ? 'Enrolling...' : 'Enroll Now'}
        onPress={handleEnroll}
        disabled={enrolling}
      />
    </View>
  )
}

export default CourseDetails