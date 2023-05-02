const express = require('express')
const morgan = require('morgan') 
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(express.static('build'))

const currentDate = Date()

function getRandomId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  })


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

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${names.length} people</p><p>${currentDate}</p>`)

})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const newId = getRandomId(10,150)
    const body = request.body
    
    if(!body.name || !body.number) {
        return response.status(400).json ({
            error: 'name or number missing'
        })
    }

    const existingPerson = persons.find(person => person.name === body.name)
    if(existingPerson) {
        return response.status(400).json ({
            error: 'name must be unique'
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: newId
    }
    persons.push(person)
    console.log(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})