import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './coursesSlice'
import progressReducer from './progressSlice'
import lessonsReducer from './lessonsSlice'

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    progress: progressReducer,
    lessons: lessonsReducer,
  },
})