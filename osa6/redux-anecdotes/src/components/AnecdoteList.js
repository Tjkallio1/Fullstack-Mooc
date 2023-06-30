import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import Filter from "./Filter"
import Notification from "./Notification"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote( { id }))
    console.log('vote', id)
    dispatch(setNotification('you voted', {content})) //tänne pitää saada äänestetty anekdootti
    console.log('content', content)
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const filteredAnecdotes = filterValue 
    ? sortedAnecdotes.filter((anecdote) => 
      anecdote.content.toLowerCase().includes(filterValue.toLowerCase())
    ) 
  : sortedAnecdotes

  const displayedAnecdotes = filterValue === 'ALL' ? sortedAnecdotes : filteredAnecdotes

  // notification pitää saada häviämään perustilassa ja 5 sekuntia äänestämisestä 
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
      </div>
      ))}
    </div>
  )
}

export default AnecdoteList