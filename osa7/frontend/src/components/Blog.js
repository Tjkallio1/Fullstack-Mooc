import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  /*
  const [showDetails, setShowDetails] = useState(({}))
  const [selectedBlog, setSelectedBlog] = useState(null)

  const toggleDetails = (blog) => {
    setSelectedBlog(blog)
    setShowDetails(prevState => ({
      ...prevState,
      [blog.id]: !prevState[blog.id]
    }))
  }
  */

  /*
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  */

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Table striped>
        <tbody>
          {sortedBlogs.map(blog => (
            <tr key={blog.id} className="blog">
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blog
