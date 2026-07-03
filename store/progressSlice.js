import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProgress = createAsyncThunk('progress/fetchProgress', async () => {
  const res = await axios.get('http://localhost:3000/progress')
  return res.data
})

export const addProgress = createAsyncThunk(
  'progress/addProgress',
  async ({ userId, courseId }) => {
    const newProgress = {
      userId,
      courseId,
      lessonsCompleted: [],
      currentLessonId: null,
      completionPercentage: 0,
      lastAccessedAt: new Date().toISOString(),
      enrolledAt: new Date().toISOString(),
      status: 'not-started',
    }
    const res = await axios.post('http://localhost:3000/progress', newProgress)
    return res.data
  }
)

export const updateProgress = createAsyncThunk(
  'progress/updateProgress',
  async ({ progressId, lessonsCompleted, completionPercentage, status }) => {
    const res = await axios.patch(`http://localhost:3000/progress/${progressId}`, {
      lessonsCompleted,
      completionPercentage,
      status,
    })
    return res.data
  }
)

const progressSlice = createSlice({
  name: 'progress',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchProgress.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(addProgress.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
  },
})

export default progressSlice.reducer