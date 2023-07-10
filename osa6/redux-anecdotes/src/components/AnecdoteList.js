import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addVote, setAnecdotes } from "../reducers/anecdoteReducer"
import Filter from "./Filter"
import Notification from "./Notification"
import anecdoteService from "../services/anecdoteService"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  const vote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
    console.log('anecdote:', anecdote)
    dispatch(addVote( { id }))
    console.log('vote', id)
    dispatch(setNotification({ content: anecdote.content })) 
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const filteredAnecdotes = filterValue 
    ? sortedAnecdotes.filter((anecdote) => 
      anecdote.content && anecdote.content.toLowerCase().includes(filterValue.toLowerCase())
    ) 
  : sortedAnecdotes

  const displayedAnecdotes = filterValue === 'ALL' ? sortedAnecdotes : filteredAnecdotes

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter /> 
      {displayedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
      </div>
      ))}
    </div>
  )
}

export default AnecdoteList