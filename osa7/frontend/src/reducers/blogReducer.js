import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addLike: (state, action) => {
      const { id } = action.payload
      const blog = state.find((blog) => blog.id === id)
      if (blog) {
        blog.likes += 1
      }
    },
    deleteBlog: (state, action) => {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    }
  }
})

export const { setBlogs, addLike, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    await blogService.update(id)
    dispatch(addLike({ id }))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog({ id }))
  }
}

export default blogSlice.reducer