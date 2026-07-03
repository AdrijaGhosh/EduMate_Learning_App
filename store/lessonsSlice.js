import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchLessons = createAsyncThunk('lessons/fetchLessons', async () => {
  const res = await axios.get('http://localhost:3000/lessons')
  return res.data
})

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchLessons.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default lessonsSlice.reducer