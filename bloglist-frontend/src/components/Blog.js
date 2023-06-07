/* eslint-disable no-empty */
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, addLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    try {
      console.log('Blog ID:', blog.id)
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      console.log('handleLike called')
      console.log('Current blog:', blog)
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      console.log('Updated blog:', updatedBlog)
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => {
          return b.id === returnedBlog.id ? returnedBlog : b
        })
      )
      console.log('Returned blog:', returnedBlog)
      console.log('Returned Id:', returnedBlog.id)

      addLike(returnedBlog.id)
      try {
      } catch (error) {
        console.log('Error in addLike', error)
      }
    } catch(exception) {
      console.error('Error in blogService.update:', exception)
    }
  }

  const deleteBlog = async () => {
    if(window.confirm(`Do you want to remove blog "${blog.title}"?`))
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id ))
      } catch (exception) {
      }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog && (
        <div className='blog'>
          <div>
            {blog.title} {blog.author} <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'View'}</button>
          </div>
          {showDetails && (
            <div>
              <div>{blog.url}</div>
              <div>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
              </div>
              <div>
                {blog.user && <div>{blog.user.name}</div>}
                <button onClick={deleteBlog}>Delete</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )}

export default Blog