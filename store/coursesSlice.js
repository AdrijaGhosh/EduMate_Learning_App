import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const res = await axios.get('http://localhost:3000/courses')
  return res.data
})

const coursesSlice = createSlice({
  name: 'courses',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default coursesSlice.reducer