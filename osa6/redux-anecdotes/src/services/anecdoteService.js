import axios from 'axios'

const baseUrl =  'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes:0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

//ei vielä toimi, lisää aina uuden tyhjän id:n
const addLike = async (id) => {
    const anecdote = await axios.get(`${baseUrl}/${id}`)
    const updatedAnecdote = {
        ...anecdote.data,
        votes: anecdote.data.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

const anecdoteService = {
    getAll,
    createNew,
    addLike
}

export default anecdoteService