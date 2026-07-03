import React, { useEffect, useContext } from 'react'
import { View, Text, FlatList, Pressable, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLessons } from '../../store/lessonsSlice'
import { fetchProgress, updateProgress } from '../../store/progressSlice'
import UserContext from '../../hooks/UserContext'

const LessonList = ({ route, navigation }) => {
  const { courseId } = route.params
  const { uid } = useContext(UserContext)
  const dispatch = useDispatch()

  const { list: lessons, status: lessonsStatus } = useSelector((state) => state.lessons)
  const { list: progress, status: progressStatus } = useSelector((state) => state.progress)

  useEffect(() => {
    dispatch(fetchLessons())
    dispatch(fetchProgress())
  }, [dispatch])

  if (lessonsStatus === 'loading' || progressStatus === 'loading') {
    return <Text>Loading...</Text>
  }

  // lessons that belong to this course
  const courseLessons = lessons.filter((l) => l.courseId === courseId)

  // this user's progress record for this course
  const myProgress = progress.find((p) => p.userId === uid && p.courseId === courseId)

  // plain array of completed lesson ids (empty if no progress record yet)
  const completedLessonIds = myProgress ? myProgress.lessonsCompleted : []

  function handleToggle(lessonId) {
    if (!myProgress) return // no progress record, nothing to update

    let updatedCompletedIds

    if (completedLessonIds.includes(lessonId)) {
      // uncheck: remove lessonId from the array
      updatedCompletedIds = completedLessonIds.filter((id) => id !== lessonId)
    } else {
      // check: add lessonId to the array
      updatedCompletedIds = [...completedLessonIds, lessonId]
    }

    // recalculate percentage based on how many lessons are completed
    const newPercentage = Math.round(
      (updatedCompletedIds.length / courseLessons.length) * 100
    )

    // figure out the new status based on the new percentage
    let newStatus
    if (newPercentage === 0) {
      newStatus = 'not-started'
    } else if (newPercentage === 100) {
      newStatus = 'completed'
    } else {
      newStatus = 'in-progress'
    }

    dispatch(
      updateProgress({
        progressId: myProgress.id,
        lessonsCompleted: updatedCompletedIds,
        completionPercentage: newPercentage,
        status: newStatus,
      })
    )
  }

  return (
    <View style={{ flex: 1 }}>
       <Button title="Back" onPress={() => navigation.goBack()}/>
      <Text>Lessons</Text>

      <View>
        <Text>Your Progress</Text>
        <Text>Status: {myProgress ? myProgress.status : 'Not enrolled'}</Text>
        <Text>Completed: {myProgress ? myProgress.completionPercentage : 0}%</Text>
      </View>

      <FlatList
        data={courseLessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isCompleted = completedLessonIds.includes(item.id)

          return (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>Duration: {item.duration} min</Text>
              <Pressable onPress={() => handleToggle(item.id)}>
                <Text>{isCompleted ? '[x] Completed' : '[ ] Mark as completed'}</Text>
              </Pressable>
              <Button title="Watch Lesson" onPress={() => navigation.navigate('Lesson', { id: item.id })} />
            </View>
          )
        }}
      />
    </View>
  )
}

export default LessonList