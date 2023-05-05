require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

const currentDate = Date()

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(express.static('build'))

/*
function getRandomId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
*/

morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' '))

/*
let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
        },
        {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
        },
        {
        name: "Dan Abramov",
        number: "13-46-274344",
        id: 3
        },
        {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
        },
        {
        name: "Ukko Metso",
        number: "0700-123123",
        id: 5
        },
        {
        name: "Turha Ukko",
        number: "123457",
        id: "231a87b6-a7ae-4b14-8cce-a21c0c8d952b"
        }
]
*/

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${currentDate}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

/*
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    */

app.post('/api/persons', (request, response, next) => {
  // const newId = getRandomId(10,150)
  const { body } = request

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

/*
    if(!body.name || !body.number) {
        return response.status(400).json ({
            error: 'name or number missing'
        })
    }
    */

/*
    const existingPerson = persons.find(person => person.name === body.name)
    if(existingPerson) {
        return response.status(400).json ({
            error: 'name must be unique'
        })
    }
    */

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  /*
    const person = {
        name: body.name,
        number: body.number
    */

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true },
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
