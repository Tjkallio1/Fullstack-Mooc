import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getUsers(state, action) {
      return action.payload
    }
  }
})

export const { getUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    console.log('users:', users)
    dispatch(getUsers(users))
  }
}

export default usersSlice.reducer