import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const saveUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user)
    dispatch(setUser({ user }))
  }
}

export default userSlice.reducer