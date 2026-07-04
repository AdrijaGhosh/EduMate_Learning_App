import React, { useEffect, useContext } from 'react'
import { View, Text, FlatList, Pressable, Button, StyleSheet } from 'react-native'
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
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
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
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Button title="Back" color="#1565C0" onPress={() => navigation.goBack()} />
      </View>

      <Text style={styles.heading}>Lessons</Text>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <Text style={styles.progressText}>
          Status: {myProgress ? myProgress.status : 'Not enrolled'}
        </Text>
        <Text style={styles.progressText}>
          Completed: {myProgress ? myProgress.completionPercentage : 0}%
        </Text>
      </View>

      <FlatList
        data={courseLessons}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isCompleted = completedLessonIds.includes(item.id)

          return (
            <View style={styles.lessonCard}>
              <Text style={styles.lessonTitle}>{item.title}</Text>
              <Text style={styles.lessonDescription}>{item.description}</Text>
              <Text style={styles.lessonDuration}>Duration: {item.duration} min</Text>

              <Pressable
                onPress={() => handleToggle(item.id)}
                style={[
                  styles.toggleButton,
                  isCompleted ? styles.toggleButtonCompleted : styles.toggleButtonIncomplete,
                ]}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    isCompleted ? styles.toggleButtonTextCompleted : styles.toggleButtonTextIncomplete,
                  ]}
                >
                  {isCompleted ? '✓ Completed' : 'Mark as completed'}
                </Text>
              </Pressable>

              <Button
                title="Watch Lesson"
                color="#2E7D32"
                onPress={() => navigation.navigate('Lesson', { id: item.id })}
              />
            </View>
          )
        }}
      />
    </View>
  )
}

const COLORS = {
  blue: '#1565C0',
  blueLight: '#E3F2FD',
  green: '#2E7D32',
  greenLight: '#E8F5E9',
  white: '#FFFFFF',
  textDark: '#1B1B1B',
  textMuted: '#546E7A',
  border: '#CFD8DC',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '600',
  },
  headerRow: {
    paddingHorizontal: 8,
    paddingTop: 8,
    backgroundColor: COLORS.white,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.blue,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  progressCard: {
    backgroundColor: COLORS.blueLight,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.blue,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.blue,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 10,
  },
  toggleButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  toggleButtonIncomplete: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.blue,
  },
  toggleButtonCompleted: {
    backgroundColor: COLORS.greenLight,
    borderColor: COLORS.green,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  toggleButtonTextIncomplete: {
    color: COLORS.blue,
  },
  toggleButtonTextCompleted: {
    color: COLORS.green,
  },
})

export default LessonList