import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import Filter from "./Filter"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    console.log('vote', id)
  }

  const filteredAnecdotes = anecdotes.filter((anecdote) => 
  anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  const displayedAnecdotes = filter === 'ALL' ? anecdotes : sortedAnecdotes

  return (
    <div>
      <h2>Anecdotes</h2>
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