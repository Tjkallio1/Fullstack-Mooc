import { useEffect } from 'react'
import { useDispatch } from 'react'
import blogService from '../services/blogService'
import { saveUser } from '../reducers/userReducer'


const User = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(saveUser(user))
      blogService.setToken(user.token)
    }
  }, [])
}

export default User