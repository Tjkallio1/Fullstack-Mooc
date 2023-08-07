import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addLike, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogService'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [showDetails, setShowDetails] = useState(({}))
  const [selectedBlog, setSelectedBlog] = useState(null)

  const toggleDetails = (blog) => {
    setSelectedBlog(blog)
    setShowDetails(prevState => ({
      ...prevState,
      [blog.id]: !prevState[blog.id]
    }))
  }

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map(blog => (
        <div key={blog.id} className="blog" style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => toggleDetails(blog)}>
              {showDetails[blog.id] ? 'Hide' : 'View'}
            </button>
          </div>
          {showDetails[blog.id] && selectedBlog === blog && (
            <div>
              <div>{blog.url}</div>
              <div>
                Likes: {blog.likes}
                <button onClick={() => handleLike(blog.id)}>Like</button>
              </div>
              <div>
                {blog.user && <div>{blog.user.name}</div>}
                <button onClick={() => handleDelete(blog)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )}

export default Blog
