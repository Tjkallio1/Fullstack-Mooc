import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const postComment = async (id, comment) => {
  const response = axios.post(`http://localhost:3003/api/blogs/${id}/comments`, { comment })
  return response.data
}

const update = async (id, updatedBlog) => {
  const response = axios.put(`http://localhost:3003/api/blogs/${id}`, updatedBlog)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, postComment, update, remove, setToken }
