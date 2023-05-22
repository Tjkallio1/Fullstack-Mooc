import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState({ text:'', type: ''})
  const [error, setError] = useState({ text:'', type: ''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError({text: 'Wrong username or password', type: 'error'})
      setTimeout(() => {
        setError({ text: '', type: '' })
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
      setBlogs([...blogs, addedBlog])
      setNewBlog('')
      setNewAuthor('')
      setNewUrl('')
      setMessage({text: `A new blog ${newBlog} by ${newAuthor} added`, type: 'message'})
      setTimeout(() => {
        setMessage({ text: '', type: '' })
      }, 5000)
    } catch (exception) {
      setTimeout(() => {
      }, 5000)
    }
  }
  
  if (user === null) {
    return (
      <div>
        <h2>Please log in</h2>
        {error.text && (
          <div className={`error ${error.type === 'message' ? 'message-success' : 'message-error'}`}>
            {error.text}
          </div>
    )}
        <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      {message.text && (
      <div className={`message ${message.type === 'message' ? 'message-success' : 'message-error'}`}>
        {message.text}
      </div>
    )}
      <h3>Create new</h3>
      <form onSubmit={createBlog}>
        <div>
          Title
          <input
            type="text"
            value={newBlog}
            onChange={({ target }) => setNewBlog(target.value)}
          />
        </div> 
        <div>
        Author
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
          </div>
          <div>
          Url
          <input
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
          </div>
          <button type="submit">Create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App