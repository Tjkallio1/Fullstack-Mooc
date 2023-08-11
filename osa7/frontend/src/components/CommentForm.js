import React, { useState } from 'react'

const CommentForm = ({ handleCommentSubmit }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCommentSubmit(comment)
    setComment('')
  }

  return (
    <div>
      <form id="comment-form" onSubmit={handleSubmit}>
        <div>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Add a comment..."
          />
          <button id="comment-button" type="submit">
            Add comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm