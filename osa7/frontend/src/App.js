/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/login'
//import './app.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { set } from 'mongoose'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  //const [message, setMessage] = useState({ text: '', type: '' })
  //const [error, setError] = useState({ text: '', type: '' })
  const successMessage  = useSelector((state) => state.notification.message)
  const errorMessage = useSelector((state) => state.notification.error)
  const [loginVisible, setLoginVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()


  /*
  const addLike = async (blogId) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === blogId)
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      }
      const returnedBlog = await blogService.update(blogId, updatedBlog)
      initializeBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === returnedBlog.id ? returnedBlog : blog
        )
      )
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const BlogsList = ({ blogs, setBlogs, addLike }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            addLike={addLike}
          />
        ))}
      </div>
    )
  }
  */

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({
        message: 'Wrong username or password',
        type: 'error' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    const newObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    }
    try {
      const addedBlog = await blogService.create(newObject)
      addedBlog.user = user
      setBlogs([...blogs, addedBlog])
      setNewBlog('')
      setNewAuthor('')
      setNewUrl('')
      dispatch(setNotification({
        message: `A new blog ${newBlog} by ${newAuthor} added`,
        type: 'success',
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      window.location.reload(false)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setTimeout(() => {}, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Please log in</h2>
        <Notification />
        <div>
          <Togglable buttonLabel="Login">
            <LoginForm
              username={username}
              password={password}
              handleUserChange={({ target }) =>
                setUsername(target.value)
              }
              handlePasswordChange={({ target }) =>
                setPassword(target.value)
              }
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {user.name} is logged in{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <div>
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <BlogForm
            title={newBlog}
            author={newAuthor}
            url={newUrl}
            handleTitle={({ target }) => setNewBlog(target.value)}
            handleAuthor={({ target }) =>
              setNewAuthor(target.value)
            }
            handleUrl={({ target }) => setNewUrl(target.value)}
            handleSubmit={createBlog}
          />
        </Togglable>
      </div>
      <Blog />
    </div>
  )
}

export default App