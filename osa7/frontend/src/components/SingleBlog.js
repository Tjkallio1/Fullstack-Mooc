import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addLike, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogService'
import { useParams, Link } from 'react-router-dom'

const SingleBlog = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await blogService.update(id, updatedBlog)
      dispatch(addLike({ id }))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Do you want to delete the blog "${blog.title}" by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
    }
  }

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div key={blog.id}>
        <Link to={blog.url}>{blog.url}</Link>
        <p>{blog.likes} likes
          <button onClick={() => handleLike(blog.id)}>Like</button>
          <button onClick={() => handleDelete(blog)}>Delete</button>
        </p>
        <p>Added by {blog.user.name}</p>
      </div>
    </div>
  )
}

export default SingleBlog