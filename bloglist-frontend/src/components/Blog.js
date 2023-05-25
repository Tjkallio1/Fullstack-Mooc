import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog, blogs, setBlogs}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLike = async () => {
    const updatedBlog = {...blog, likes: blog.likes +1}
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === returnedBlog.id ? returnedBlog : b))
      )
    } catch (exception) {
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
    <div>
      {blog.title} {blog.author} <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'View'}</button>
    </div>
    {showDetails && (
      <div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes} <button onClick={addLike}>Like</button>
        </div>
        <div>
          {blog.user && <div>{blog.user.name}</div>}
          <button onClick={deleteBlog}>Delete</button>
        </div>
      </div>
    )}
  </div> 
)}

export default Blog