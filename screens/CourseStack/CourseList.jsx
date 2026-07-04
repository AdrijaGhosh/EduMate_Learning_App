import React, { useEffect, useContext } from 'react'
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native'
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
    <View style={s.box}>
      <Text style={s.head}>Our Courses</Text>
      <FlatList
        data={availableCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Image source={{ uri: item.thumbnail }} style={s.img} />
            <Text style={s.title}>{item.title}</Text>
            <Text style={s.desc}>{item.description}</Text>
            <Text style={s.sub}>{item.instructor}</Text>
            <Button
              title="Know More"
              color="#1d4ed8"
              onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
            />
          </View>
        )}
      />

      <Text style={s.head}>Your Enrolled Courses</Text>
      <FlatList
        data={enrolledCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Image source={{ uri: item.thumbnail }} style={s.img} />
            <Text style={s.title}>{item.title}</Text>
            <Text style={s.sub}>{item.progress.completionPercentage}% complete</Text>
            <Text style={s.sub}>Status: {item.progress.status}</Text>
            <Button
              title="Continue"
              color="#16a34a"
              onPress={() => navigation.navigate('LessonList', { courseId: item.id })}
            />
          </View>
        )}
      />
    </View>
  )
}

export default CourseList

const s = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  head: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d4ed8',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 10,
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  desc: {
    fontSize: 13,
    color: '#475569',
  },
  sub: {
    fontSize: 12,
    color: '#16a34a',
    marginBottom: 6,
  },
})