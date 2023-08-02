import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)


  if (!message) {
    return null
  }

  return (
    <div className={`message ${type === 'success' ? 'message-success' : 'message-error'}`}>
      {message}
    </div>
  )
}

export default Notification

