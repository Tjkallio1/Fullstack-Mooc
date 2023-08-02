import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  error: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      console.log('payload:', action.payload)
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearNotification: (state) => {
      state.message = ''
      state.type = ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer