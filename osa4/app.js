const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api', blogsRouter) // tänne määritellään /api URL:iin, blogsissa taas /blogs, muuten api menee tuplana!
app.use('/api', usersRouter)
app.use('/api', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testsRouter = require ('./controllers/testing')
  app.use('/api/testing', testsRouter)
}

app.use(middleware.tokenExtractor)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
