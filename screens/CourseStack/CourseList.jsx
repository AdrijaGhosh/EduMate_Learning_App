import React, { useEffect, useContext } from 'react'
import { View, Text, FlatList, Image, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from '../../store/coursesSlice'
import { fetchProgress } from '../../store/progressSlice'
import UserContext from '../../hooks/UserContext'

const CourseList = ({ navigation }) => {
  const dispatch = useDispatch()
  const { list: courses, status: coursesStatus } = useSelector((state) => state.courses)
  const { list: progress, status: progressStatus } = useSelector((state) => state.progress)
  const { uid } = useContext(UserContext)

  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchProgress())
  }, [dispatch])

  if (coursesStatus === 'loading' || progressStatus === 'loading') {
    return <Text>Loading...</Text>
  }

  // progress entries belonging to this user
  const myProgress = progress.filter((p) => p.userId === uid)

  // plain array of courseIds the user is enrolled in
  const enrolledCourseIds = myProgress.map((p) => p.courseId)

  // courses the user is enrolled in, with progress attached
  const enrolledCourses = myProgress.map((p) => {
    const course = courses.find((c) => c.id === p.courseId)
    return { ...course, progress: p }
  })

  // courses NOT already enrolled in
  const availableCourses = courses.filter((c) => !enrolledCourseIds.includes(c.id))

  return (
    <View style={{ flex: 1 }}>
      <Text>Our Courses</Text>
      <FlatList
        data={availableCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.thumbnail }} style={{ width: 200, height: 100 }} />
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.instructor}</Text>
            <Button
              title="Know More"
              onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
            />
          </View>
        )}
      />

      <Text>Your Enrolled Courses</Text>
      <FlatList
        data={enrolledCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.thumbnail }} style={{ width: 200, height: 100 }} />
            <Text>{item.title}</Text>
            <Text>{item.progress.completionPercentage}% complete</Text>
            <Text>Status: {item.progress.status}</Text>
            <Button
              title="Continue"
              onPress={() => navigation.navigate('LessonList',{ courseId: item.id })}
            />
          </View>
        )}
      />
    </View>
  )
}

export default CourseList